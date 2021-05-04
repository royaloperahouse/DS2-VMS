# Digital Stage 2: Video Management System

A proof of concept video CMS, implemented in [Strapi](https://strapi.io).

## Installation

```bash
git clone git@github.com:royaloperahouse/DS2-VMS.git
cd DS2-VMS
yarn install
yarn develop
```

Visit http://localhost:1337/admin to create a local admin user.

## Development

TODO

## Deployment

This app is currently hosted on Heroku, and builds automatically from `main`.

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
  - [ ] More docs
  - [ ] Package as Docker container