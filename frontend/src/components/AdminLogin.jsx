import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [message, setMessage] = useState('');

    // Destructure methods and properties from the useForm() hook provided by react-hook-form
    const {
        register, // Method to register input fields for validation and data tracking
        handleSubmit, // Function to handle the form submission and trigger validation
        formState: { errors }, // Object containing validation errors for each field
    } = useForm();

    const navigate = useNavigate();

    // Function triggered when the form is submitted successfully
    const submitUserData = async (data) => {
        try{
            // Send a POST request to the admin authentication endpoint with the provided user data
            const response = await axios.post(`http://localhost:${import.meta.env.VITE_PORT}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json' // Specify that the request body is in JSON format
                }
            });
    
            // Extract authentication data from the response
            const auth = response.data;
    
            // Check if the response contains a token
            if(auth.token){
                // Store the token in local storage for session management
                localStorage.setItem('token', auth.token);
    
                // Set a timeout to remove the token after 1 hour (3600 seconds)
                setTimeout(() => {
                    localStorage.removeItem('token'); // Remove token from local storage
                    alert('Your token has expired. Please log in again.'); // Notify the user
                    navigate('/admin'); // Redirect the user to the admin login page
                }, 3600 * 1000);
            }
    
            navigate('/dashboard');
        } 
        catch (error){
            // Display an error message if authentication fails
            setMessage('Please provide valid credentials');
            
            // Log the error message to the console for debugging
            console.error(error.message);
        }
    };

    return (
        <div className='h-screen flex justify-center items-center font-textFont'>
            <div className='w-96 bg-purpleButton text-white p-6 md:mb-24 text-center rounded-md shadow-lg'>
                <h2 className='text-2xl font-semibold my-2'>Welcome, Admin! </h2>
                <h2 className='text-lg mt-2 mb-6'>Please log in for full access and system management.</h2>
                {/* The handleSubmit() function is provided by the useForm() hook from react-hook-form
                It validates the inputs before calling the 'submitUserData' function, 
                ensuring that invalid inputs, such as improperly formatted username, are not submitted */}
                <form onSubmit={handleSubmit(submitUserData)}>
                    <div>
                        <input type='text ' name='username' id='username' placeholder='Username' 
                        className='w-5/6 py-2 px-3 mb-6 rounded-md text-center text-black appearance-none focus:outline-none'
                        {...register('username', { required: true })}/>

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

                <p className='mt-5 text-xs'>&copy; {new Date().getFullYear()} Book Store. All rights reserved.</p>
            </div>
        </div>
    )
};

export default AdminLogin;