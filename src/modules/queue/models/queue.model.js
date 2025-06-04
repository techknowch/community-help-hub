const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g. "help_request_queue"
  items: { 
    type: [{ 
      requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true },
      status: { type: String, required: true },
      priority: { type: String, required: true, enum: ['low', 'normal', 'high']}
    }], 
    default: [] 
  },
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
