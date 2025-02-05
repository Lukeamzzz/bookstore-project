import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load '.env' file content into default variable 'process.env'
dotenv.config();

// Load the JWT secret key from environment variables
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyAdminToken = (req, res, next) => {
    // Extract the token from the Authorization header (Bearer <token>)
    // The '.split(' ')[1]' part is used to extract the actual token which is usually formatted as:
    // Authorization: Bearer <token>
    const token = req.headers['authorization']?.split(' ')[1];

    // If no token is provided
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret key
        const user = jwt.verify(token, JWT_SECRET_KEY);

        // Attach the decoded user data to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } 
    catch (err) {
        // Handle token expiration error
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token has expired. Please log in again.' });
        }

        // Handle all other token verification errors
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }    
};

export default verifyAdminToken;