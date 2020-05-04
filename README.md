# `forum-app`

This project is bootstrapped by [aurelia-cli](https://github.com/aurelia/cli).
For more information, go to https://aurelia.io/docs/cli/cli-bundler

## Live DEMO

A Live DEMO for you =)

* [Live DEMO](https://icaro-forum-app.herokuapp.com/)

## Run dev app

Run `au run`, then open `http://localhost:9000`

To open browser automatically, do `au run --open`.

To change dev server port, do `au run --port 8888`.

To change dev server host, do `au run --host 127.0.0.1`

To install new npm packages automatically, do `au run --auto-install`

**PS:** You could mix all the flags as well, `au run --host 127.0.0.1 --port 7070 --open`


## Build for Docker

### Docker image 

There is a docker image. To get it run the following command:

  docker pull icaroafonso/forum-app

### Docker building local

This is as simple as running a command:

`yarn docker:build` or `npm run docker:build`

if you want to bring up an instance on your machine run:

`yarn docker:start` or `npm run docker:build`

to stop the previously started instance:

`yarn docker:stop` or `npm run docker:stop`
