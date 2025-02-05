import mongoose from 'mongoose'; // Import the mongoose library to interact with MongoDB

// Define the schema for the books
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    trending: {
        type: Boolean,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    oldPrice: {
        type: Number,
        required: false
    },
    newPrice: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

// Create a mongoose model based on the schema, which represents the 'Book' collection in the database
const Book = mongoose.model('Book', bookSchema);
export default Book; // Export the model to make it accessible in other files