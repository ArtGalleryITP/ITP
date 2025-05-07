// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
//Insert Model 
const event = require("../Models/EventModels")

//Insert user controller 
const eventController = require('../Controllers/EventController');

// Define CRUD routes

router.get('/', eventController.getAllEvents);
router.post('/', eventController.addEvent); // lowercase 'eventController'
router.get('/:id', eventController.getById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);


//exports
module.exports = router;