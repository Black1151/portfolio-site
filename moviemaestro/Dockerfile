# Build stage
FROM node:16 AS build

WORKDIR /app

# Install dependencies
COPY moviemaestro/package*.json ./
RUN npm install

# Build the app
COPY moviemaestro/ ./
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the built app from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
