import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toastAlert";
import readingImage from "../../assets/books-bg1.jpg";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(false);

  const { loginUser } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm();
  //
  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      showToast("success", "Login successful!");
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <section className="flex min-h-[calc(100vh-150px)] items-center justify-center py-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        <div className="relative hidden min-h-[34rem] overflow-hidden md:block">
          <img src={readingImage} alt="Books on a shelf" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-900/20" />
          <div className="absolute bottom-10 left-10 right-10 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">Your next chapter</p>
            <h2 className="mt-3 text-4xl font-bold leading-tight">Great stories are waiting for you.</h2>
          </div>
        </div>
        <div className="p-8 sm:p-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">Welcome back</p>
        <h2 className="mb-2 text-3xl font-bold text-gray-900">Sign in to your account</h2>
        <p className="mb-8 text-gray-500">Track orders and keep your reading list close.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
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
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Password:
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              className="w-full rounded-lg border px-4 py-3 leading-tight shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
          {errorMessage && (
            <p className="mb-4 text-red-500 text-sm italic">{errorMessage}</p>
          )}
          <div className="mb-4">
            <button className="w-full rounded-lg bg-orange-500 px-8 py-3 font-bold text-white shadow-md transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300">
              Login
            </button>
          </div>
        </form>
        <p>
          Don&apos;t have an account? Please{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            register
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

export default Login;
