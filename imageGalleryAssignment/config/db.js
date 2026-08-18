const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/imagegallery';

mongoose.connect(mongoURL);

mongoose.connection.on('connected', () => {
    console.log("MongoDB successfully connected to the server...");
});

mongoose.connection.on('disconnected', () => {
    console.log("MongoDB disconnected...");
});

mongoose.connection.on('error', (error) => {
    console.log("MongoDB connection error:", error);
});