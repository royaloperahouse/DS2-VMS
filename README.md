# Digital Stage 2: Video Management System

A proof of concept video CMS, implemented in [Strapi](https://strapi.io).

## Installation

You'll need [Node LTS and Yarn](https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/installation/cli.html#step-1-make-sure-requirements-are-met).

```bash
git clone git@github.com:royaloperahouse/DS2-VMS.git
cd DS2-VMS
yarn install
yarn develop
```

Visit http://localhost:1337/admin to create a local admin user.

## Development

Either create or update content types using the [Content types builder UI](http://localhost:1337/admin/plugins/content-type-builder/content-types/application::content-permissions.content-permissions) or edit models in `/api/<content-type>/models/<content-type>.settings.json`

Create a new branch for your changes, and submit them as a PR.

## Deployment

This app is currently hosted on Heroku, and builds automatically from `main`.

The app expects two environment variables:

 - `DATABASE_URL`: a URL to a Postgres database, e.g. postgres://username:password@host:port/database
 - `NODE_ENV`: 'production'

and additionally, on Heroku:

 - `HEROKU_URL`: the URL for the app on Heroku, without trailing slash, e.g. `https://ds2-vms.herokuapp.com`

## API Usage

A list of all published videos:

`https://ds2-vms.herokuapp.com/videos`

Details for a specific video:

`https://ds2-vms.herokuapp.com/videos/1`

For write access, you first need to retrieve an auth token:

```bash
curl\
 --data "identifier=api@roh.org.uk"\
 --data "password=<PASSWORD>"\
 https://ds2-vms.herokuapp.com/auth/local
```

Then, using the `jwt` token returned:

```bash
curl\
 -H "Authorization: Bearer <ACCESS_TOKEN>"\
 --data "diese_id=21"\
 --data "title=Hello World"\
 --data "duration=120"\
 --data "manifest_url=https://cdn.roh.org.uk/this.m3u8"\
 https://ds2-vms.herokuapp.com/videos/
 ```

 ## TODO

  - [x] Fix local / production envs (SQLite locally?)
  - [x] More docs
  - [ ] Package as Docker container