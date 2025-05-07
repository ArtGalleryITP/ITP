const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");
const auctionRoutes = require("./Route/auctionRoute");
const paymentRoutes = require("./Route/paymentRoute");
const chatRoutes = require("./Route/chat");
const connectDB = require("./Config/db");
const { errorHandler } = require('./middleware/errorMiddleware');

// Configure environment variables
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'], // Add your frontend port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Create uploads directory if it doesn't exist
const fs = require('fs');
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

// Error handling middleware (AFTER routes)
app.use(errorHandler);

// Connect to database and start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error("Failed to connect to database. Server not started.");
  console.error(err);
});

module.exports = app;