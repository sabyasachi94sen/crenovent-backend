# Use the latest Node.js LTS version as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Run the build command (if applicable)

# Expose the port your app runs on (default is 3000 for many Node.js apps)
EXPOSE 80

ENV NODE_ENV=development
ENV DEBUG=true


# Command to run your application
CMD ["node", "app.js"]