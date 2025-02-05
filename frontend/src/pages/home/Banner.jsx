import React from 'react';
import bannerImg from '../../assets/banner.jpeg'

const Banner = () => {
    return (
        <div className='flex flex-col md:flex-row-reverse items-center'>

            <div className='w-1/2 md:w-1/3 md:mr-6 mb-7'>
                <img src={bannerImg} alt='Banner Image'/>
            </div>

            <div className='md:mx-5'>
                <h1 className='md:text-5xl text-2xl font-medium mb-7'>Dive into the latest releases</h1>
                <p>It's time to update your reading list with some of the latest and greatest releases in the literary world.</p>
                <p className='mb-7'>From thought-provoking novels to enchanting literary gems, this week's new releases offer something for everyone.</p>
                <button className='btn-primary ml-24 md:ml-0'>Suscribe</button> {/* This btn-primary styling is defined at the 'App.css' file */}
            </div>

        </div>
    )
};

export default Banner;