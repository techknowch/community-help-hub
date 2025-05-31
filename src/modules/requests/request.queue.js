const Queue = require("../../utils/Queue");
const PersistentQueue = require("../../utils/persistentQueue");

const requestQueue = new Queue();
const persistentQueue = new PersistentQueue("help_request_queue");

(async () => {
    try {
        // Initialize the persistent queue
        await persistentQueue.init("help_request_queue");
        console.log("Request queue initialized successfully.");
    } catch (error) {
        console.error("Error initializing request queue:", error);
    }
})();


module.exports = requestQueue;
module.exports.persistentQueue = persistentQueue;
