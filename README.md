Hello!

This is a small, bootstrapped app that searches repos for a specific user - for simplicity, hardcoded (gaearon).

App is written in React + Typescript. There was no need for any state management solution.

I have decided on using GraphQL API - I do not have much experience with it but hey, now's as good a time as any to start getting some!

To make it look as closely to the original as possible, I have used Github's own design system - Primer. I am unlikely to return to it (there are better alternatives) and the docs leave much to be desired.

### Running the app

From the root directory: 

### `.env`

Not super safe to store the key in an environment variable but good enough for development purposes.

First generate a github API key, follow these instructions: https://docs.github.com/en/free-pro-team@latest/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql

Then using `.env.example` as a template, paste the key where specified.

### `docker-compose up -d --build`

App is containerized - it exposes port 3001 externally.

### `yarn start`

Traditional way to start a development server.
