const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    auctionId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    senderName: {
        type: String,
        default: 'Anonymous'
    }
});

module.exports = mongoose.model('Chat', chatSchema); 