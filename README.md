# Secure Share

Very simple self-hosted encrypted sharing service.

The idea of this application is simple. Create a hashed url where a person can access some arbitrary text. The url is behind a password. That password is also responsible for encrypting and decrypting the shared text.

### Share flow:
1. Enter your content to share in the text area
2. Enter a password for the current share
3. Create the share (click submit button)
4. Share the link and password separatly (example: link via email, password via im)
5. Thats it. The person you shared your sensitive content with, can now access it.

<small>For extra security you can enable auto destroy of shared content. Meaning the content will self remove from database once the password is entered. (there is no recovery for this!)</small>

## Features

- save to local sqlite db
- one-time share
- encrypted share

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Deployment

For the deployment you can follow Nuxt official recomendations or use the provided Dockerfiles.

This Dockerfile is based on the examples provided in the [Nitro deployment documentation](https://nitro.unjs.io/deploy/providers/koyeb#using-a-docker-container) and adapted for Nuxt.

Key points about this Dockerfile:
- It uses a multi-stage build process to keep the final image size small.
- It installs dependencies, builds the Nuxt application, and then creates a production-ready image.
- It sets up a non-root user for better security.
- It exposes port 3000 and sets necessary environment variables.

The start command uses `node server/index.mjs`, which is the standard entry point for a Nuxt application built for production.

To build your Docker image, run:

```sh
docker build -t secure-shell .
```

and to run it:

```sh
docker run -p 3000:3000 secure-shell
```