module.exports = {
    apps: [
      {
        name: 'crenovent-backend',
        script: 'app.js',
        env: {
          MONGODB_URI: 'mongodb+srv://sabya1234sen:Nvidia9600%40@crenovent-backend-dev.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000',
        },
      },
    ],
  };