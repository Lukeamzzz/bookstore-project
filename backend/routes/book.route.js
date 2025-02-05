import express from 'express';
import Book from '../models/book.model.js'
import verifyAdminToken from '../middleware/verifyAdminToken.js';

const router = express.Router();

// Fetch all books
router.get('/', async (req, res) => {
    try{
        const allBooks = await Book.find(); // This means retrieve all books from the database
        res.status(200).json({ success: true, data: allBooks });
    }
    catch (error){
        console.error(`Error fetching all books: ${error.message}`);
        res.status(500).json({ success: false, message: 'Failed to fetch all books' });
    }
});

// Fetch a single book by id
router.get('/:id', async (req, res) => {
    const {id} = req.params; // Extract book ID from URL

    try{
        const book = await Book.findById(id); // Search the book by its id

        if (!book){ // If the book is not found
            res.status(404).json({ success: false, message: 'Book not found' })
        }

        res.status(200).json({ success: true, data: book }); // Respond with book data if found
    }
    catch (error){
        console.error(`Error fetching book: ${error.message}`);
        res.status(500).json({ success: false, message: 'Failed to fetch the book'});
    }
});

// Create a book (verify the user creating the book is an admin with the function 'verifyAdminToken'
// from the middleware directory). We need to provide the admin bearer token as the authorization in the request
router.post('/create-book', verifyAdminToken, async (req, res) => {
    // Create a new book instance (defined in the model) using the request body (title, author, description, etc.)
    const newBook = new Book(req.body); 

    try{ 
        // Try to save the new book on the database
        await newBook.save();
        res.status(201).json({ success: true, data: newBook }); // Success message
    }
    catch (error){
        console.error(`Error creating product: ${error.message}`);
        res.status(500).json({ success: false, message: 'An error occurred while creating the book' });
    }
});

// Update a book (verify the user updating the book is an admin with the function 'verifyAdminToken'
// from the middleware directory). We need to provide the admin bearer token as the authorization in the request
router.put('/update-book/:id', verifyAdminToken, async (req, res) => {
    const book = req.body; // Updated book details from request body
    const {id} = req.params; // Extract book ID from URL

    try{
        const updatedBook = await Book.findByIdAndUpdate(id, book, {new: true}); // Update and return the updated document

        if (!updatedBook){
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        res.status(200).json({ success: true, data: updatedBook });
    }
    catch (error){
        console.error(`Error updating book: ${error.message}`);
        res.status(500).json({ success: false, message: 'Failed to update book' });
    }
});

// Delete a book (verify the user deleting the book is an admin with the function 'verifyAdminToken'
// from the middleware directory). We need to provide the admin bearer token as the authorization in the request
router.delete('/delete-book/:id', verifyAdminToken, async (req, res) => {
    const {id} = req.params; // Extract book id from the URL

    try{
        await Book.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Book deleted successfully' });
    }
    catch (error){
        console.error(`Error deleting product: ${error.message}`);
        res.status(500).json({ success: false, message: 'Failed to delete book' });
    }
});

export default router;