import { Link, useNavigate } from "react-router-dom";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser, HiOutlineHeart } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";

import avatar from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  const handleSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/?search=${encodeURIComponent(query)}#top-sellers` : "/#top-sellers");
  };

  return (
    <header className="w-full px-4 md:px-10 lg:px-36 py-3 fixed top-0 left-0 right-0 bg-white z-10">
      <nav className="flex justify-between items-center">
        {/* Left Side */}
        <div className="flex items-center gap-4 md:gap-16">
          <Link to="/">
            <HiBars3CenterLeft className="text-2xl" />
          </Link>
          <form className="relative w-40 sm:w-72" onSubmit={handleSearch}>
            <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search here"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="bg-[#EAEAEA] w-full py-2 px-10 rounded-full focus:outline-none focus:w-56 md:focus:w-96 transition-all duration-500 ease-in-out"
            />
          </form>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* User Icon or Avatar */}
          <div className="relative">
            {currentUser ? (
              <>
                <button
                  className="items-center flex"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <img
                    src={avatar}
                    alt="user-avatar"
                    className="w-7 h-7 rounded-full ring-1 ring-blue-500"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li onClick={() => setIsDropdownOpen(false)}>
                        <button
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="text-2xl" />
              </Link>
            )}
          </div>

          {/* Heart Icon */}
          <button className="hidden sm:flex items-center justify-center">
            <HiOutlineHeart className="text-3xl text-[#fb8510]" />
          </button>

          {/* Cart Icon */}
          <Link
            to="/cart"
            // className="flex items-center bg-primary hover:bg-hoverPrimary py-1 px-3 rounded-md"
            className="flex items-center text-[#fb8510] rounded-md relative"
          >
            <FiShoppingCart className="text-2xl" />
            <span
              // className="text-md font-semibold ml-2"
              className="absolute bottom-4 right-1 text-sm"
            >
              {cartItems.length || 0}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

// import { Link } from "react-router-dom";
// import { HiBars3CenterLeft } from "react-icons/hi2";
// import { IoSearchOutline } from "react-icons/io5";
// import { HiOutlineUser } from "react-icons/hi";
// import { HiOutlineHeart } from "react-icons/hi";
// import { FiShoppingCart } from "react-icons/fi";

// import avatar from "../assets/avatar.png";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useAuth } from "../../context/AuthContext";

// const navigation = [
//   { name: "Dashboard", href: "/dashboard" },
//   { name: "Orders", href: "/orders" },
//   { name: "Cart Page", href: "/cart" },
//   { name: "Check Out", href: "/checkout" },
// ];

// const Navbar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const cartItems = useSelector((state) => state.cart.cartItems);
//   // console.log(cartItems);
//   const { currentUser, logout } = useAuth();

//   //
//   const handleLogout = () => {
//     logout();
//   };
//   return (
//     // <header className="max-w-screen-xl mx-auto px-4 py-4 fixed top-0 left-0 right-0 bg-white z-10">
//     <>
//       <header className="w-full px-4 md:px-10 lg:px-36 py-4 fixed top-0 left-0 right-0 bg-white z-10">
//         <nav className="flex justify-between items-cente">
//           {/* left side nav */}
//           <div className="flex items-center gap-4 md:gap-16">
//             <Link to="/">
//               <HiBars3CenterLeft className="size-7" />
//             </Link>
//             <div className="relative w-40 sm:w-72 space-x-1">
//               <IoSearchOutline className="absolute inline-block left-4 inset-y-2" />
//               <input
//                 type="text"
//                 placeholder="Search here"
//                 className="bg-[#EAEAEA] w-full py-1 px-7 md:px-8 rounded-full focus:outline-none focus:w-56 md:focus:w-96 transition-all duration-500 ease-in-out"
//               />
//             </div>
//           </div>

//           {/* right side nav */}
//           <div className="relative flex items-center gap-2">
//             <div className="mt-2">
//               {currentUser ? (
//                 <>
//                   <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
//                     <img
//                       src={avatar}
//                       alt="user-image"
//                       className={`size-6 rounded-full ${
//                         currentUser ? "ring-2 ring-blue-500" : ""
//                       }`}
//                     />
//                   </button>
//                   {/* Show Dropdowns */}
//                   {isDropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
//                       <ul className="py-2">
//                         {navigation.map((item) => (
//                           <li
//                             key={item.name}
//                             onClick={() => setIsDropdownOpen(false)}
//                           >
//                             <Link
//                               to={item.href}
//                               className="block px-4 py-2 text-sm hover:bg-gray-100 border-b-2 border-b-gray-100 "
//                             >
//                               {item.name}
//                             </Link>
//                           </li>
//                         ))}
//                         <li>
//                           <button
//                             className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100 border-b-2 border-b-gray-100 "
//                             onClick={handleLogout}
//                           >
//                             Logout
//                           </button>
//                         </li>
//                       </ul>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <Link to="/login" className="">
//                   <HiOutlineUser className="size-6" />
//                 </Link>
//               )}
//             </div>
//             <button className="hidden sm:block">
//               <HiOutlineHeart className="size-6" />
//             </button>
//             <Link
//               to="/cart"
//               className="flex items-center bg-primary hover:bg-hoverPrimary p-1 px-2 sm:px-6 rounded-md"
//             >
//               <FiShoppingCart className="size-5" />
//               {cartItems.length > 0 ? (
//                 <span className="text-md font-semibold sm:ml-1">
//                   {cartItems.length}
//                 </span>
//               ) : (
//                 <span className="text-md font-semibold sm:ml-1">0</span>
//               )}
//             </Link>
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// };

// export default Navbar;
