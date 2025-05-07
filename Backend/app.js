const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const auctionRoutes = require("./Route/auctionRoute");
const paymentRoutes = require("./Route/paymentRoute");
const chatRoutes = require("./Route/chat");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads/payment-slips');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/auctions", auctionRoutes);
app.use("/payments", paymentRoutes);
app.use("/chat", chatRoutes);

// 👇 Serve React frontend build files
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// MongoDB connection
const mongoURI = "mongodb+srv://EVENTS:HXJzpz5OFT5Thfo4@cluster0.e7vpf.mongodb.net/";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((conn) => {
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((error) => {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error(error);
    process.exit(1);
  });