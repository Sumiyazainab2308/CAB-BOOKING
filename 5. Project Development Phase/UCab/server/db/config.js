const mongoose = require('mongoose');

// Global flag to track if real MongoDB connected
global.isMongoConnected = false;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 2000,
            connectTimeoutMS: 2000
        });
        global.isMongoConnected = true;
        console.log("MongoDB Connected to Real Database Engine 🚀");
    } catch (error) {
        global.isMongoConnected = false;
        console.log("------------------------------------------------------------------");
        console.log("⚠️ MongoDB local engine not found on port 27017 (" + error.message + ")");
        console.log("✨ Automatic Zero-Config MERN Fallback Activated:");
        console.log("✨ All Mongoose Schemas & API endpoints will transparently persist data to server/db/data.json!");
        console.log("------------------------------------------------------------------");
    }
};

module.exports = connectDB;
