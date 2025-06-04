const QueueModel = require("../modules/queue/models/queue.model");

class PersistentQueue {
  constructor(queueName) {
    this.name = queueName;
  }

  async init() {
    const exists = await QueueModel.findOne({ name: this.name });
    if (!exists) {
      await QueueModel.create({ name: this.name });
    }
  }

  async enqueue(item) {

    if (!item) throw new Error("Item cannot be null or undefined");

    const requestId = item._id;
    console.log("Enqueuing item with ID:", requestId);

    const queueItem = {
        requestId: item._id.toString(), // Ensure requestId is a string
        status: item.status || "pending", // Default status if not provided
        priority: item.priority || 'normal' // Default priority if not provided
    };

    await QueueModel.updateOne(
      { name: this.name },
        { $push: { items: queueItem } },
        { upsert: true }
    );
  }

  async dequeue() {
    const queue = await QueueModel.findOne({ name: this.name });
    if (!queue || queue.items.length === 0) return null;

    const item = queue.items[0];
    queue.items.shift(); // remove first
    await queue.save();

    return item;
  }

  async getItems() {
    const queue = await QueueModel.findOne({ name: this.name });
    return queue ? queue.items : [];
  }

  async size() {
    const queue = await QueueModel.findOne({ name: this.name }).populate('items.requestId');
    if (!queue) return 0;
    return queue ? queue.items.length : 0;
  }

  async clear() {
    await QueueModel.updateOne({ name: this.name }, { items: [] });
  }
}

module.exports = PersistentQueue;
