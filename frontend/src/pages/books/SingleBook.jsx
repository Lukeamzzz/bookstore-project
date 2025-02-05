import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchSingleBookQuery } from '../../redux/features/books/booksAPI.js';
import { getImageURL } from '../../utils/getImageURL';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice.js';

const SingleBook = () => {
    const { id } = useParams();
    const { data = {} } = useFetchSingleBookQuery(id);
    const book = data.data || [];

    const dispatch = useDispatch(); // useDispatch is a react-redux hook used to dispatch actions (addToCart) and update the state of the store

    // This function adds an item to the cart by dispatching the addToCart action defined on the 'cartSlice' file
    const handleAddToCart = (item) => {
        dispatch(addToCart(item)); // The item is passed as the payload, which the reducer uses to update the state
    };

    return (
        <div className='mx-auto w-5/6 mt-0 md:mt-8 md:border-purpleButton md:border-2 md:rounded-md md:p-20'>
            <div className='md:flex'>
                <img
                    src={`${getImageURL(book.coverImage)}`}
                    alt={`${book.title} Cover Image`}
                    className='mx-auto md:mx-0 w-52 md:w-80 rounded-sm shadow-2xl'
                />
                <div className='md:ml-10 text-center md:text-left'>
                    <h2 className='font-semibold text-2xl md:text-4xl mt-5'>{book.title}</h2>
                    <h4 className='md:text-left mt-3 md:mt-4 md:ml-1 text-2xl'>by {book.author}</h4>
                    <h4 className='mt-3 md:mt-8 md:ml-1 text-2xl'>${book.newPrice}</h4>
                    <p className='mt-8'>{book.description}</p>
                    <p className='md:text-left mt-6 md:mt-8 md:ml-1 text-xl text-gray-600'>Our Curators Team Rating:</p>

                    {/* Star Rating */}
                    <div className='flex mt-1 gap-1 justify-center md:justify-start items-center'>
                        {[...Array(5)].map((_, index) => {
                            // Calculate the percentage of the star to fill
                            const filledPercentage = Math.min(Math.max(book.rating - index, 0), 1) * 100;
                            return (
                                <div key={index} className='relative w-6 h-6'>
                                    {/* Empty star */}
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        className='absolute top-0 left-0 w-6 h-6 text-gray-400'
                                    >
                                        <path
                                            fill='currentColor'
                                            d='M12 .587l3.668 7.435 8.332 1.151-6.064 5.934 1.502 8.3L12 18.896l-7.438 4.511 1.502-8.3L.001 9.173l8.332-1.151z'
                                        />
                                    </svg>
                                    {/* Filled star */}
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        className='absolute top-0 left-0 w-6 h-6 text-purpleButton'
                                        style={{
                                            clipPath: `polygon(0 0, ${filledPercentage}% 0, ${filledPercentage}% 100%, 0% 100%)`,
                                        }}
                                    >
                                        <path
                                            fill='currentColor'
                                            d='M12 .587l3.668 7.435 8.332 1.151-6.064 5.934 1.502 8.3L12 18.896l-7.438 4.511 1.502-8.3L.001 9.173l8.332-1.151z'
                                        />
                                    </svg>
                                </div>
                            );
                        })}
                        <p className='ml-2 text-lg text-gray-600'>{book.rating}</p>
                    </div>
                        <button onClick={() => handleAddToCart(book)}
                            className='btn-primary my-10 md:mx-0 mx-auto flex items-center gap-1'>
                            <HiOutlineShoppingCart />
                            <span>Add to cart</span>
                        </button>
                </div>
            </div>
        </div>
    );
};

export default SingleBook;

