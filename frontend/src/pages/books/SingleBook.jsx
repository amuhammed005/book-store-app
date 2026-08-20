import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useFetchBookByIdQuery } from "../../redux/features/books/booksApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isError, isLoading } = useFetchBookByIdQuery(id);

  const dispatch = useDispatch();

  const handleAddToCart = (payload) => {
    dispatch(addToCart(payload));
  };

  if (isLoading) return <div className="py-20 text-center">Loading book details…</div>;
  if (isError || !book) {
    return <div className="py-20 text-center text-red-600">We could not load this book.</div>;
  }

  return (
    <section className="min-h-screen py-10">
      <div className="mx-auto mb-5 max-w-3xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          <FiArrowLeft /> Back to books
        </button>
      </div>
      <article className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-6 shadow-lg md:p-10">
        <div className="mb-9 flex justify-center">
          <img
            src={`${getImgUrl(book.coverImage)}`}
            alt={book.title}
            className="h-[32rem] w-full max-w-xl rounded-xl border bg-gray-50 object-contain p-6 shadow-sm"
          />
        </div>
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-500">
            {book.category}
          </p>
          <h1 className="mb-5 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">{book.title}</h1>
          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">${Number(book.newPrice).toFixed(2)}</span>
            {book.oldPrice && <span className="text-lg text-gray-400 line-through">${Number(book.oldPrice).toFixed(2)}</span>}
          </div>
          <p className="mb-4 text-base leading-8 text-gray-600">
            {book.description}
          </p>
          <p className="mb-7 text-sm text-gray-500">
            Added {new Date(book.createdAt || Date.now()).toLocaleDateString()}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleAddToCart(book)}
              className="flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium hover:bg-secondary hover:text-white gap-3"
            >
              <FiShoppingCart />
              Add to Cart
            </button>
            <Link to="/cart" className="rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
              View Cart
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
};

export default SingleBook;
