// import { useEffect, useState } from "react";

import BookCard from "../books/BookCard";
import BookCardSkeleton from "../books/BookCardSkeleton";
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
    <section className="py-14">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">Keep exploring</p>
      <h1 className="mb-8 text-3xl font-semibold">Recommended for you</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading && Array.from({ length: 6 }, (_, index) => <BookCardSkeleton key={index} />)}
        {!isLoading && books.slice(9, 18).map((book) => <BookCard key={book._id} book={book} />)}
      </div>
      {isError && <p className="mt-6 text-red-600">Recommendations are temporarily unavailable.</p>}
    </section>
  );
};

export default Recommended;
