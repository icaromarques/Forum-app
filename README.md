# `forum-app`

This project is bootstrapped by [aurelia-cli](https://github.com/aurelia/cli).

For more information, go to https://aurelia.io/docs/cli/cli-bundler

## Run dev app

Run `au run`, then open `http://localhost:9000`

To open browser automatically, do `au run --open`.

To change dev server port, do `au run --port 8888`.

To change dev server host, do `au run --host 127.0.0.1`

To install new npm packages automatically, do `au run --auto-install`

**PS:** You could mix all the flags as well, `au run --host 127.0.0.1 --port 7070 --open`

## Build for production

Run `au build --env prod`.

## Unit tests

Run `au test` (or `au karma`).

To run in watch mode, `au test --watch` or `au karma --watch`.

## Integration (e2e) tests

You need the app running for integration test.

First, run `au run` and keep it running.

Then run `au protractor`.

To perform a test-run in interactive mode, do `au protractor`.

To ask the `protractor` to start the application first and then start testing: `au protractor --headless --start`

The two following flags are useful when using `--start` flag:
 * To change dev server port, do `au protractor --start --port 8888`.
 * To change dev server host, do `au protractor --start --host 127.0.0.1`


**PS:** It is also possible to mix the flags `au protractor --headless --start --port 7070 --host 127.0.0.1`


## Build for Docker

This is as simple as running a command:

`yarn docker:build` or `npm run docker:build`

if you want to bring up an instance on your machine run:

`yarn docker:start` or `npm run docker:build`

to stop the previously started instance:

`yarn docker:stop` or `npm run docker:stop`
