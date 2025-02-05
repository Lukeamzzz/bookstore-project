import mongoose from 'mongoose'; // MongoDB library for database interaction
import dotenv from 'dotenv';

dotenv.config(); // Load '.env' file content in default variable 'proccess.env'

export const connectDB = async () => {
    try{ // Try to establish connection with the database using the connection string
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`); // Success message
    }
    catch (error){
        console.log(`Error: ${error.message}`);
        process.exit(1); // Process code 1 means failure, process code 0 means success
    }
};