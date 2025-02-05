import React from 'react';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../redux/features/books/booksAPI';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ManageBooks = () => {
    // Fetch all books data and provide a refetch function to reload data
    const { data: books, refetch } = useFetchAllBooksQuery();
    
    // Mutation hook for deleting a book
    const [ deleteBook ] = useDeleteBookMutation();

    // Function to handle book deletion
    const handleDeleteBook = async (id) => {
        try {
            // Attempt to delete the book
            await deleteBook(id).unwrap();

            // Show success message
            Swal.fire({
                title: 'Book deleted successfully',
                icon: 'success',
                iconColor: '#5cb85c',
                draggable: false,
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3b82f6',
                timer: 5000
            });

            // Refresh the book list
            refetch();
        }
        catch (error){
            console.error('Failed to delete book: ', error);

            // Show error message
            Swal.fire({
                title: 'Failed to delete book',
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

    return (
        <section className='py-1'>
            <div className='w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto'>
                <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded'>
                    
                    {/* Table Header */}
                    <div className='rounded-t mb-0 px-4 py-3 border-0'>
                        <div className='flex flex-wrap items-center'>
                            <div className='relative w-full max-w-full flex-grow flex-1'>
                                <h3 className='font-semibold'>Manage books</h3>
                            </div>
                        </div>
                    </div>

                    {/* Table Content */}
                    <div className='block w-full overflow-x-auto'>
                        <table className='bg-transparent w-full border-collapse'>
                            <thead>
                                <tr>
                                    <th className='px-6 align-middle border border-solid border-blueGray-900 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                                        #
                                    </th>
                                    <th className='px-6 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                                        Book Title
                                    </th>
                                    <th className='px-6 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                                        Category
                                    </th>
                                    <th className='px-6 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                                        Price
                                    </th>
                                    <th className='px-6 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'>
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* Display each book in a table row */}
                                {books && books.data.map((book, index) => (
                                    <tr key={index}>
                                        <th className='border-t-2 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700'>
                                            {index + 1}
                                        </th>
                                        <td className='border-t-2 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                                            {book.title}
                                        </td>
                                        <td className='border-t-2 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                                            {book.category}
                                        </td>
                                        <td className='border-t-2 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                                            ${book.newPrice}
                                        </td>
                                        <td className='border-t-2 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-2 text-center'>
                                            {/* Update Book Button */}
                                            <Link to={`/dashboard/update-book/${book._id}`} className='font-medium bg-cyan-500 py-1 px-4 rounded-full text-white mr-2'>
                                                Update
                                            </Link>

                                            {/* Delete Book Button */}
                                            <button 
                                                onClick={() => handleDeleteBook(book._id)}
                                                className='font-medium bg-red-500 py-1 px-4 rounded-full text-white mr-2'>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ManageBooks;
