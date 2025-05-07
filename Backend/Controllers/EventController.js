// controllers/eventController.js
const Event = require('../Models/EventModels');
const cloudinary = require('../cloudinaryConfig');
// data display using postman
const getAllEvents = async (req,res) => 
{
    const { category } = req.query;  // Read category from query params
    let query = {};
    if (category) query.category = category; // Filter by category if provided

    try {
        const events = await Event.find(query);
        return res.status(200).json(events);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error fetching events" });
    }
};

// data insert 
const addEvent = async (req, res,next) =>
{
    const {title, description,date,time,venue,category,ticketsAvailable,ticketPrice,image} = req.body;

    let events;
    try{
        events = new Event({title, description,date,time,venue,category,ticketsAvailable,ticketPrice,image});
        await events.save();
    }catch(err)
    {
        console.log(err);
        return res.status(500).json({ message: "Error while saving the event" });
    }
    //not insert events
    if(!events)
    {
        return res.status(404).json({message: "Unable to add this event"});
    }
    return res.status(200).json({events});

};

//get by id
const mongoose = require('mongoose');

const getById = async (req,res) =>
{
    const { id } = req.params;

    // Validate MongoDB ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Event ID format" });
    }

    try {
        console.log(id);
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Unable to find this event" });
        }
        return res.status(200).json( event );
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
};

//update an event

const updateEvent = async (req, res, next) => {
    const id = req.params.id;
    const {title, description, date, time, venue, category, ticketsAvailable, ticketPrice, image} = req.body;
    
    try {
        // Construct updated data object
        const updatedData = {
            title, 
            description, 
            date, 
            time, 
            venue, 
            category, 
            ticketsAvailable, 
            ticketPrice, 
            image
        };

        // Find and update the event in one operation
        const events = await Event.findByIdAndUpdate(id, updatedData, { 
            new: true,  // Return the updated document
            runValidators: true  // Run model validation on update
        });
    
        if (!events) {
            return res.status(404).json({message: "Unable to update this event"});
        }
        
        return res.status(200).json({events});
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: "Error updating event", error: err.message});
    }
};
// delete an event

const deleteEvent = async (req,res,next) =>
    {
        const id = req.params.id;
        let events;

        try{
            events = await Event.findByIdAndDelete(id)
    }catch(err)
    {
        console.log(err);
    }
    if(!events)
        {
            return res.status(404).json({message: "Unable to delete this event"});
        }
        return res.status(200).json({message:"Event Deleted"});

    }

    exports.createEvent = async (req, res) => {
        try {
          const { title, description, ticketsAvailable } = req.body;
      
          // Get the image URL
          const imageUrl = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null;
      
          // Create a new event
          const newEvent = new Event({
            title,
            description,
            ticketsAvailable,
            imageUrl,  // Save image URL in the database
          });
      
          // Save the event
          await newEvent.save();
          res.status(201).send('Event created successfully!');
        } catch (err) {
          console.error(err);
          res.status(500).send('Error creating event.');
        }
      };

exports.getAllEvents = getAllEvents;
exports.addEvent = addEvent;
exports.getById = getById;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
























