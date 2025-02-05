import React, { useState, useEffect } from 'react';
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

const Trending = () => {
  // Get 'data' from the query response
  // If the query has not returned yet or it failed, the default value will be an empty object '{}'
  const { data = {} } = useFetchAllBooksQuery();

  // Extract the nested 'data' array from the received 'data'
  // If data.data is null, fallback to an empty array '[]'
  // This prevents errors when trying to map/filter over books before data loads
  const books = data.data || [];

  const trendingBooks = books.filter(book => book.trending == true) // Get the books with the trending attribute set as true

  return (
    <div className='md:mx-5 mt-6'>
      <h2 className='md:text-4xl text-2xl font-medium mb-6'>Trending</h2>

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
          trendingBooks.map((book, index) => ( // Iterate over the trending books
              <SwiperSlide key={index}> {/* Create a SwiperSlide for each of the trending books on the list */}
                  <BookCard book={book}/> {/* Create a BookCard for each of the trending books on the list */}
                  {/* We need to give to the BookCard component a book, as specified on 'BookCard.jsx' */}
              </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
};

export default Trending;