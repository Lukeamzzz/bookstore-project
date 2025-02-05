import React from 'react';
import footerLogo  from '../assets/footer-logo.png';
import { PiXLogo } from 'react-icons/pi';
import { FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-purpleButton py-6 px-4'>
        {/* Top Section */}
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center gap-8'>
                {/* Left Side - Logo and Nav */}
                <div className='md:w-1/2 '>
                    <img src={footerLogo} alt='Logo' className='mb-5 w-36 ml-16' />
                    <ul className='flex flex-row gap-4'>
                        <li><a href='#home' className='hover:text-white duration-200'>Home</a></li>
                        <li><a href='#services' className='hover:text-white'>Services</a></li>
                        <li><a href='#about' className='hover:text-white'>About Us</a></li>
                        <li><a href='#contact' className='hover:text-white'>Contact</a></li>
                    </ul>
                </div>

                {/* Right Side - Newsletter */}
                <div className='md:w-1/2 w-full'>
                <p className='mb-4 text-center'>Subscribe to our newsletter to receive the latest updates and offers!</p>
                    <div className='flex'>
                        <input type='email' placeholder='Enter your email' className='w-full px-4 rounded-l-md text-black'/>
                        <button className='bg-black text-white px-6 py-2 rounded-r-md hover:scale-105 duration-200'>
                            {/* The button is just rounded on the right side so that it seems integrated to the input field, which is just rounded on the left side */}
                            Subscribe
                        </button>
                    </div>
                </div>
        </div>

      {/* Bottom Section */}
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center mt-8 border-t border-black pt-6'>
            {/* Left Side - Privacy Links */}
            <ul className='flex gap-6 mb-4'>
                <li><a href='#privacy' className='hover:text-white duration-200'>Privacy Policy</a></li>
                <li><a href='#terms' className='hover:text-white duration-200'>Terms of Service</a></li>
            </ul>

            {/* Right Side - Social Icons */}
            <div className='flex gap-6'>
                <a href='https://youtube.com' className='hover:text-white duration-200'>
                    <FaYoutube size={24} />
                </a>
                <a href='https://twitter.com' className='hover:text-white duration-200'>
                    <PiXLogo size={24} />
                </a>
                <a href='https://instagram.com' className='hover:text-white duration-200'>
                    <FaInstagram size={24} />
                </a>
            </div>
        </div>
    </footer>
  )
};

export default Footer;