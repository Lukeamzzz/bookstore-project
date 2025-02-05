import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'; // Firebase method to create a user with email and password
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase.config';

// Create an authentication context, this will provide auth related data and functions to the app
const AuthContext = createContext();

// Hook for easier access to the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// Google provider to enable the log in with Google method
const googleProvider = new GoogleAuthProvider();

// Auth Provider Component
export const AuthProvider = ({children}) => {
    // State to keep track of the current user
    const [currentUser, setCurrentUser] = useState(null); // Initially set to null (no user logged in)

    // State to track whether authentication-related processes, such as fetching user data, are ongoing
    const [isLoading, setIsLoading] = useState(true); // Initially set to true (data loading is assumed)

    // Function to register a new user using firebase authentication (used in the 'SignUp.jsx' file)
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
        // The 'auth' parameter is imported from 'firebase.config.js'
    }

    // Function to authenticate users in firebase and logged them in
    const logInUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    // Function to log in and also sign up users via Google
    const logInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider);
    }

    // Function to log out users
    const logOut = () => {
        return signOut(auth);
    };

    // Manage user state and listen for authentication state changes
    useEffect(() => {
        // Subscribe to authentication state changes using Firebase 'onAuthStateChanged'
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // Update the 'currentUser' state with the user object if logged in
            setCurrentUser(user);            
            setIsLoading(false); // Indicate that the authentication check is complete

            if(user){
                // If the user is logged in, extract the following details:
                const {email, displayName, photoURL} = user;

                // Prepare an object to store or display the user's data
                const userData = {
                    email, username: displayName, photo: photoURL
                }
            }
        });

        // Cleanup function: unsubscribe from the 'onAuthStateChanged' listener
        // This prevents memory leaks when the component unmounts
        return () => unsubscribe();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    // Values (variables and functions) to be shared across the app via the AuthContext component
    const values = {
        currentUser,
        isLoading,
        registerUser,
        logInUser,
        logInWithGoogle,
        logOut
    }

    // Provide the context value to all child components
    return (
        <AuthContext.Provider value={values}>
            {children} {/* The 'children' prop represents all components wrapped within AuthProvider in the 'App.jsx' file */}
        </AuthContext.Provider>
    )
};