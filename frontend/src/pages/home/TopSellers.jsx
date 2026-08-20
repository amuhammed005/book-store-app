import { useState } from "react";
import BookCard from "../books/BookCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const TopSellers = () => {
  // const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

  const { data, isLoading, isError } = useFetchAllBooksQuery();
  const books = data?.books ?? [];
  const categories = ["all", ...new Set(books.map((book) => book.category))];

  const filteredBooks =
    selectedCategory === "all"
      ? books
      : books.filter(
          (book) => book.category === selectedCategory
        );

  // useEffect(() => {
  //   fetch("books.json")
  //     .then((res) => res.json())
  //     .then((data) => setBooks(data));
  // }, []);

  return (
  <div className="py-10">
      <h1 className="text-3xl font-semibold mb-8">Top Sellers</h1>
      <div className="flex items-center mb-6">
        <select
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "All genres" : category.replace(/-/g, " ")}
            </option>
          ))}
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
        {isLoading && <p>Loading books…</p>}
        {isError && <p className="text-red-600">We could not load the catalogue.</p>}
        {!isLoading && !isError && filteredBooks.length === 0 && (
          <p>No books match this genre yet.</p>
        )}
        {filteredBooks?.length > 0 &&
          filteredBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TopSellers;
