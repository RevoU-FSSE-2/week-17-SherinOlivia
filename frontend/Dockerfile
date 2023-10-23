# Use the official Node.js img as the base image
FROM node:18

ENV

# Set Working Directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json into the container
COPY  package*.json ./

# install project dependencies
RUN pnpm install

# Copy the Source Code into the container
COPY  . .

# Expose the port that the vite project project runs on
EXPOSE 5173

# Command to run the vite project
CMD ["pnpm","run","dev"]