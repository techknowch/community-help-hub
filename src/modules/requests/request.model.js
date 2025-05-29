/*
// This file defines the Request model for the application.
{
  "title": "Need help with HTML CSS layout",
  "description": "Struggling to center div with Flexbox.",
  "category": "Frontend",
  "priority": "normal"
}
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;
const requestSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    category: {
        type: String,
        enum: ['Frontend', 'Backend', 'DevOps', 'Design', 'Other'],
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'normal', 'high'],
        default: 'normal'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Request = mongoose.model('Request', requestSchema);
module.exports = Request;