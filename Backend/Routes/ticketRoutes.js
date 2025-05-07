// ticketRoute.js
const express = require('express');
const { purchaseTicket } = require('../Controllers/ticketController.js');

const router = express.Router();

// POST route for purchasing tickets
router.post('/', purchaseTicket);

const { getAllTickets, createTicket } = require('../Controllers/ticketController');

router.get('/ticketpurchases', getAllTickets);



module.exports = router;
