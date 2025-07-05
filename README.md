# D4-AI 🚀
A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to generate unique images from text prompts. It leverages the Hugging Face Inference API to provide AI image generation capabilities using the Stable Diffusion model, offering a robust and cost-free solution.

✨ Features
Text-to-Image Generation: Convert any text prompt into a high-quality image.

Modern Frontend: A clean, responsive, and user-friendly interface built with React and Vite.

Robust Backend: A powerful server built with Node.js and Express to handle API requests and business logic.

Free AI Integration: Powered by the open-source Stable Diffusion model via the Hugging Face Inference API.

Database Integration: Uses MongoDB Atlas to store a record of every image generation request.

Enhanced User Experience: Includes loading indicators and clear error handling to provide feedback to the user.

🛠️ Tech Stack
Frontend: React.js, Vite

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

AI Service: Hugging Face Inference API (Stable Diffusion)

Environment Variables: dotenv

API Communication: cors, fetch

📂 Project Structure
Here is the file structure for the project:

text
image-generator-saas/
├── client/
│   ├── src/
│   │   └── App.jsx
│   ├── package.json
│   └── ... (other React files)
└── server/
    ├── models/
    │   └── Image.js
    ├── node_modules/
    ├── .env
    ├── .gitignore
    ├── package.json
    └── server.js
🏁 Getting Started
Follow these instructions to set up and run the project on your local machine.

Prerequisites
Make sure you have the following installed:

Node.js (v18 or later recommended)

npm (comes with Node.js)

A free MongoDB Atlas account

A free Hugging Face account

1. Clone the Repository
First, clone the project to your local machine.

bash
git clone <your-repository-url>
cd image-generator-saas
2. Backend Setup
Navigate to the server directory and install the required dependencies.

bash
cd server
npm install
3. Configure Environment Variables
The server requires a .env file with secret keys to connect to the database and the Hugging Face API.

In the server directory, create a new file named .env.

Add the following variables to it:

text
MONGODB_URI=your_mongodb_connection_string
HUGGINGFACE_API_TOKEN=your_hugging_face_api_token
MONGODB_URI: Get this from your MongoDB Atlas dashboard. Go to your cluster > Connect > Drivers, and copy the connection string. Remember to replace <password> with your database user's password.

HUGGINGFACE_API_TOKEN: Get this from your Hugging Face account settings. Go to Settings > Access Tokens > New token. Ensure the token Role is set to write.

4. Frontend Setup
In a new terminal window, navigate to the client directory and install its dependencies.

bash
cd client
npm install
5. Running the Application
You will need to run the backend and frontend servers simultaneously in two separate terminals.

Terminal 1: Start the Backend Server
(From the server directory)

bash
npm start
The server should start on http://localhost:8080 and show a message confirming the database connection.

Terminal 2: Start the Frontend Application
(From the client directory)

bash
npm run dev
The React development server will start, and the application will open in your browser, usually at http://localhost:5173.