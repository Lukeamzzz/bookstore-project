import React from 'react';
import logo from '../../assets/footer-logo.png';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiViewGridAdd, HiOutlinePencil } from 'react-icons/hi';
import { MdOutlineManageHistory, MdAdd, MdLogout } from 'react-icons/md';
import { IoIosStats } from 'react-icons/io';

const DashboardLayout = () => {
    const navigate = useNavigate();

    // Function to handle admin logout
    const handleLogOut = () => {
        localStorage.removeItem('token'); // Remove authentication token
        navigate('/'); // Redirect to home page
    }

    return (
        <section className='flex bg-gray-100 min-h-screen overflow-hidden'>
            {/* Sidebar Navigation */}
            <aside className='hidden sm:flex sm:flex-col'>
                {/* Logo linking to home */}
                <a href='/' className='inline-flex items-center justify-center h-20 w-20 bg-gradient-to-r from-indigo-600 to-purple-500'>
                    <img src={logo} className='size-8' />
                </a>
                
                {/* Sidebar navigation links */}
                <div className='flex-grow flex flex-col justify-between text-gray-500 bg-gray-800'>
                    <nav className='flex flex-col mx-4 my-6 space-y-4'>
                        {/* Dashboard navigation links with icons */}
                        <Link to='/dashboard' className='inline-flex items-center justify-center py-3 hover:bg-gray-700 focus:bg-white focus:text-purpleButton rounded-lg'>
                            <span className='sr-only'>Dashboard</span>
                            <IoIosStats className='size-7' />
                        </Link>
                        <Link to='/dashboard/add-new-book' className='inline-flex items-center justify-center py-3 hover:bg-gray-700 focus:bg-white focus:text-purpleButton rounded-lg'>
                            <span className='sr-only'>Add Book</span>
                            <HiViewGridAdd className='size-6' />
                        </Link>
                        <Link to='/dashboard/manage-books' className='inline-flex items-center justify-center py-3 hover:bg-gray-700 focus:bg-white focus:text-purpleButton rounded-lg'>
                            <span className='sr-only'>Manage Books</span>
                            <MdOutlineManageHistory className='size-6' />
                        </Link>
                    </nav>

                    {/* Logout button at the bottom of the sidebar */}
                    <div className='inline-flex items-center justify-center h-20 w-20 border-t border-gray-700'>
                        <button onClick={handleLogOut}>
                            <MdLogout className='size-6' />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className='flex-grow'>
                <main className='p-6 sm:p-10 space-y-6'>
                    {/* Dashboard header */}
                    <div className='flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between'>
                        <div className='mr-6'>
                            <h1 className='text-4xl font-semibold mb-2'>Dashboard</h1>
                            <h2 className='text-gray-600 ml-0.5'>Book Store Inventory</h2>
                        </div>

                        {/* Navigation buttons for managing books only available for mobile devices */}
                        <div className='flex md:flex-row items-start justify-end -mb-3 md:hidden'>
                            <Link to='/dashboard/manage-books' className='flex items-center gap-2 px-5 py-3 text-purpleButton border border-purpleButton rounded-md mb-3 hover:scale-105'>
                                <HiOutlinePencil className='size-5' />
                                Manage Books
                            </Link>

                            <Link to='/dashboard/add-new-book' className='flex items-center gap-2 px-5 py-3 text-white bg-purpleButton rounded-md ml-6 mb-3 hover:scale-105'>
                                <MdAdd className='size-6' />
                                Add New Book
                            </Link>
                        </div>
                    </div>

                    {/* Render nested routes */}
                    <Outlet />
                </main>
            </div>
        </section>
    );
};


export default DashboardLayout;