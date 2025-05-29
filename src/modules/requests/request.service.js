const Request = require('./request.model');

exports.createRequest = async (requestData) => {
    try {
        const request = new Request(requestData);
        const savedRequest = await request.save();
        return savedRequest;
    } catch (error) {
        throw new Error(`Error creating request: ${error.message}`);
    }
}