const express = require('express');
const router = express.Router();
const Chat = require('../Model/chatModel');

// Get messages for a specific auction
router.get('/:auctionId', async (req, res) => {
    try {
        const messages = await Chat.find({ auctionId: req.params.auctionId })
            .sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new message
router.post('/:auctionId', async (req, res) => {
    const chat = new Chat({
        auctionId: req.params.auctionId,
        message: req.body.message,
        timestamp: req.body.timestamp,
        isAdmin: req.body.isAdmin || false,
        senderName: req.body.senderName || 'Anonymous'
    });

    try {
        const newChat = await chat.save();
        res.status(201).json(newChat);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 