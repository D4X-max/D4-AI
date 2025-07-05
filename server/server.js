// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const { HfInference } = require('@huggingface/inference'); // 1. Import Hugging Face library

const Image = require('./models/Image');

dotenv.config();

// --- Database Connection (remains the same) ---
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

// --- Hugging Face Configuration ---
const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN); // 2. Configure with API Token

const app = express();
const PORT = process.env.PORT || 8080;

// --- Middlewares (remains the same) ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.get('/', (req, res) => {
    res.json({ message: "Hello from the server! API is running." });
});

// 3. Update the main API route for image generation
app.post('/api/generate-image', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: "Prompt is required." });
    }

    try {
        // 4. Call the Hugging Face Inference API
        const imageBlob = await hf.textToImage({
            model: 'stabilityai/stable-diffusion-xl-base-1.0', // A popular Stable Diffusion model
            inputs: prompt,
            parameters: {
                negative_prompt: 'blurry, ugly, deformed', // Optional: guides what to avoid
            }
        });

        // 5. Convert the image blob to a Base64 string
        const buffer = Buffer.from(await imageBlob.arrayBuffer());
        const base64Image = buffer.toString('base64');
        const imageUrl = `data:image/jpeg;base64,${base64Image}`;

        // 6. Save the prompt to the database (saving the Base64 string is not recommended)
        const newImage = new Image({
            prompt: prompt,
            // We're not saving the image URL here because it's a temporary data URL.
            // In a production app, you would upload the buffer to a cloud storage service (like AWS S3)
            // and save the permanent URL you get back.
            imageUrl: "Generated via Hugging Face",
        });
        await newImage.save();

        // 7. Send the Base64 image URL back to the client
        res.status(200).json({ imageUrl: imageUrl });

    } catch (error) {
        console.error("Error generating image:", error);
        res.status(500).json({ message: "Failed to generate image.", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


