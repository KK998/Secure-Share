FROM node:lts-alpine as base

# Install dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the Nuxt application
FROM base AS builder
WORKDIR /app
COPY . .
RUN npm run build

# Create production image
FROM node:lts-alpine AS runner
WORKDIR /app

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

# Copy built application
COPY --from=builder /app/.output .

# Set user
USER nuxtjs

# Expose the application port
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production

# Start the application
CMD ["node", "server/index.mjs"]