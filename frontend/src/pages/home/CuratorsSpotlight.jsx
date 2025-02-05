import React, { useState } from 'react';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksAPI';

// Import Swiper React components in order to create the books sliders
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules for the slider
import { Pagination, Navigation } from 'swiper/modules';

const categories = ['Choose a genre', 'Suspense', 'Fantasy', 'Manga', 'Philosophy']

const CuratorsSpotlight = () => {
    // Get 'data' from the query response
    // If the query has not returned yet or it failed, the default value will be an empty object '{}'
    const { data = {} } = useFetchAllBooksQuery();

    // Extract the nested 'data' array from the received 'data'
    // If data.data is null, fallback to an empty array '[]'
    // This prevents errors when trying to map/filter over books before data loads
    const books = data.data || [];
    
    const [selectedCategory, setSelectedCategory] = useState('Choose a genre');  // 'Choose a genre' is the default value of selectedCategory

    // Use the filter method to iterate over the books array, if the book category is equal to the category selected on the button,
    // this book will be part of the filteredBooks array, in order to display only the books from a specific category
    // Otherwise, if the selected category is set as 'Choose a genre', show all books excluding the trending ones (since those will be displayed on a different slider)
    const filteredBooks = selectedCategory == 'Choose a genre' ? books.filter(book => book.trending == false) : books.filter(book => book.category == selectedCategory && book.trending != true)
    
    return (
        <div className='pt-6 md:mx-5'>
            <h2 className='md:text-4xl text-2xl font-medium mb-6'>Curator's Spotlight</h2>

            {/* Category filtering */}
            <div className='flex items-center'>
                {/* Listen for an event (a change in the button), when this happens call the setter for selectedCategory with the new value of the button (the book category to display) */}
                <select onChange={(e) => setSelectedCategory(e.target.value)} name='category' id='category' 
                className='bg-purpleButton rounded-md font-semibold font-buttonFont px-4 py-2 mb-4 cursor-pointer focus:outline-none'>
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))
                    }
                </select>          
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                },
                1180: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                }
                }}
                modules={[Pagination, Navigation]}
                className='mySwiper'
            >
                {
                    filteredBooks.map((book, index) => ( // Iterate over the selection of books filtered by the selected genre
                        <SwiperSlide key={index}> {/* Create a SwiperSlide for each of the books on the filtered list */}
                            <BookCard book={book}/> {/* Create a BookCard for each of the books on the filtered list */}
                            {/* We need to give to the BookCard component a book, as specified on 'BookCard.jsx' */}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            
            
        </div>
    )
};

export default CuratorsSpotlight;