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


module.exports={
    isJsonString
}