import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import InputField from './InputField';
import SelectField from './SelectField';
import { useFetchSingleBookQuery } from '../../redux/features/books/booksAPI';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';

const UpdateBook = () => {
    const { id } = useParams(); // Extract book ID from the URL 

    // Fetch single book data based on ID and provide refetch method
    const { data: bookData, isLoading, refetch } = useFetchSingleBookQuery(id);

    const [imageFile, setimageFile] = useState(null); // Stores selected image file
    const [imageFileName, setimageFileName] = useState(''); // Stores the name of the selected file

    // Initialize form handling with react-hook-form
    const {
        register, // Registers input fields for validation and tracking
        handleSubmit, // Handles form submission and validation
        setValue // Sets default values for input fields
    } = useForm();

    // Populate form fields with existing book data when available
    useEffect(() => {
        if(bookData){
            setValue('title', bookData.data.title);
            setValue('author', bookData.data.author);
            setValue('description', bookData.data.description);
            setValue('category', bookData.data.category);
            setValue('trending', bookData.data.trending);
            setValue('oldPrice', bookData.data.oldPrice || '');
            setValue('newPrice', bookData.data.newPrice);
            setValue('rating', bookData.data.rating);
            setimageFileName(bookData.data.coverImage); // Store current cover image name
        }
    }, [bookData, setValue]);

    // Handle form submission
    const onSubmit = async (data) => {
        const updatedBookData = {
            title: data.title,
            author: data.author,
            description: data.description,
            category: data.category,
            trending: data.trending,
            // Since the old price is an optional value for the admin to input, if the field is left empty, log it into the database as null (if this process was not done, the database will recieve it as 0 instead of null)
            oldPrice: data.oldPrice == '' ? null : Number(data.oldPrice), 
            newPrice: Number(data.newPrice), // Convert price to number
            rating: data.rating,
            coverImage: data.coverImage || imageFileName // Use existing image if no new file selected
        };

        try{
            // Send PUT request to update book details
            await axios.put(`http://localhost:${import.meta.env.VITE_PORT}/api/books/update-book/${id}`, updatedBookData, {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Include authorization token
                }
            });

            // Show success message
            Swal.fire({
                title: 'Book updated successfully',
                icon: 'success',
                iconColor: '#5cb85c',
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3b82f6',
                timer: 5000
            });

            await refetch(); // Refetch updated book data
        } 
        catch (error){
            console.error(error);
            // Show error message
            Swal.fire({
                title: 'Failed to update book',
                text: error.data.message || error.error || 'An unknown error occurred',
                icon: 'error',
                iconColor: '#ef4444',
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3b82f6',
                timer: 5000
            })
        }
    };

    // Display loading indicator while fetching data
    if(isLoading){
        return (
            <div className='h-96 flex justify-center items-center'> 
                <Loading/>
            </div>
        );
    }

    // Handle file input change event
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Retrieve selected file
        if(file){
            setimageFile(file);
            setimageFileName(file.name); // Store file name for UI display
        }
    };

  return (
    <div className='max-w-lg mx-auto md:p-8 p-6 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200'>
        <h2 className='text-3xl font-bold mb-6 text-center'>Update Book</h2>

        {/* Form for updating book details */}
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField label='Book Title' name='title' placeholder='Type in the book title...' register={register} className='border-gray-300'/>
            <InputField label='Author' name='author' placeholder='Type in the book author...' register={register} className='border-gray-300'/>

            {/* Description field */}
            <h3 className='block text-sm font-semibold mb-1'>Description</h3>
            <textarea
                {...register('description')}
                placeholder='Write a brief summary of the book...'
                className='border border-gray-300 w-full p-2 mb-2 rounded-md resize-y'
            ></textarea>

            {/* Category selection dropdown */}
            <SelectField
                label='Genre'
                name='category'
                options={[
                    {value: '', label: 'Choose a genre' },
                    {value: 'Fantasy', label: 'Fantasy' },
                    {value: 'Manga', label: 'Manga' },
                    {value: 'Philosophy', label: 'Philosophy' },
                    {value: 'Suspense', label: 'Suspense' },
                    {value: 'Fiction', label: 'Fiction' },
                    {value: 'Classics', label: 'Classics' },
                    {value: 'Romance', label: 'Romance' },
                    {value: 'Self-Help', label: 'Self-Help' },
                    {value: 'Memoir', label: 'Memoir' },
                ]}
                register={register}
                className='border-gray-300'
            />

            {/* Checkbox for marking book as trending */}
            <div className='flex items-center gap-3 justify-center mb-3'>
                <input type='checkbox' {...register('trending')} className='w-6 h-6 rounded border-gray-300'/>
                <label className='text-sm font-semibold'>Mark as Trending</label>
            </div>

            {/* Price and rating inputs */}
            <InputField label='Original Price (USD)' name='oldPrice' type='text' placeholder='$20.00' className='border-gray-300'
            register={() => register('oldPrice')} />
            <InputField label='Discounted Price (USD)' name='newPrice' type='text' step='0.01' placeholder='$14.99' register={register} className='border-gray-300'/>
            <InputField label='Rating (0 to 5 stars)' name='rating' type='text' step='0.01' placeholder='4.2' register={register} className='border-gray-300'/>

            {/* File upload for cover image */}
            <div className='mb-4'>
                <label className='block text-sm font-semibold mb-2'>Cover Image</label>
                <div className='relative border border-gray-300 rounded-md px-4 py-2 bg-gray-50 hover:bg-gray-100 transition cursor-pointer'>
                    <input type='file' accept='image/*' onChange={handleFileChange} className='absolute inset-0 w-full h-full opacity-0 cursor-pointer' />
                    <p className='text-sm text-gray-600'>{imageFileName ? `📷 ${imageFileName}` : 'Upload image file'}</p>
                </div>
            </div>

            {/* Submit button */}
            <button type='submit' className='w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-all'>
                Submit update
            </button>
        </form>
    </div>
  );
};

export default UpdateBook;