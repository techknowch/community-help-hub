const QueueModel = require("../models/queue.model");

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
    await QueueModel.updateOne(
      { name: this.name },
      { $push: { items: item } }
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
    const queue = await QueueModel.findOne({ name: this.name });
    return queue ? queue.items.length : 0;
  }

  async clear() {
    await QueueModel.updateOne({ name: this.name }, { items: [] });
  }
}

module.exports = PersistentQueue;
