# Use the official Node.js image as a base image
FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY /package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 80

# Command to run the application
CMD ["npm","run", "start"]
