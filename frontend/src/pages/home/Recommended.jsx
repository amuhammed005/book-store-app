// import { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import BookCard from "../books/BookCard";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const Recommended = () => {
  // const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   fetch("books.json")
  //     .then((res) => res.json())
  //     .then((data) => setBooks(data));
  // }, []);

  const { data, isLoading, isError } = useFetchAllBooksQuery();
  const books = data?.books ?? [];

  return (
    <div className="py-16">
      <h1 className="text-3xl font-semibold mb-8">Recommended for you</h1>
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
            slidesPerView: 1,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {isLoading && <p>Loading recommendations…</p>}
        {isError && <p className="text-red-600">Recommendations are temporarily unavailable.</p>}
        {books?.length > 0 &&
          books.slice(8, 16).map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Recommended;
