# Use the latest Node.js LTS version as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Install PM2 globally
RUN npm install -g pm2

# Copy the rest of your application code
COPY . .


# Expose the port your app runs on (default is 3000 for many Node.js apps)
EXPOSE 80

ENV NODE_ENV=development
ENV DEBUG=true
ENV COSMOS_CONNECTION_STRING=mongodb+srv://sabya1234sen:Nvidia9600%40@crenovent-backend-dev.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000


# Command to run your application
CMD ["pm2-runtime", "start", "app.js"]