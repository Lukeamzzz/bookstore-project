import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { MdIncompleteCircle } from 'react-icons/md';
import { GiWhiteBook } from 'react-icons/gi';
import { IoIosTrendingUp } from 'react-icons/io';
import { BsFire } from 'react-icons/bs';
import { FaExclamation } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import RevenueChart from './RevenueChart';

const Dashboard = () => {
    // State to track if data is still loading
    const [isLoading, setIsLoading] = useState(true);
    
    // State to store fetched dashboard data
    const [data, setData] = useState({});

    useEffect(() => {
        // Function to fetch admin dashboard statistics
        const fetchData = async () => {
            try {
                // Send a GET request to fetch admin stats
                const response = await axios.get(`http://localhost:${import.meta.env.VITE_PORT}/api/admin/get-stats`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include auth token
                        'Content-Type': 'application/json'
                    }
                });

                // Store the retrieved data in state
                setData(response.data);
            }
            catch (error) {
                console.error(error.message); // Log errors
            }
            finally {
                // Ensure loading state lasts at least 4 seconds
                setTimeout(() => {
                    setIsLoading(false);
                }, 4000);
            }
        }

        fetchData();
    }, []);

    if (isLoading){
        return (
            <div className='h-96 flex justify-center items-center'> 
                <Loading/>
            </div>
        )
    }

    return (
        <>
            <section className='grid md:grid-cols-2 xl:grid-cols-4 gap-6'>
                <div className='flex items-center p-8 bg-white shadow rounded-lg'>
                    <div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purpleButton bg-purple-100 rounded-full mr-6'>
                        <GiWhiteBook className='size-7'/>
                    </div>
                    <div>
                        <span className='block text-2xl font-bold'>{data?.totalBooks}</span>
                        <span className='block text-gray-500'>Total Products</span>
                    </div>
                </div>
                <div className='flex items-center p-8 bg-white shadow rounded-lg'>
                    <div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6'>
                        <IoIosTrendingUp className='size-7'/>
                    </div>
                    <div>
                        <span className='block text-2xl font-bold'>${data?.totalSales}</span>
                        <span className='block text-gray-500'>Total Sales</span>
                    </div>
                </div>
                <div className='flex items-center p-8 bg-white shadow rounded-lg'>
                    <div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6'>
                        <BsFire className='size-7'/>
                    </div>
                    <div>
                        <text className='inline-block text-2xl font-bold mr-2'>{data?.trendingBooks}</text>
                        <text className='inline-block text-xl text-gray-500 font-semibold'>({ ((data?.trendingBooks / data?.totalBooks) * 100).toFixed(2) }%)</text>
                        <text className='block text-gray-500'>Trending Books This Month</text>
                    </div>
                </div>
                <div className='flex items-center p-8 bg-white shadow rounded-lg'>
                    <div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6'>
                        <MdIncompleteCircle className='size-7' />
                    </div>
                    <div>
                        <span className='block text-2xl font-bold'>{data?.totalOrders}</span>
                        <span className='block text-gray-500'>Total Orders</span>
                    </div>
                </div>
            </section>
            <section className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* Column 1: Revenue Chart */}
                <div className='rounded-xl'>
                    <RevenueChart />
                </div>
                
                {/* Column 2: Metrics */}
                <div className='flex flex-col gap-6'>
                    {/* Orders Left */}
                    <div className='flex items-center p-6 bg-white shadow-lg rounded-xl'>
                    <div className='inline-flex items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-4'>
                        <FaExclamation className='size-6' />
                    </div>
                    <div>
                        <span className='block text-2xl font-bold'>2</span>
                        <span className='block text-gray-500'>Orders left</span>
                    </div>
                    </div>
                    
                    {/* Website Visits */}
                    <div className='flex items-center p-6 bg-white shadow-lg rounded-xl'>
                    <div className='inline-flex items-center justify-center h-16 w-16 text-orange-600 bg-orange-100 rounded-full mr-4'>
                        <HiCursorClick className='size-7' />
                    </div>
                    <div>
                        <span className='block text-2xl font-bold'>139</span>
                        <span className='block text-gray-500'>Website visits (last day)</span>
                    </div>
                    </div>
                </div>
                
                {/* Column 3: Orders per User */}
                <div className='bg-white shadow-lg rounded-xl overflow-hidden'>
                    <div className='px-6 py-4 font-semibold border-b border-gray-200 bg-gray-50'>
                    <span>Orders per user</span>
                    </div>
                    <div className='overflow-y-auto' style={{ maxHeight: '24rem' }}>
                    <ul className='p-6 space-y-4'>
                        {[ 
                        { name: 'Annette Watson', img: 'women/82', score: 9 },
                        { name: 'Calvin Steward', img: 'men/81', score: 8 },
                        { name: 'Ralph Richards', img: 'men/80', score: 8 },
                        { name: 'Bernard Murphy', img: 'men/79', score: 7 },
                        { name: 'Arlene Robertson', img: 'women/78', score: 7 },
                        { name: 'Jane Lane', img: 'women/77', score: 7 },
                        { name: 'Pat Mckinney', img: 'men/76', score: 6 },
                        { name: 'Norman Walters', img: 'men/75', score: 5 }
                        ].map((user, index) => (
                        <li key={index} className='flex items-center'>
                            <div className='h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden'>
                            <img 
                                src={`https://randomuser.me/api/portraits/${user.img}.jpg`} 
                                alt={`${user.name} profile picture`} 
                            />
                            </div>
                            <span className='text-gray-600'>{user.name}</span>
                            <span className='ml-auto font-semibold'>{user.score}</span>
                        </li>
                        ))}
                    </ul>
                    </div>
                </div>
            </section>
        </>
    )
};

export default Dashboard;