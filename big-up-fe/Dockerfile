##
# 1) Build Stage
#    - Install dependencies (including dev deps)
#    - Compile/build the app
##
FROM node:22-alpine AS builder

# Create app directory
WORKDIR /app

# Copy package.json and lock file
COPY package.json package-lock.json ./

# Install all dependencies (dev + prod) for the build
RUN npm ci

# Copy the rest of the project files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# If you need to skip DB calls for build, set that env
ENV SKIP_BUILD_DB_CALLS=true
RUN npm run build
ENV SKIP_BUILD_DB_CALLS=

##
# 2) Production Stage
#    - Copy final artifacts + only production deps
#    - Keep image small, run only needed code
##
FROM node:22-alpine

# Create app directory
WORKDIR /app

# Copy ONLY package files to install production dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy built files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
# If you have any other assets needed at runtime, copy them similarly

# Expose the port that the app listens on
EXPOSE 3002

# Start command
CMD ["npm", "run", "start"]
