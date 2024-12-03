const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://dassubbulakshmi:sB3rShudJ3PMXVYh@cluster0.28e0n.mongodb.net/studentportal?retryWrites=true&w=majority&appName=Cluster0');

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;
