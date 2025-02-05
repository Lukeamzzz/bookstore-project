import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/*
  createApi():
    - Defines a set of endpoints for interacting with a backend API
    - Simplifies state management for fetching, caching, and transforming backend data

 fetchBaseQuery():
    - Simplifies HTTP requests
    - Ideal for most users to use as the baseQuery in createApi()
*/

// Configure the base query with default settings
const baseQuery = fetchBaseQuery({
    baseUrl: `http://localhost:${import.meta.env.VITE_PORT}/api/books`, // Set the base URL with the port of the '.env.local' file
    credentials: 'include', // Allows cross-origin requests to include credentials like cookies
    prepareHeaders: (Headers) => {
        // Attach an Authorization token if available in localStorage
        const token = localStorage.getItem('token');
        if(token){
            Headers.set('Authorization', `Bearer ${token}`); // Add Bearer token for protected routes
        }
        return Headers;
    }
});

// Define the API
const booksAPI = createApi({
    reducerPath: 'booksAPI', // Unique key to identify this API slice in the Redux store
    baseQuery, // The base query configuration defined earlier
    tagTypes: ['Books'], // Tags used for cache management and invalidation
    
    endpoints: (builder) => ({ // The builder parameter provides methods to define query and mutation endpoints
        // Fetch all books endpoint
        fetchAllBooks: builder.query({
            query: () => '/', // Specific API endpoint for fetching all books (base URL + '/')
            providesTags: ['Books'] // Associates the result of this query with the 'Books' tag
        }),

        // Fetch a single book by id endpoint
        fetchSingleBook: builder.query({
            query: (id) => `/${id}`, // Endpoint for fetching a single book (base URL + '/id')
            providesTags: (result, error, id) => [{ type: 'Books', id }]
        }),

        // Create book endpoint
        createBook: builder.mutation({
            query: (newBook) => ({
                url: '/create-book', // Endpoint for creating a new book (base URL + '/create-book')
                method: 'POST',  // POST http method since this is a create operation
                body: newBook // Attach the newBook object as the request body
            }),
            // Invalidate the 'Books' tag in cache after a new book is created
            // This ensures that when a book is created the data will be refreshed,
            // making sure the fetchAllBooks hook fetches the newest book (since this hook provides the tag 'Books')
            invalidatesTags: ['Books']
        }),

        // Update a book endpoint
        updateBook: builder.mutation({
            query: ({ id, updatedData }) => ({
                url: `/update-book/${id}`, // Endpoint for updating a book (base URL + '/update-book/id')
                method: 'PUT', // PUT http method since this is an update operation
                body: updatedData // Attach the updatedData as the request body
            }),

            invalidatesTags: ['Books'] // Refresh the entire data when a book is updated
        }),

        // Delete a book endpoint
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/delete-book/${id}`,
                method: 'DELETE',
            }),

            invalidatesTags: ['Books'] // Refresh the entire data when a book is deleted
        })
    })
});

export const { useFetchAllBooksQuery, useFetchSingleBookQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation } = booksAPI;
export default booksAPI;