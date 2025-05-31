const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g. "help_request_queue"
  items: { type: [Object], default: [] },                // Object of requests in queue
  requestIds: { type: [mongoose.Schema.Types.ObjectId], ref: 'Request', default: [] }, // Array of request IDs
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true  
});
queueSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});
module.exports = mongoose.model("Queue", queueSchema);
