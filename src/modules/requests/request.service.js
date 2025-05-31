const Request = require('./request.model');
const { requestQueue, persistentQueue } = require("./request.queue");


exports.createRequest = async (requestData) => {
    try {
        const request = new Request(requestData);
        const savedRequest = await request.save();
        requestQueue.enqueue(savedRequest); // Add to the queue
        await persistentQueue.enqueue(savedRequest); // Persist the request in the persistent queue
        console.log(`Request created and added to queue: ${savedRequest._id}`);
        return savedRequest;
    } catch (error) {
        throw new Error(`Error creating request: ${error.message}`);
    }
}