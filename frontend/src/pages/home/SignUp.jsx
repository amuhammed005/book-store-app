import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toastAlert";
import readingImage from "../../assets/books-bg3.jpg";
const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { registerUser } = useAuth();
  //
  const navigate = useNavigate();
  //
  const {
    register,
    handleSubmit,
  } = useForm();
  // On submit Register User
  const onSubmit = async (data) => {
    try {
      await registerUser(data.username, data.email, data.password);
      showToast("success", "Sign up successful!");
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-150px)] items-center justify-center py-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        <div className="relative hidden min-h-[34rem] overflow-hidden md:block md:order-2">
          <img src={readingImage} alt="A collection of books" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-900/20" />
          <div className="absolute bottom-10 left-10 right-10 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">Start reading</p>
            <h2 className="mt-3 text-4xl font-bold leading-tight">Build a library you will love.</h2>
          </div>
        </div>
        <div className="p-8 sm:p-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">Join the community</p>
        <h2 className="mb-2 text-3xl font-bold text-gray-900">Create your account</h2>
        <p className="mb-8 text-gray-500">Save favourites and make checkout easier.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Full name:{" "}
            </label>
            <input
              {...register("username")}
              type="text"
              placeholder="Your name (optional)"
              name="username"
              id="username"
              className="w-full rounded-lg border px-4 py-3 leading-tight shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Email:{" "}
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email address"
              name="email"
              id="email"
              className="w-full rounded-lg border px-4 py-3 leading-tight shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Password:
            </label>
            <input
              {...register("password", { required: true, minLength: 8 })}
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              className="mb-4 w-full rounded-lg border px-4 py-3 leading-tight shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
          {/* <div className="mb-5">
            <label
              htmlFor="password2"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Confirm password:
            </label>
            <input
              {...register("password2", { required: true })}
              type="password"
              placeholder="Confirm password"
              name="password2"
              id="password2"
              className="w-full py-2 px-3 focus:outline-none focus:shadow-md leading-tight shadow appearance-none border rounded  "
            />
          </div> */}
          {errorMessage && (
            <p className="mb-3 text-red-500 text-sm italic">{errorMessage}</p>
          )}
          <div className="mb-3">
            <button className="w-full rounded-lg bg-orange-500 px-8 py-3 font-bold text-white shadow-md transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300">
              Sign Up
            </button>
          </div>
        </form>
        <p>
          Already have an account? Please{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            login
          </Link>
        </p>
        <p className="mt-8 text-center text-xs text-gray-500">
          Adam&apos;s Book Store. All rights reserved.
        </p>
      </div>
      </div>
    </section>
  );
};

export default SignUp;
