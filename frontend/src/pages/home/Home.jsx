import React from 'react';
import Banner from './Banner';
import CuratorsSpotlight from './CuratorsSpotlight';
import Trending from './Trending';

/* Home page of the website */
const Home = () => {
    return (
        <>
            <Banner/> {/* Banner component */}
            <CuratorsSpotlight/> {/* Curator's spotlight component */}
            <Trending/> {/* Trending component */}
            
        </>
    )
};

export default Home;