import mongoose from "mongoose";

let connection = {}; // This will hold the connection state

const connectDB = async () => {

    // Check if the connection is already established
    if(connection.isConnected){
        return console.log("Already connected to the database");
    }
    try {
        // Connect to the MongoDB database using the URI from environment variables
        const mongoConnection = await mongoose.connect(process.env.MONGODB_URI);
        connection = mongoConnection.connections[0]; // Get the first connection
        connection.isConnected = true; // Set the connection state to true
        console.log("Connected to the database successfully");
    } catch (error) {
        console.log("Error connecting to the database:", error);
    }
}

export default connectDB;