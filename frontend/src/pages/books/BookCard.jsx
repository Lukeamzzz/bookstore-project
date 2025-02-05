import React from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { getImageURL } from '../../utils/getImageURL.js';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice.js';

const BookCard = ({book}) => { // The BookCard component receives a book in order to select the information to display 
    const dispatch = useDispatch(); // useDispatch is a react-redux hook used to dispatch actions (addToCart) and update the state of the store

    // This function adds an item to the cart by dispatching the addToCart action defined on the 'cartSlice' file
    const handleAddToCart = (item) => {
        dispatch(addToCart(item)); // The item is passed as the payload, which the reducer uses to update the state
    };

    return (
        <div className='rounded-lg transition-shadow duration-300 mb-3'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-center gap-6'>
                <Link to={`/books/${book._id}`}> {/* If the image of the book is clicked, redirect the user to that specific item page */}
                    <img src={`${getImageURL(book.coverImage)}`} alt='Cover Image' 
                    className='md:w-36 bg-cover rounded-sm cursor-pointer hover:scale-105 transition-all duration-200'/>
                </Link>
                    
                <div>
                    <Link to={`/books/${book._id}`}> {/* If the title of the book is clicked, redirect the user to that specific item page */}
                        <h3 className='text-xl font-semibold hover:text-purpleButton mb-3'>{book.title}</h3>
                    </Link>
                    <p className='text-gray-600 mb-5'>{book.author}</p>
                    <p className='text-gray-600 mb-5'>{book.description.length > 50 ? `${book.description.slice(0, 50)}...` : book.description}</p>
                    <p className='mb-5'>
                        ${book.newPrice} <span className='line-through font-normal ml-2'>{book.oldPrice != null ? `$${book.oldPrice}`: ''}</span>
                        {/* If the oldPrice attribute on the book is not set as null, show the old price with a dollar sign before the number, if the attribute is set as null, show nothing */}
                    </p>
                    <button onClick={() => handleAddToCart(book)} // Call the function to dispatch the add to cart with the book of the book card as payload
                    className='btn-primary px-5 space-x-1 flex items-center gap-1 mx-auto'>
                        <HiOutlineShoppingCart/>
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default BookCard;