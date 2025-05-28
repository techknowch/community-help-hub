const requestService = require('./request.service');
exports.createRequest = async(req, res) => {
    try {
        const result = await requestService.createRequest(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}