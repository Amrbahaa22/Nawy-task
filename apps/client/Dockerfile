###################
# DEPENDENCIES
###################
FROM node:20-alpine AS deps

WORKDIR /app

RUN apk add --no-cache libc6-compat

# Copy entire workspace for pruning
COPY . .

# Install turbo using npx
RUN npx turbo@2.3.3 prune @apps/client --docker

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
RUN npx turbo@2.3.3 build --filter=@apps/client

###################
# RUNNER
###################
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone build
COPY --from=builder --chown=nextjs:nodejs /app/apps/client/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/client/.next/static ./apps/client/.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/client/server.js"]