const geminiClient = require('../gemini-client');
const xlsx = require('xlsx');
const fs = require('fs');


async function generateCustomerPersona(data) {
    const prompt = `Based on the following customer data, create a detailed customer persona:\n${JSON.stringify(data)} for each customer
    `;

    const response = await geminiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await response.generateContent(prompt);
    console.log(result, 'res')

    return result.response; // Adjust based on response structure
}



async function generateText(prompt) {
    const modelName = 'gemini-1.5-flash'; // Replace with your desired model name
    const model = await geminiClient.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('text', text);

    return text; // Adjust based on response structure
}

// Function to generate images using Gemini AI
async function generateImages(prompt) {
    const width = 350;
    const height = 195;
    const seed = 1737296734; // Each seed generates a new image variation
    const model = 'flux';
    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

    try {
        // Adjust based on API structure
        const response = await fetch("https://image.pollinations.ai/prompt/Murray%3A%20Freight%20rail%20common%20good%20for%20commonwealth?width=1024&height=1024&seed=42&nologo=True");
        console.log(response,'res')
        return {} // Check response structure for actual implementation
    } catch (error) {
        console.error('Error generating images:', error);
        throw error;
    }
}

async function generateContent (req, res) {
    const { prompt } = req.body;

    // Validate prompt input
    if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'A valid text prompt is required.' });
    }

    try {
        // Generate blog post content using Gemini AI
        const generatedContent = await generateText(prompt);

        // Generate images dynamically using Gemini AI
        // const images = await generateImages(prompt);

        // Send back the generated content and images as a response
        res.status(200).json({
            generatedContent,
            // images,
        });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Failed to generate content.' });
    }
}


async function generatePersona (req, res) {
    const { path } = req.file; // Get the uploaded file path

    try {
        // Read Excel data
        const excelData = readExcelData(path);

        // Generate customer persona using Gemini AI
        const customerPersona = await generateCustomerPersona(excelData);

        // Clean up uploaded file
        fs.unlinkSync(path); // Remove the file after processing

        // Send back the generated persona as a response
        res.status(200).json({
            customerPersona,
        });
    } catch (error) {
        console.error('Error generating persona:', error);
        res.status(500).json({ error: 'Failed to generate customer persona.' });
    }
}


function readExcelData(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet); // Convert to JSON format
    return data;
}

module.exports = {
    generateContent,
    generatePersona
};

