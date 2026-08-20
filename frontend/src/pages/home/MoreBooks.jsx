import BookCard from "../books/BookCard";
import BookCardSkeleton from "../books/BookCardSkeleton";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const MoreBooks = () => {
  const { data, isLoading } = useFetchAllBooksQuery();
  const books = data?.books ?? [];

  return (
    <section className="py-14">
      <div className="mb-8 rounded-2xl bg-slate-900 px-7 py-10 text-white md:px-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Shelf after shelf</p>
        <h2 className="text-3xl font-semibold">More books to discover</h2>
        <p className="mt-3 max-w-2xl text-slate-300">Browse fresh genres, practical guides, and stories chosen for every kind of reader.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading && Array.from({ length: 6 }, (_, index) => <BookCardSkeleton key={index} />)}
        {!isLoading && books.slice(18, 30).map((book) => <BookCard key={book._id} book={book} />)}
      </div>
    </section>
  );
};

export default MoreBooks;
