# =============================================================================
# NestJS Backend - Production Dockerfile
# =============================================================================
FROM node:22-alpine

WORKDIR /app

# Install wget for healthcheck
RUN apk add --no-cache wget

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install ALL dependencies (need devDeps for building)
RUN npm ci

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Verify dist exists
RUN ls -la dist/

# Remove devDependencies after build
RUN npm prune --production

# Security: Create non-root user
RUN addgroup --system --gid 1001 nestjs && \
    adduser --system --uid 1001 nestjs && \
    chown -R nestjs:nestjs /app

# Switch to non-root user
USER nestjs

# Set production environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

# Start command with database migration
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main"]