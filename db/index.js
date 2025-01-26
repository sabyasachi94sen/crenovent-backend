require('dotenv').config(); // Load environment variables from .env file
// Load environment variables from .env file
const mongoose = require('mongoose');

// Function to connect to the database
const connectDB = async () => {
    try {
        const connectionString = process.env.COSMOS_CONNECTION_STRING; // Ensure this is set in your .env file
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Azure Cosmos DB for MongoDB");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB; // Export the connectDB functio