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

## Deployment

This app is currently hosted on Heroku, and builds automatically from `main`.

## API Usage

Retrieve an auth token for write access:

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

  - [ ] More docs
  - [ ] Package as Docker container