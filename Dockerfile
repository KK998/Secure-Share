ARG NODE_VERSION=20.14.0

# Create build stage
FROM node:${NODE_VERSION}-slim AS build

# Enable corepack
RUN corepack enable

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY ./package.json /app/
COPY ./yarn.lock /app/

## Install dependencies
RUN yarn install

# Copy the rest of the application files to the working directory
COPY . ./

# Build the application
RUN yarn run build

# Create a new stage for the production image
FROM node:${NODE_VERSION}-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the output from the build stage to the working directory
COPY --from=build /app/.output ./

# Define environment variables
ENV HOST=0.0.0.0 NODE_ENV=production DATABASE_URL=file:./secure-share.db DATABASE_TOKEN=supersecrettoken

# Expose the port the application will run on
EXPOSE 3000

# Start the application
CMD ["node","/app/server/index.mjs"]