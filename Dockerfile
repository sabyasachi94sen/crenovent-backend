FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g pm2

COPY . .


EXPOSE 80

ENV NODE_ENV=development
ENV DEBUG=true
ENV COSMOS_CONNECTION_STRING=mongodb+srv://sabya1234sen:Nvidia9600%40@crenovent-backend-dev.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000
ENV GEMINI_API_KEY=AIzaSyCts3I4AcTUkNVYH_IIVTnk-txarT1oO6s
ENV USER_EMAIL=sabyasachi9600@gmail.com
ENV USER_PASSWORD='purw eubb nopw fcrh'
ENV PORT=80

# Command to run your application
CMD ["pm2-runtime", "start", "app.js"]