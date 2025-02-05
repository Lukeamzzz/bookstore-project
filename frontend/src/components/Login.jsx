import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAuth } from '../firebase/AuthContext';


const Login = () => {
    const [message, setMessage] = useState('');

    // Destructure the functions needed from the custom Auth context
    // These functions are used to handle user login logic
    const { logInUser, logInWithGoogle } = useAuth();

    // Hook from react-router-dom to navigate programmatically between routes
    const navigate = useNavigate();

    // Destructure methods and properties from the useForm() hook provided by react-hook-form
    const {
        register, // Method to register input fields for validation and data tracking
        handleSubmit, // Function to handle the form submission and trigger validation
        formState: { errors }, // Object containing validation errors for each field
    } = useForm();

    // Function triggered when the form is submitted successfully
    const submitUserData = async (data) => {
        try{
            // Call the logInUser function with email and password from the form data
            await logInUser(data.email, data.password); 
            alert('Login successful');
            navigate('/'); // Navigate the user to the home page after successful login
        } 
        catch (error){
            setMessage('Please provide a valid email address and password.');
        }
    };

    // Function triggered when the 'Log in with Google' button is clicked
    const handleGoogleLogIn = async () => {
        try{
            await logInWithGoogle(); // This function serves for both, log users in and sign them up via Google
            alert('Login successful');
            navigate('/');
        } 
        catch (error){
            alert('Google log in failed ');
        }
    };

    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-96 bg-purpleButton text-white p-6 md:mb-24 text-center rounded-md shadow-lg'>
                <h2 className='text-2xl font-semibold mb-2'>Welcome!</h2>
                <h2 className='text-2xl font-semibold mb-8'>Log in to your account</h2>
                {/* The handleSubmit() function is provided by the useForm() hook from react-hook-form
                It validates the inputs before calling the 'submitUserData' function, 
                ensuring that invalid inputs, such as improperly formatted email addresses, are not submitted */}
                <form onSubmit={handleSubmit(submitUserData)}>
                    <div>
                        <input type='email' name='email' id='email' placeholder='Email' 
                        className='w-5/6 py-2 px-3 mb-6 rounded-md text-center text-black appearance-none focus:outline-none'
                        {...register('email', { required: true })}/>

                        <input type='password' name='password' id='password' placeholder='Password' 
                        className='w-5/6 py-2 px-3 mb-6 rounded-md text-center text-black appearance-none focus:outline-none'
                        {...register('password', { required: true })}/>
                    </div>
                    {
                        // If there's a message, show it (log in failed)
                        message && <p className='text-xs italic mb-3'>{message}</p>
                    }
                    <div>
                        <button className='bg-black py-2 px-8 rounded-md hover:scale-105'>Continue</button>
                    </div>
                </form>

                {/* Google sign in method */}
                <div className='my-3 flex justify-center'>
                    <button onClick={handleGoogleLogIn}
                    className='flex gap-3 items-center bg-black hover:scale-105 py-2 px-4 rounded-md'>
                        <FaGoogle/>
                        Log in with Google
                    </button>
                </div>

                <p>Don't have an account? <Link to='/signup' className='underline'>Sign Up</Link></p>
                <p className='mt-5 text-xs'>&copy; {new Date().getFullYear()} Book Store. All rights reserved.</p>
            </div>
        </div>
    )
};

export default Login;