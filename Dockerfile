# Stage 1: Dependencies
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY src/ ./src/
RUN npm ci && npm run build

# Stage 3: Production
FROM node:18-alpine AS production
WORKDIR /app

# Add non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy only necessary files from previous stages
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE ${PORT}

# Start the application
CMD ["npm", "run", "start:prod"]