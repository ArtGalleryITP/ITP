//controller
const Auction = require("../Model/auctionModel");

// @desc Create a new auction
// @route POST /api/auctions
exports.createAuction = async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body);

    const { name, image, category, endTime, highestBid } = req.body;
    const newAuction = new Auction({ 
      name, 
      image, 
      category, 
      endTime, 
      highestBid 
    });
    await newAuction.save();
    res.status(201).json(newAuction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all auctions
// @route GET /api/auctions
// @desc Get all auctions
// @route GET /api/auctions
exports.getAllAuctions = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const auctions = await Auction.find(filter);
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// @desc Get a single auction by ID
// @route GET /api/auctions/:id
exports.getAuctionById = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) return res.status(404).json({ message: "Auction not found" });
    res.json(auction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update an auction
// @route PUT /api/auctions/:id
exports.updateAuction = async (req, res) => {
  try {
    const updatedAuction = await Auction.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },  // This allows partial updates
      { new: true }
    );
    if (!updatedAuction) return res.status(404).json({ message: "Auction not found" });
    res.json(updatedAuction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete an auction
// @route DELETE /api/auctions/:id
exports.deleteAuction = async (req, res) => {
  try {
    const auction = await Auction.findByIdAndDelete(req.params.id);
    if (!auction) return res.status(404).json({ message: "Auction not found" });
    res.json({ message: "Auction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
