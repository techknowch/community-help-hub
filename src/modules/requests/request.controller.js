const requestService = require('./request.service');
const { requestQueue } = require("./request.queue");
exports.createRequest = async(req, res) => {
    try {
        const result = await requestService.createRequest(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.getRequest = async(req, res) => {
    try {
        const requestId = req.params.id;
        const result = await requestService.getRequest(requestId);
        if (!result) {
            return res.status(404).json({ message: "Request not found" });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.viewQueue = (req, res) => {
    const items = requestQueue.getItems();
    console.log("Items in queue:", items);
    if (items.length === 0) {
        return res.status(404).json({ message: "Queue is empty" });
    }
    // Return the items in the queue
    res.status(200).json(items);
}