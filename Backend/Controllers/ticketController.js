const Event = require('../Models/EventModels');
const Ticket = require('../Models/TicketPurchase'); 


const purchaseTicket = async (req, res) => {
    const { eventId, quantity, name, email } = req.body; // Add 'name' and 'email' if not already present

    try {
        // Find the event by ID
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

    // ✅ Block ticket purchase if event is in the past
        const eventDate = new Date(event.date); // Ensure `event.date` is a Date string or Date object
        const now = new Date();
        console.log("Event Date: ", eventDate);
        console.log("Current Date: ", now);



        if (eventDate < now) {
            console.log("This is a past event, blocking purchase.");
    return res.status(400).json({ message: 'Cannot purchase tickets for past events' });
      
}

        // Check if there are enough tickets available
        if (event.ticketsAvailable < quantity) {
            return res.status(400).json({ message: 'Not enough tickets available' });
        }

        // Create a ticket purchase record (optional for logging purposes)
        const newPurchase = new Ticket({
            eventId,
            name,   // Store the name in the ticket purchase record
            email,  // Store the email in the ticket purchase record
            tickets: quantity,  // Store the number of tickets
        });

        await newPurchase.save();

        // Decrement the ticket count for the event
        event.ticketsAvailable -= quantity;
        await event.save();

        return res.status(200).json({ message: 'Ticket purchased successfully', purchase: newPurchase });
    } catch (error) {
        console.error('Error during ticket purchase:', error);
        return res.status(500).json({ message: 'Error processing the ticket purchase' });


      
    }
};

const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('eventId');
        res.status(200).json(tickets);
    } catch (err) {
        console.error("Error fetching tickets:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { purchaseTicket, getAllTickets };

//module.exports = { purchaseTicket };
