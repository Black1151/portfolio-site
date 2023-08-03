# # Set the base image
# FROM node:18-alpine

# # Set the working directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of your application's source files
# COPY . .

# # Build the application
# RUN npm run build

# # Expose the listening port
# EXPOSE 3001

# # Start the application
# CMD ["npm", "start"]



# ---- Base Node ----
FROM node:alpine AS base
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json /usr/src/app/

# ---- Dependencies ----
FROM base AS dependencies  
RUN npm install 
# Copy production dependencies
COPY . /usr/src/app

# ---- Build ----
FROM dependencies AS build 
RUN npm run build 

# --- Release ----
FROM node:alpine AS release  
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/package*.json ./ 
# Install production dependencies
RUN npm install --only=production 
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public

# Expose the listening port
EXPOSE 3001
CMD npm start
