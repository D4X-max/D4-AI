// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // 1. Import cors

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// 2. Use cors middleware
app.use(cors());

// Your existing route
app.get('/', (req, res) => {
    res.json({ message: "Hello from the server!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
