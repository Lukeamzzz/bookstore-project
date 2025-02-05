import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoIosSad } from 'react-icons/io';
import { getImageURL } from '../../utils/getImageURL.js';
import { removeFromCart } from '../../redux/features/cart/cartSlice.js';


const CartPage = () => {
    // Retrieve the cartItems array from the cart slice of the redux state
    const cartItems = useSelector(state => state.cart.cartItems);

    // Calculate the total price of the cart by accumulating their `newPrice` values, then format the result to 2 decimal places
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);

    const dispatch = useDispatch(); // React-redux hook to dispatch actions (remove) and update the state of the store

    // This function removes an item from the cart by dispatching the removeFromCart action defined on the 'cartSlice' file
    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item)); // The item is passed as the payload, which the reducer uses to update the state
    }

    return (
        <div className='mx-auto md:w-4/6 mb-20'> 
            <div className='flex justify-center items-center p-6'>
                <h2 className='text-2xl md:text-5xl font-medium'>Shopping Cart</h2>
            </div>

            <hr className='border-2 border-purpleButton rounded-md'/> {/* line divider */}
            <div>
                {
                    cartItems.length > 0 ? (
                        <ul role='list'>
                            {
                                cartItems.map(item => ( // For each item on the cartItems we'll create a component with its own unique data
                                    <li key={item._id} className='my-3 flex flex-row justify-between items-center'>
                                        <div className='flex items-center'>
                                            <img src={`${getImageURL(item.coverImage)}`} alt='Book Cover' 
                                            className='w-20 md:w-32 rounded-sm mr-4 md:mr-6'/>
                                            
                                            <div className='flex flex-col'>
                                                <h4 className='text-lg mb-4'>{item.title}</h4>
                                                <h4 className='text-md mb-4'> <span className='font-semibold'>Author: </span>{item.author}</h4>
                                                <h4 className='text-md'> <span className='font-semibold'>Category: </span>{item.category}</h4>
                                            </div>
                                        </div>
                                        
                                        <div className='text-center'>
                                            <h4 className='text-lg font-semibold'>${item.newPrice}</h4>
                                            <button onClick={() => handleRemoveFromCart(item)}
                                            className='text-purpleButton underline underline-offset-2 hover:scale-105'>Remove</button>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    ) 
                    : 
                    (
                        <div className='mx-auto my-4 flex flex-col items-center gap-y-5'>
                            <IoIosSad className='size-40'/>
                            <h2 className='text-2xl font-medium'>Your cart is empty</h2>
                            <p className='text-md text-center'>Please add items to your cart before proceeding to checkout</p>
                            <Link to='/'>
                                <button className='text-md font-medium bg-purpleButton rounded-md py-2 px-4 hover:text-white'>Explore Our Books</button>
                            </Link>
                        </div>
                    )
                }
                
            </div>

            <hr className='border-2 border-purpleButton rounded-md'/>
            
            {
                cartItems.length > 0 ? (
                    <>
                    <div className='py-4 flex justify-between items-center'>
                        <div>
                            <h2 className='text-lg font-medium'>Subtotal</h2>
                            <h4 className='text-sm text-gray-600'>Shipping and taxes calculated at checkout.</h4>
                        </div>
                        <h2 className='text-lg font-semibold'>${totalPrice}</h2>
                    </div>

                    <div className='text-center'>
                        <Link to='/checkout'>
                            <button className='w-full btn-primary mb-2'>Checkout</button>
                        </Link>
    
                        <h4>or <Link to='/'>
                            <span className='text-purpleButton underline underline-offset-3 hover:cursor-pointer'>Continue Shopping</span>
                        </Link> </h4>
                    </div>
                    </>
                    
                ) : (<></>)
            }
            
        </div>
    )
};

export default CartPage;