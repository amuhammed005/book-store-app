import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "../books/BookCard";
import BookCardSkeleton from "../books/BookCardSkeleton";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchParams] = useSearchParams();

  const { data, isLoading, isError } = useFetchAllBooksQuery();
  const books = data?.books ?? [];
  const categories = ["all", ...new Set(books.map((book) => book.category))];

  const searchTerm = searchParams.get("search")?.trim().toLowerCase() || "";
  const filteredBooks =
    selectedCategory === "all"
      ? books
      : books.filter(
          (book) => book.category === selectedCategory
        );
  const visibleBooks = searchTerm
    ? filteredBooks.filter((book) =>
        `${book.title} ${book.description} ${book.category}`.toLowerCase().includes(searchTerm),
      )
    : filteredBooks.filter((book) => book.trending).slice(0, 9);

  // useEffect(() => {
  //   fetch("books.json")
  //     .then((res) => res.json())
  //     .then((data) => setBooks(data));
  // }, []);

  return (
    <section id="top-sellers" className="py-12">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">Reader favourites</p>
          <h1 className="text-3xl font-semibold">{searchTerm ? `Results for “${searchTerm}”` : "Top Sellers"}</h1>
        </div>
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
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading && Array.from({ length: 9 }, (_, index) => <BookCardSkeleton key={index} />)}
        {!isLoading && visibleBooks.map((book) => <BookCard key={book._id} book={book} />)}
      </div>
      {isError && <p className="mt-6 text-red-600">We could not load the catalogue. Please try again shortly.</p>}
      {!isLoading && !isError && visibleBooks.length === 0 && (
        <p className="mt-6 text-gray-600">No books match this genre or search.</p>
      )}
    </section>
  );
};

export default TopSellers;
