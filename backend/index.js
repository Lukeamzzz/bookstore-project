// This file is the entry point for the API
import { connectDB } from './config/db.js'; // Function to establish connection with the database
import bookRoutes from './routes/book.route.js'; // Import book related routes
import orderRoutes from './routes/order.route.js'; // Import order related routes
import authRoutes from './routes/user.route.js'; // Import admin auth related routes
import adminRoutes from './stats/admin.stats.js'; // Import admin related routes (get stats, etc.)
import express from 'express'; // Express framework for building the server
import cors from 'cors'; // CORS to indicate the origins where browser should allow loading resources
import dotenv from 'dotenv';

// Load '.env' file content into default variable 'process.env'
dotenv.config();

// Initialize the Express app
const app = express();
app.use(express.json()); // Parse incoming json requests
app.use(cors({
    origin: ['http://localhost:5173'], // Allow requests from the specified origin
    credentials: true // Include credentials in cross-origin requests
}));

// Set up the base route for book operations
app.use('/api/books', bookRoutes); 

// Set up the base route for orders operations
app.use('/api/orders', orderRoutes);

// Set up the base route for auth admin (user) operations
app.use('/api/auth', authRoutes);

// Set up the base route for admin (stats) operations
app.use('/api/admin', adminRoutes);

// Define the port from environment variables or use a default value
const port = process.env.PORT || 5000;

// Start the Express server and listen on the specified port
app.listen(port, () => {
    connectDB();
    console.log(`Server started at http://localhost:${port}`);
});
