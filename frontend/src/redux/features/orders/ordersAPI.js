import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Configure the base query with default settings
const baseQuery = fetchBaseQuery({
    baseUrl: `http://localhost:${import.meta.env.VITE_PORT}/api/orders`, // Set the base URL with the port of the '.env.local' file
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

const ordersAPI = createApi({
    reducerPath: 'ordersAPI', // Unique key to identify this API slice in the Redux store
    baseQuery, // The base query configuration defined earlier
    tagTypes: ['Orders'], // Tags used for cache management and invalidation

    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: '/create-order', // Endpoint for creating a new order (base URL + '/create-order')
                method: 'POST',  // POST http method since this is a create operation
                body: newOrder // Attach the newOrder object as the request body
            })
        }),

        getOrdersByEmail: builder.query({
            query: (email) => `/${email}`,
            providesTags: ['Orders']
        })

    })
});

export const { useCreateOrderMutation, useGetOrdersByEmailQuery } = ordersAPI;
export default ordersAPI;