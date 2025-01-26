const { Readable } = require('stream');

// Function to create a streaming response
function someStreamingFunction(prompt) {
    const stream = new Readable({
        read() {
            // Simulate generating content in chunks
            generateContentChunks(prompt, (chunk) => {
                if (chunk) {
                    this.push(chunk); // Push each chunk to the stream
                } else {
                    this.push(null); // Signal that the stream has ended
                }
            });
        }
    });

    return stream;
}

// Function to simulate content generation in chunks
function generateContentChunks(prompt, callback) {
    const responses = [
        "This is the first part of the response for prompt: " + prompt,
        " Here comes the second part.",
        " And finally, this is the last part."
    ];

    let index = 0;

    // Simulate asynchronous content generation with a timeout
    const interval = setInterval(() => {
        if (index < responses.length) {
            callback(responses[index]); // Call the callback with each chunk
            index++;
        } else {
            clearInterval(interval);
            callback(null); // Indicate that there are no more chunks
        }
    }, 1000); // Adjust delay as needed (1000ms = 1 second)
}

module.exports = {
    someStreamingFunction,
};
