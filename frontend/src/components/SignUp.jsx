import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAuth } from '../firebase/AuthContext.jsx';

const SignUp = () => {
    const [message, setMessage] = useState('');
    
    // Destructure the needed functions from the auth context
    // These functions are used to handle user sign up logic
    const { registerUser, logInWithGoogle } = useAuth();

    // Destructure methods and properties from the useForm() hook provided by react-hook-form
    const {
        register, // Method to register input fields for validation and data tracking
        handleSubmit, // Function to handle the form submission and trigger validation
        formState: { errors }, // Object containing validation errors for each field
    } = useForm();

    // Function triggered when the form is submitted successfully
    const submitUserData = async (data) => {
        try{
            // Call the registerUser function with email and password from the form data
            await registerUser(data.email, data.password);
            alert('User registration successfully');
            // TODO: Create specific alert with swal for both, successful and failed sign ups
        } 
        catch (error){
            setMessage('Please provide a valid email address and password.');
        }
    }

    // Function triggered when the 'Sign up with Google' button is clicked
    const handleGoogleSignUp = async () => {
        try{
            await logInWithGoogle(); // This function serves for both, log users in and sign them up via Google
            alert('User registration successfully');
        } 
        catch (error){
            alert('Google sign up failed');
        }
    }

    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-96 bg-purpleButton text-white p-6 md:mb-24 text-center rounded-md shadow-lg'>
                <h2 className='text-2xl font-semibold mb-2'>Let's create your</h2>
                <h2 className='text-2xl font-semibold mb-8'>account now</h2>
                {/* The handleSubmit() function is provided by the useForm() hook from react-hook-form
                It validates the inputs before calling the 'submitUserData' function, 
                ensuring that invalid inputs, such as improperly formatted email addresses, are not submitted */}
                <form onSubmit={handleSubmit(submitUserData)}>
                    <div>
                        <input type='email' name='email' id='email' placeholder='Email' 
                        className='w-5/6 py-2 px-3 mb-6 rounded-md text-center text-black appearance-none focus:outline-none'
                        {...register('email', { required: true })}/>
                        {/* Register the email with react-hook-form and set the field as required */}

                        <input type='password' name='password' id='password' placeholder='Password' 
                        className='w-5/6 py-2 px-3 mb-6 rounded-md text-center text-black appearance-none focus:outline-none'
                        {...register('password', { required: true })}/>
                        {/* Register the password with react-hook-form and set the field as required */}
                    </div>
                    {
                        // If theres a message, show it (sign up failed)
                        message && <p className='text-xs italic mb-3'>{message}</p>
                    }
                    <div>
                        <button className='bg-black py-2 px-8 rounded-md hover:scale-105'>Sign Up</button>
                    </div>
                </form>

                {/* Google sign in method */}
                <div className='my-3 flex justify-center'>
                    <button onClick={handleGoogleSignUp}
                    className='flex gap-3 items-center bg-black hover:scale-105 py-2 px-4 rounded-md'>
                        <FaGoogle/>
                        Sign up with Google
                    </button>
                </div>

                <p>Already have an account? <Link to='/login' className='underline'>Log In</Link></p>
                <p className='mt-5 text-xs'>&copy; {new Date().getFullYear()} Book Store. All rights reserved.</p>
            </div>
        </div>
    )
};

export default SignUp;