// geminiClient.js
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini AI client
const geminiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Export the client for use in other files
module.exports = geminiClient;
