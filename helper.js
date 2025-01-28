const User = require("./models/user");

function isJsonString(req, res, next) {
    const body = req.body;

    // Check if req.body is an object and not null (valid JSON)
    if (typeof body === 'object' && body !== null) {
        console.log('Valid JSON received:', body);
        next(); // Proceed to the next middleware or route handler
    } else {
        console.log('Invalid JSON format');
        res.status(400).json({ error: 'Invalid JSON format' }); // Respond with an error
    }
}

async function isUserExist(req,res,next){
    
    if (!req?.body) {
        return res.status(400).json({message: 'Please provide username,email and password!'});
    }
 
    const { email } = req.body;
    const userEmail = await User.findOne({ email });
   
    if (userEmail) {
        return res.status(400).json({ message: 'User is already registered.' });
    }

    next();

}


function checkFile(req, res, next) {
    const file = req?.file;

    // Check if a file was uploaded
    if (!file) {
        return res.status(400).json({message: 'No file uploaded.'});
    }

    // Check file type
    const allowedTypes = [
        'application/vnd.ms-excel', // XLS
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
        'application/msword', // DOC
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
        'text/csv', // CSV
        'application/csv' // CSV
    ];
    
    if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({message: 'Invalid file type. Only Excel (XLS, XLSX), Word (DOC, DOCX), and CSV files are allowed.'});
    }

    // If all checks pass, proceed to the next middleware
    next();
}

module.exports={
    isJsonString,
    checkFile,
    isUserExist
}