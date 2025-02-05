import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from './InputField';
import SelectField from './SelectField';
import { useCreateBookMutation } from '../../redux/features/books/booksAPI';
import Swal from 'sweetalert2';

const AddBook = () => {
    const [imageFile, setimageFile] = useState(null); // Store the selected image file
    const [imageFileName, setimageFileName] = useState(''); // Store the image file name
    const [addBook] = useCreateBookMutation(); // API mutation hook to add a book

    // Destructure methods and properties from the useForm() hook provided by react-hook-form
    const {
        register, // Method to register input fields for validation and data tracking
        handleSubmit, // Function to handle the form submission and trigger validation
        formState: { errors }, // Object containing validation errors for each field
        reset // Function to reset the form fields after submission
    } = useForm();

    // Handle form submission
    const onSubmit = async (data) => {
        const newBookData = {
            ...data,
            coverImage: imageFileName // Attach the selected image file name
        };

        try{
            await addBook(newBookData).unwrap(); // Call API to add book

            // Show success alert
            Swal.fire({
                title: 'Book added successfully',
                icon: 'success',
                iconColor: '#5cb85c',
                draggable: false,
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3b82f6',
                timer: 5000
            });

            reset(); // Reset form fields
            setimageFileName(''); // Reset image file name
            setimageFile(null);

        } 
        catch (error){
            console.error(error);
            // Show error alert
            Swal.fire({
                title: 'Failed to add book',
                text: error.data.message || error.error || 'An unknown error occurred',
                icon: 'error',
                iconColor: '#ef4444',
                draggable: false,
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3b82f6',
                timer: 5000
            });
        }
    };

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Retrieves the first file that the user selects from the file input
        if(file){
            setimageFile(file);
            setimageFileName(file.name);
        }
    };

    return (
        <div className='max-w-lg mx-auto md:p-8 p-6 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200'>
            <h2 className='text-3xl font-bold mb-6 text-center'>Add New Book</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Book title field */}
                <InputField
                    label='Book Title'
                    name='title'
                    placeholder='Type in the book title...'
                    register={register}
                    className='border-gray-300'
                />

                {/* Author field */}
                <InputField
                    label='Author'
                    name='author'
                    placeholder='Type in the book author...'
                    register={register}
                    className='border-gray-300'
                />

                <h3 className='block text-sm font-semibold mb-1'>Description</h3>
                {/* Description text area (allows vertical resizing) */}
                <textarea
                    {...register('description')}
                    placeholder='Write a brief summary of the book...'
                    className='border border-gray-300 w-full p-2 mb-2 rounded-md resize-y'
                ></textarea>

                {/* Genre selection */}
                <SelectField
                    label='Genre'
                    name='category'
                    options={[
                        { value: '', label: 'Choose a genre' },
                        { value: 'Fantasy', label: 'Fantasy' },
                        { value: 'Manga', label: 'Manga' },
                        { value: 'Philosophy', label: 'Philosophy' },
                        { value: 'Suspense', label: 'Suspense' },
                        { value: 'Fiction', label: 'Fiction' },
                        { value: 'Classics', label: 'Classics' },
                        { value: 'Romance', label: 'Romance' },
                        { value: 'Self-Help', label: 'Self-Help' },
                        { value: 'Memoir', label: 'Memoir' },
                    ]}
                    register={register}
                    className='border-gray-300'
                />

                {/* Trending checkbox */}
                <div className='flex items-center gap-3 justify-center mb-3'>
                    <input
                        type='checkbox'
                        {...register('trending')}
                        className='w-6 h-6 rounded border-gray-300'
                    />
                    <label className='text-sm font-semibold'>Mark as Trending</label>
                </div>

                {/* Old price field */}
                <InputField
                    label='Original Price (USD)'
                    name='oldPrice'
                    type='text'
                    placeholder='$20.00'
                    register={register}
                    className='border-gray-300'
                />

                {/* New price field */}
                <InputField
                    label='Discounted Price (USD)'
                    name='newPrice'
                    type='text'
                    placeholder='$14.99'
                    register={register}
                    className='border-gray-300'
                />

                {/* Rating field */}
                <InputField
                    label='Rating (0 to 5 stars)'
                    name='rating'
                    type='text'
                    placeholder='4.2'
                    register={register}
                    className='border-gray-300'
                />

                {/* File upload for cover image */}
                <div className='mb-4'>
                    <label className='block text-sm font-semibold mb-2'>Cover Image</label>
                    <div className='relative border border-gray-300 rounded-md px-4 py-2 bg-gray-50 hover:bg-gray-100 transition cursor-pointer'>
                        <input 
                            type='file' 
                            accept='image/*' 
                            onChange={handleFileChange} 
                            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer' 
                        />
                        <p className='text-sm text-gray-600'>{imageFileName ? `📷 ${imageFileName}` : 'Upload image file'}</p>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type='submit'
                    className='w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-all'
                >
                    Submit Book
                </button>
            </form>
        </div>
    );
};


export default AddBook;