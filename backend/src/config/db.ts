import mongoose, { model, Schema } from "mongoose";

// Database connection logic
export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        
        if (!mongoUri) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }

        await mongoose.connect(mongoUri);
        
        console.log("✓ Database connected successfully");
        return mongoose.connection;
    } catch (error) {
        console.error("✗ Database connection failed:", error instanceof Error ? error.message : error);
        process.exit(1);
    }
};

// Connection event handlers
mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from MongoDB");
});

mongoose.connection.on("error", (error) => {
    console.error("Mongoose connection error:", error);
});

// Graceful shutdown
process.on("SIGINT", async () => {
    try {
        await mongoose.disconnect();
        console.log("Database connection closed gracefully");
        process.exit(0);
    } catch (error) {
        console.error("Error during disconnect:", error);
        process.exit(1);
    }
});

