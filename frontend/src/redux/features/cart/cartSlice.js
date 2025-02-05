import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

// In this file a Redux slice is defined for managing the state of a shopping cart using Redux Toolkit

const initialState = { // The initialState defines the default state for the cart slice
    cartItems: [] // cartItems is an array that starts empty, representing no items in the cart
};

const cartSlice = createSlice({
    name: 'cart', // Name of the slice
    initialState: initialState, // The initial state of the slice is the one defined above
    reducers: { // The reducers are functions that represent how the state changes in response to actions
        addToCart: (state, action) => { // Handle the action of adding an item to the cart
            // state: The current state of the cart slice
            // action: The dispatched action, which includes a payload containing the data to be added to the cart
            const existingItem = state.cartItems.find(item => item._id === action.payload._id); // Check if the item already exists in the cart array
            if(!existingItem){ // If the item is not found in the cart
                state.cartItems.push(action.payload) // Add the item to the cart array
                // Alert the user the item has been added to the cart
                Swal.fire({
                    title: 'Item successfully added to the cart',
                    icon: 'success',
                    iconColor: '#9450A1',
                    draggable: false,
                    showConfirmButton: true,
                    confirmButtonColor: '#9450A1',
                    confirmButtonText: 'Ok',
                    timer: 5000,
                });
            }
            else{ // If the items already exists in the cart, send an alert for the user
                Swal.fire({
                    title: 'This item is already in the cart',
                    text: 'You can only acquire the same item once per checkout',
                    icon: 'info',
                    iconColor: '#9450A1',
                    showConfirmButton: false,
                    showCancelButton: true,
                    cancelButtonColor: '#9450A1',
                    cancelButtonText: 'Ok'
                });
            }
        },

        removeFromCart: (state, action) => { // Handle the action of removing an item from the cart
            // Update the array, keeping only items with different ids from the one that matches 
            // (If one of the ids of the items from the cart matches the one coming as the payload from the action of clicking the remove button, this item is removed)
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
        },

        clearCart: (state) => { // Remove all items from cart
            state.cartItems = [];
        }
    }
});

// Export the reducer and actions 
export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;