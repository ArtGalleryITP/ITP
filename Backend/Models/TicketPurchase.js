const mongoose = require('mongoose');

const ticketPurchaseSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    tickets: { type: Number, required: true }
});


module.exports = mongoose.model('TicketPurchase', ticketPurchaseSchema);
