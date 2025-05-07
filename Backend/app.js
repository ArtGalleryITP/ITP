const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); // 👈 Add this
const ticketRoutes = require("./Routes/ticketRoutes"); 
const router = require("./Routes/EventRoutes");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use("/events", router);
app.use("/ticketpurchases", ticketRoutes);

// 👇 This tells Express to serve React's build files
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

const mongoURI = "mongodb+srv://EVENTS:HXJzpz5OFT5Thfo4@cluster0.e7vpf.mongodb.net/";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,  
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  });
