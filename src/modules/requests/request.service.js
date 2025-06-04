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

exports.getRequest = async (requestId) => {
    try {
        const request = await Request.findById(requestId);
        if (!request) {
            throw new Error(`Request with ID ${requestId} not found`);
        }
        return request;
    } catch (error) {
        throw new Error(`Error retrieving request: ${error.message}`);
    }
}

exports.updateRequest = async (requestId, updatedData) => {
    try {
        const request = await Request.findByIdAndUpdate(requestId, updatedData, { new: true });
        if (!request) {
            throw new Error(`Request with ID ${requestId} not found`);
        }
        // TODO Update the queue if necessary
        console.log(`Request updated: ${request._id}`);
        return request;
    } catch (error) {
        throw new Error(`Error updating request: ${error.message}`);
    }
}