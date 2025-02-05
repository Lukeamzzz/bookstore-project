import React from 'react';
import { useAuth } from '../firebase/AuthContext';
import { Navigate } from 'react-router-dom';

// This component ensures that only authenticated users (logged in) can access certain routes, such as the chekout page
// If a user is not authenticated, they are redirected to the login page

const PrivateRoute = ({ children }) => { // Take children as a prop
    const { currentUser, loading } = useAuth(); // Use the useAuth hook to retrieve the current user's authentication status

    // If the authentication state is still loading (Firebase is revalidating the user's session)
    // (this happens when the user refreshes the orders page), we display a loading indicator
    // This prevents the app from incorrectly redirecting the user to the login page
    // before the authentication state is fully resolved
    if(loading){
        return (
        <div className='h-screen font-semibold text-2xl'>
            Loading...
        </div>
        )
    }

    // Check if there is a currently authenticated user
    if(currentUser){
        // If the user is authenticated, render the children components (the protected page)
        return children;
    }

    // If the user is not authenticated, redirect them to the login page
    // The 'replace' prop ensures that the current location is replaced in the history stack
    // so the user cannot navigate back to the protected page after being redirected
    return <Navigate to='/login' replace/>;
};

export default PrivateRoute;