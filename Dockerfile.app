# Build Stage: Build the application
ARG NODE_VERSION=20.14.0
FROM node:${NODE_VERSION}-slim AS stage

# Enable corepack
RUN corepack enable

# Set the working directory
WORKDIR /app

# Copy only necessary files for dependency installation
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . ./

# Build the application
RUN yarn build

# Production Stage: Run the application
FROM node:${NODE_VERSION}-slim

# Set the working directory
WORKDIR /app

# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy the built output from the build stage
COPY --from=stage /app/.output ./

# Copy the .env file (if needed in production)
COPY .env ./

# Create a non-root user for security
RUN useradd --user-group --create-home --shell /bin/false appuser
RUN chown -R appuser:appuser /app && chmod -R 775 /app
USER appuser

# Expose the application port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \
  CMD curl -f http://localhost:3000 || exit 1

# Start the application
CMD ["node", "server/index.mjs"]
