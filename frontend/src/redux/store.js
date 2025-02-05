import { configureStore } from '@reduxjs/toolkit';
import  cartReducer from './features/cart/cartSlice';
import booksAPI from './features/books/booksAPI';
import ordersAPI from './features/orders/ordersAPI';

// Configure and create the redux store
export const store = configureStore({
  reducer: {
    cart: cartReducer, // Add the cart slice reducer to manage the cart related state
    [booksAPI.reducerPath]: booksAPI.reducer, // Add the booksAPI reducer to manage the state for API queries and mutations
    [ordersAPI.reducerPath]: ordersAPI.reducer
  },

  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(booksAPI.middleware, ordersAPI.middleware)
});