import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (payload) => {
    dispatch(addToCart(payload));
  };

  return (
    <div className="h-full rounded-xl bg-white p-4 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center">
        {/* Book Image */}
        <div className="flex h-64 justify-center overflow-hidden rounded-lg border bg-gray-50 sm:h-72 sm:w-44 sm:flex-shrink-0">
          <Link to={`/books/${book._id}`} className="block">
            <img
              src={`${getImgUrl(book.coverImage)}`}
              alt="bookImg"
              className="h-full w-full object-contain p-3 cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Book Details */}
        <div className="flex flex-col justify-between">
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3 transition-colors duration-300">
              {book.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-4 leading-6">
            {book?.description.length > 60
              ? `${book?.description.slice(0, 60)}...`
              : book?.description}
          </p>
          <p className="font-medium mb-4">
            ${book.newPrice}{" "}
            <span className="line-through font-normal ml-2">
              ${book?.oldPrice}
            </span>
          </p>
          <button
            onClick={() => handleAddToCart(book)}
            className="flex items-center bg-primary hover:bg-hoverPrimary p-2 px-4 py-2 rounded-md gap-3 transition-all duration-300 hover:scale-105"
          >
            <FiShoppingCart className="" />
            <span className="font-normal text-sm">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

/// OLD Code

// import { FiShoppingCart } from "react-icons/fi";
// import { getImgUrl } from "../../utils/getImgUrl";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/features/cart/cartSlice";

// const BookCard = ({ book }) => {
//   const dispatch = useDispatch();

//   const handleAddToCart = (payload) => {
//     dispatch(addToCart(payload));
//   };

//   return (
//     <div className=" rounded-lg transition-shadow duration-300">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4">
//         <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
//           <Link to={`/books/${book._id}`}>
//             <img
//               src={`${getImgUrl(book.coverImage)}`}
//               alt={book.title}
//               className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
//             />
//           </Link>
//         </div>

//         <div>
//           <a href="/">
//             <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
//               {book.title}
//             </h3>
//           </a>
//           <p className="text-gray-600 mb-4">
//             {book?.description.length > 60
//               ? `${book?.description.slice(0, 60)}...`
//               : book?.description}
//           </p>
//           <p className="font-medium mb-4">
//             ${book.newPrice}{" "}
//             <span className="line-through font-normal ml-2">
//               ${book?.oldPrice}
//             </span>
//           </p>
//           <button
//             onClick={() => handleAddToCart(book)}
//             className="flex items-center bg-primary hover:bg-hoverPrimary p-1 px-2 py-2 sm:px-6 rounded-md gap-3"
//           >
//             <FiShoppingCart className="" />
//             <span className="font-normal text-sm">Add to Cart</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// //btn-primary px-6 space-x-1 flex flex-row items-center

// export default BookCard;

// Updated BookCard Component with Animations

// chat custom
// Updated BookCard Component with Hover Animations
