// models/FormData.js
const mongoose = require('mongoose');

// Define the schema
const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    size: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// Export the model
module.exports = mongoose.model('leads', formDataSchema);
