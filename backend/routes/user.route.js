import express from 'express';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const router = express.Router();

// Load '.env' file content into default variable 'process.env'
dotenv.config();

// Load the JWT secret key from environment variables
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Define the route for admin authentication
router.post('/admin', async (req, res) => {
    // Extract username and password from the request body
    const { username, password } = req.body;

    try {
        // Find admin user in the database by username
        const admin = await User.findOne({ username });

        // If the admin user is not found
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        // Compare the provided password with the stored one
        if (password != admin.password) { // Should use bcrypt.compare(password, admin.password)
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        // Generate a JWT token with admin's ID, username, and role
        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            JWT_SECRET_KEY,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Return success response with the token and admin details
        return res.status(200).json({ 
            success: true, 
            message: 'Successful authentication', 
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        });

    } catch (error) {
        console.error(`Error logging in admin: ${error.message}`);
        res.status(500).json({ success: false, message: 'An error occurred while logging in admin' });
    }
});

export default router;