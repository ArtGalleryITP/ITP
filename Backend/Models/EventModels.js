//eventmodel
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        required : true,
    },
    description:{
        type:String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
    time: {
        type:String,
        required: true,
    },
    venue:{
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['past', 'current', 'upcoming'],
        required: true
    },
    ticketsAvailable:{
        type: Number,
        required: true,
    },
    ticketPrice:{
        type: Number,
        required: true,
    },
    image:{

    type: String,
    required: true,
    }
});

module.exports = mongoose.model("Event",eventSchema);
