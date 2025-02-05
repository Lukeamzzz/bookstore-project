import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiBookshelf } from 'react-icons/gi';
import { IoSearch } from 'react-icons/io5';
import { BiSolidBookHeart } from 'react-icons/bi';
import { HiOutlineUser, HiOutlineShoppingCart } from 'react-icons/hi';
import userPic from '../assets/user.png'
import { useSelector } from 'react-redux';
import { useAuth } from '../firebase/AuthContext.jsx';

const navigation = [
    {name: 'Dashboard', href: '/dashboard'},
    {name: 'Orders', href: '/orders'}
]

const NavBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false); // Boolean to show the dropdown menu when the user pic is clicked

    // useSelector is a react-redux hook that helps to access the redux state
    const cartItems = useSelector(state => state.cart.cartItems); // Retrieve the cartItems array from the cart slice of the redux state

    const { currentUser, logOut } = useAuth();

    const handleLogOut = () => {
        logOut(); // Call the log out function from the Auth Context
    };

    return (
        <header className='max-w-screen-2xl mx-auto px-4 pt-6'>
            <nav className='flex justify-between items-center'> {/* In order to keep both divs on the same horizontal line */}
                {/* Home and search bar */}
                <div className='flex items-center md:gap-10 gap-1'>
                    <Link to='/'>
                        <GiBookshelf className='size-16'/>
                    </Link>

                    <div className='relative sm:w-72 w-36 space-x-1'>
                        <IoSearch className='absolute inline-block left-3 inset-y-2' color='gray'/>
                        <input type='text' placeholder='Search here' className='bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none'/>
                    </div>
                </div>


                {/* Profile, favorites and cart*/}
                <div className='relative flex items-center md:space-x-5 space-x-2'>
                    <div>
                        {
                            /* If the current user is logged in (true), display the defined fragment, 
                            otherwise, display the default user icon with a link to the login page */

                            currentUser ? <>
                            <button onClick={() => setDropdownOpen(!dropdownOpen)}> {/* When the user pic gets clicked, it toggles the dropdown by using !dropdownOpen */}
                                <img src={userPic} alt='user pic' className='size-7 mt-2 rounded-full'/>
                            </button> 
                            {/* Dropdown section, if dropdownOpen is true, display the defined fragment */}
                            {
                                dropdownOpen && (
                                    <div className='absolute right-0 w-48 shadow-xl rounded-md z-40 bg-white'>
                                        <ul className='p-3'>
                                            { 
                                                /* Iterate over the navigation list of objects to show the names of each object as an item of the unordered list and link each of them to their respective href */
                                                navigation.map((item) => (
                                                    <li key={item.name} onClick={() => setDropdownOpen(false)}> {/* When some item from the list gets clicked, close the dropdown*/}
                                                        {/* block px-2 py-1 helps to create a bigger area for each item so that when hovered the bg color can be seen better */}
                                                        <Link to={item.href} className='block px-2 py-1 text-sm hover:bg-gray-200'>
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                            <li>
                                                <button className='block px-2 py-1 text-sm hover:bg-gray-200'
                                                onClick={() => handleLogOut()}>Log Out</button>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                            </> : <Link to={'/login'}> <HiOutlineUser className='size-7'/> </Link>
                        }
                    </div>
                    <BiSolidBookHeart className='size-7 cursor-pointer'/>
                    <Link to='/cart' className='flex bg-purpleButton p-1 sm:px-6 items-center rounded-md space-x-1'>
                        <HiOutlineShoppingCart className='size-6'/>
                        {/* Display the number of items in the cart by showing the length of the cartItems array */}
                        <span className='font-semibold sm:ml-1'>{cartItems.length}</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;