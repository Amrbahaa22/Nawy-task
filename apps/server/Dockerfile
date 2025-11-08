###################
# DEPENDENCIES
###################
FROM node:20-alpine AS deps

WORKDIR /app

RUN apk add --no-cache libc6-compat

# Copy entire workspace for pruning
COPY . .

# Install turbo using npx
RUN npx turbo@2.3.3 prune @apps/server --docker

###################
# INSTALLER
###################
FROM node:20-alpine AS installer

WORKDIR /app

# Copy pruned dependencies
COPY --from=deps /app/out/json/ .
COPY --from=deps /app/out/package-lock.json ./package-lock.json

# Copy local packages from pruned output
COPY --from=deps /app/out/full/packages ./packages

# Install dependencies
RUN npm ci

###################
# BUILDER
###################
FROM node:20-alpine AS builder

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=4096"

COPY --from=installer /app/node_modules ./node_modules
COPY --from=deps /app/out/full/ .
COPY turbo.json turbo.json

# Build the application
RUN npx turbo@2.3.3 build --filter=@apps/server

###################
# RUNNER
###################
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy production dependencies and built application
COPY --from=installer --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/apps/server/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/server/package.json ./package.json
COPY --from=deps --chown=nestjs:nodejs /app/apps/server/seed.ts ./seed.ts
COPY --from=deps --chown=nestjs:nodejs /app/apps/server/properties.json ./properties.json
COPY --from=deps --chown=nestjs:nodejs /app/apps/server/docker-entrypoint.sh ./docker-entrypoint.sh

# Make entrypoint script executable
USER root
RUN chmod +x ./docker-entrypoint.sh && \
    apk add --no-cache netcat-openbsd

USER nestjs

EXPOSE 8000

ENV PORT=8000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["./docker-entrypoint.sh"]