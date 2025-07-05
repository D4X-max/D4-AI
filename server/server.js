// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const Image = require('./models/Image');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
  res.json({ message: "Hello from the server! Database connection is set up." });
});

// POST route to save image data
app.post('/api/images', async (req, res) => {
  try {
    const { prompt, imageUrl } = req.body;
    const newImage = new Image({ prompt, imageUrl });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: "Failed to save image data", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

