import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    location: {
        address: {
            type: String, 
            required: true
        },
        city: {
            type: String, 
            required: true
        },
        country: {
            type: String, 
            required: true
        },
        state: {
            type: String, 
            required: true
        },
        zipcode: {
            type: String, 
            required: true
        },
    },
    phone: {
        type: String,
        required: true
    },
    // This setup allows to create a one-to-many relationship between orders and books
    productIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book', // This establishes a relationship between this schema and the Book collection
            //  It tells Mongoose that the ObjectIds in the productIds array correspond to documents in the Book collection 
            // This enables Mongoose to populate the referenced documents when querying the Order schema
            required: true
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;