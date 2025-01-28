require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { someStreamingFunction } = require('./streaming'); // Import streaming function
const bodyParser = require('body-parser');
const cors = require('cors');
const { fetch } = require('undici');
const mongoose = require('mongoose');
const connectDB = require('./db/index'); // Import the database connection function
const {handleLeads}= require('./leads/index')
const FormData = require('./models/leads'); // Import the FormData model
const { generatePersona, generateContent } = require('./generate-content/index'); // Import streaming function
const multer = require('multer');
const fs = require('fs');
const { isJsonString } = require('./helper');
const upload = multer({ dest: 'uploads/' }); // Temporary storage location
const app = express();
const port = process.env.PORT || 3000;



connectDB();


// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.get('/',(req,res)=>{
    console.log('hey all out thereee!')
    return res.status(200).json({ title: 'Hey every one.This is sabyasachi Sen! china is here!' });
})

// Endpoint for generating blog posts and images based on text prompt
app.post('/generate-content', generateContent);
// Endpoint for analyzing Excel data and generating a customer persona
app.post('/generate-persona', upload.single('file'), generatePersona);
// Handle form submission
app.post('/leads',isJsonString, handleLeads);


// Start the server
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
