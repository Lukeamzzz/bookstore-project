import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../firebase/AuthContext.jsx';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersAPI';
import Swal from 'sweetalert2';
import { clearCart } from '../../redux/features/cart/cartSlice.js';
import Loading from '../../components/Loading.jsx';

const CheckoutPage = () => {
    // Retrieve the cartItems array from the cart slice of the redux state
    let cartItems = useSelector(state => state.cart.cartItems);

    // Calculate the total price of the cart by their `newPrice` values, then format the result to 2 decimal places
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);

    // Extract the currently logged-in user from the authentication context
    const { currentUser } = useAuth(); 

    // Get the hook defined at the 'ordersAPI' file to create an order and track its loading state
    const [createOrder, {isLoading}] = useCreateOrderMutation();

    // React Router hook to redirect the user to another page
    const navigate = useNavigate();

    // Destructure methods and properties from the useForm() hook provided by react-hook-form
    const {
        register, // Method to register input fields for validation and data tracking
        handleSubmit, // Function to handle the form submission and trigger validation
        formState: { errors }, // Object containing validation errors for each field
    } = useForm();

    // React state to track whether the user has checked the 'I agree...' box
    const [isChecked, setIsChecked] = useState(false); 

    // React-Redux hook to dispatch actions, such as clearing the cart after checkout
    const dispatch = useDispatch();

    // Function to handle form submission
    const onSubmit = async (data) => {
        // Create a new order, ensuring it matches the structure required by the database
        const newOrder = {
            name: data.name,
            email: data.email,
            location: {
                address: data.address,
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice
        };

        try{
            // Send the order to the server using the createOrder mutation and wait for the response
            await createOrder(newOrder).unwrap();
            // Show a success message to the user
            Swal.fire({
                title: 'Order created successfully',
                icon: 'success',
                iconColor: '#9450A1',
                draggable: false,
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#9450A1',
                timer: 5000
            });
            navigate('/orders'); // Redirect the user to the main page
            dispatch(clearCart()); // Dispatch the clearCart action to empty the cart after successful checkout
        } 
        catch (error){
            console.error('Error placing an order', error);
            Swal.fire({
                title: 'An error occurred while processing the order',
                icon: 'error',
                iconColor: '#9450A1',
                draggable: false,
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#9450A1',
                timer: 5000
            });
        }
    };

    // Render a loading state if the order creation API call is in progress
    if(isLoading){
        return(
            <Loading/>
        )
    };

    return(
        <section>
            <div className='min-h-screen p-6 bg-gray-100 flex items-center justify-center rounded-md'>
                <div className='container max-w-screen-lg mx-auto'>
                    <div>
                        <div>
                            <h2 className='font-semibold text-2xl mb-2'>Checkout</h2>
                            <p className='text-md mb-2'>Total Price: <span className='font-semibold'>${totalPrice}</span></p>
                            <p className='text-md mb-6'>Items: <span className='font-semibold'>{cartItems.length}</span></p>
                        </div>

                        <div className='bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6'>
                            <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8'>
                                <div>
                                    <p className='font-semibold text-xl mb-2'>Personal Details</p>
                                    <p className='text-md'>Please fill out all fields</p>
                                </div>

                                <div className='lg:col-span-2'>
                                    <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5'>
                                        <div className='md:col-span-5'>
                                            <label htmlFor='full_name'>Full Name</label>
                                            <input
                                                {...register('name', { required: true })}
                                                type='text' name='name' id='name' className='h-10 border mt-1 rounded px-4 w-full bg-gray-100'/>
                                        </div>

                                        <div className='md:col-span-5'>
                                            <label html='email'>Email Address</label>
                                            <input
                                                type='text' name='email' id='email' className='h-10 border mt-1 rounded px-4 w-full bg-gray-100' 
                                                {...register('email', { required: true })}
                                                defaultValue={currentUser?.email}
                                                placeholder='email@domain.com' />
                                        </div>
                                        <div className='md:col-span-5'>
                                            <label html='phone'>Phone Number</label>
                                            <input
                                                {...register('phone', { required: true })}
                                                type='number' name='phone' id='phone' className='h-10 border mt-1 rounded px-4 w-full bg-gray-100' placeholder='+123 456 7890' />
                                        </div>

                                        <div className='md:col-span-3'>
                                            <label htmlFor='address'>Address</label>
                                            <input
                                                {...register('address', { required: true })}
                                                type='text' name='address' id='address' className='h-10 border mt-1 rounded px-4 w-full bg-gray-100' placeholder='' />
                                        </div>

                                        <div className='md:col-span-2'>
                                            <label htmlFor='city'>City</label>
                                            <input
                                                {...register('city', { required: true })}
                                                type='text' name='city' id='city' className='h-10 border mt-1 rounded px-4 w-full bg-gray-100' placeholder='' />
                                        </div>

                                        <div className='md:col-span-2'>
                                            <label htmlFor='country'>Country</label>
                                            <div className='h-10 bg-gray-100 flex border border-gray-200 rounded items-center mt-1'>
                                                <input
                                                 {...register('country', { required: true })}
                                                    name='country' id='country' className='px-4 appearance-none outline-none text-gray-800 w-full bg-transparent'  />
                                                <button tabIndex='-1' className='cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-purpleButton'>
                                                    <svg className='w-4 h-4 mx-2 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                                        <line x1='18' y1='6' x2='6' y2='18'></line>
                                                        <line x1='6' y1='6' x2='18' y2='18'></line>
                                                    </svg>
                                                </button>
                                                <button tabIndex='-1' className='cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-purpleButton'>
                                                    <svg className='w-4 h-4 mx-2 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polyline points='18 15 12 9 6 15'></polyline></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className='md:col-span-2'>
                                            <label htmlFor='state'>State / Province</label>
                                            <div className='h-10 bg-gray-100 flex border border-gray-200 rounded items-center mt-1'>
                                                <input 
                                                {...register('state', { required: true })}
                                                name='state' id='state' className='px-4 appearance-none outline-none text-gray-800 w-full bg-transparent'  />
                                                <button  className='cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-purpleButton'>
                                                    <svg className='w-4 h-4 mx-2 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                                        <line x1='18' y1='6' x2='6' y2='18'></line>
                                                        <line x1='6' y1='6' x2='18' y2='18'></line>
                                                    </svg>
                                                </button>
                                                <button tabIndex='-1' className='cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-purpleButton'>
                                                    <svg className='w-4 h-4 mx-2 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polyline points='18 15 12 9 6 15'></polyline></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className='md:col-span-1'>
                                            <label htmlFor='zipcode'>Zip Code</label>
                                            <input 
                                            {...register('zipcode', { required: true })}
                                            type='text' name='zipcode' id='zipcode' className='transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-100' placeholder='' />
                                        </div>

                                        <div className='md:col-span-5 mt-3'>
                                            <div className='inline-flex items-center'>
                                                <input 
                                                onChange={(e) => setIsChecked(e.target.checked)}
                                                type='checkbox' name='billing_same' id='billing_same' className='form-checkbox' />
                                                <label htmlFor='billing_same' className='ml-2'>I agree with the <Link className='underline underline-offset-2 text-purpleButton'>Terms & Conditions</Link> and <Link className='underline underline-offset-2 text-purpleButton'>Shopping Policy</Link></label>
                                            </div>
                                        </div>

                                        <div className='text-left md:col-span-5 mt-3'>
                                            <div className='inline-flex items-end'>
                                                <button 
                                                disabled={!isChecked} // If the terms are not accepted, the 'place an order' button gets disabled
                                                className='btn-primary'>Place an Order</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default CheckoutPage;