import express from 'express';
import Order from '../models/order.model.js';

const router = express.Router();

// Create an order
router.post('/create-order', async (req, res) => {
    // Create a new order instance (defined in the model) using the request body (name, email, location, etc.)
    const newOrder = new Order(req.body);

    try{
        // Try to save the new order on the database
        await newOrder.save();
        res.status(201).json({ success: true, data: newOrder }); // Success message
    } 
    catch (error){
        console.error(`Error creating order: ${error.message}`);
        res.status(500).json({ success: false, message: 'An error occurred while creating the order' });
    }
});

// Get orders by user (email address)
router.get('/:email', async (req, res) => {
    const {email} = req.params; // Extract the email from the url

    try{
        const orders = await Order.find({email}); // Search the order by the email associated to it

        if(!orders){ // If no orders are found
            res.status(404).json({ success: false, message: 'No orders found' });
        }

        res.status(200).json({ success: true, data: orders }); // Respond with orders data if found
    } 
    catch (error){
        console.error(`Error fetching orders: ${error.message}`);
        res.status(500).json({ success: false, message:'Failed to fetch orders' });
    }
});

export default router;