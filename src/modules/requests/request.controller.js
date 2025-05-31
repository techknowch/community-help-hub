const requestService = require('./request.service');
const requestQueue = require('./request.queue');
exports.createRequest = async(req, res) => {
    try {
        const result = await requestService.createRequest(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.viewQueue = (req, res) => {
    const items = requestQueue.getItems();
    res.status(200).json(items);
}