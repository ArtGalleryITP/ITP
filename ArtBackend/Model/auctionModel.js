const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String},
  endTime: { type: Date, required: true },
  highestBid: { type: Number, default: 0 },
  category: { 
    type: String, 
    enum: ['trending', 'current', 'upcoming'], 
    required: true
  }
});

module.exports = mongoose.model("Auction", auctionSchema);

