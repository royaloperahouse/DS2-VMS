// This Jenkinsfile performs a full build and deployment of the application
pipeline {
  agent any

  parameters {
      string(defaultValue: 'upgrade', description: 'Which tag you want to deploy?', name: 'TAG', trim: false)
      choice(choices: ['upgrade', 'stagev2', 'production'], description: 'Where do you want to deploy?', name: 'ENV')
  }

  stages {
    stage('Install') {
      steps {
        checkout([$class: 'GitSCM',
        branches: [[name: "refs/tags/${params.TAG}"]],
        userRemoteConfigs: [[
          credentialsId: 'Jenkins',
          refspec: '+refs/tags/*:refs/remotes/origin/tags/*',
          url: 'ssh://git@stash.atlassian.roh.org.uk/web2/strapi-vcms.git']]
        ])
        script {
          currentBuild.displayName = "#${env.BUILD_NUMBER} - ${params.ENV} - ${env.GIT_COMMIT.take(8)}"
        }
      }
    }

    stage('Deploy') {
      steps {
        sh 'eval $(aws ecr get-login --no-include-email --region eu-west-1 --registry-ids 225860357930)'
        sh 'docker build -t roh-strapi-vcms .'
        sh "docker tag roh-strapi-vcms:latest 225860357930.dkr.ecr.eu-west-1.amazonaws.com/roh-strapi-vcms:${params.ENV}"
        sh "docker push 225860357930.dkr.ecr.eu-west-1.amazonaws.com/roh-strapi-vcms:${params.ENV}"

        script {
          switch(params.ENV) {
            case 'upgrade':
              ACCOUNT_ID = '478440150339'
              TASK_NAME = 'roh-strapi-vcms-server:1'
              break

            case 'stagev2':
              ACCOUNT_ID = '461420410774'
              TASK_NAME = 'roh-strapi-vcms-server:1'
              break

            case 'production':
              ACCOUNT_ID = '656719648592'
              TASK_NAME = 'roh-strapi-vcms-server:1'
              break
          }
        }

        // Trigger update of the ECS cluster
        script {
          sh """aws sts assume-role --role-arn arn:aws:iam::${ACCOUNT_ID}:role/ECSAccessRolePolicy --role-session-name Ecs-session | jq -r '.Credentials | "AWS_ACCESS_KEY_ID=\\(.AccessKeyId) AWS_SECRET_ACCESS_KEY=\\(.SecretAccessKey) AWS_SESSION_TOKEN=\\(.SessionToken)"' > creds.env"""
          def CREDS=readFile('creds.env').trim()
          sh "rm ./creds.env"
          sh "$CREDS aws ecs update-service --cluster roh-strapi-vcms-server-ecs-cluster --service arn:aws:ecs:eu-west-1:${ACCOUNT_ID}:service/roh-strapi-vcms-server-ecs-service --task-definition ${TASK_NAME} --force-new-deployment --region eu-west-1"
        }
      }
    }
  }
}
