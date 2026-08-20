import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toastAlert";
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
    <div className="flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
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
              className="w-full py-2 px-3 focus:outline-none focus:shadow-md leading-tight shadow appearance-none border rounded  "
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
              className="w-full py-2 px-3 focus:outline-none focus:shadow-md leading-tight shadow appearance-none border rounded  "
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
              className="mb-4 w-full py-2 px-3 focus:outline-none focus:shadow-md leading-tight shadow appearance-none border rounded  "
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
            <button className="bg-blue-500 flex-1 hover:bg-blue-600 focus:outline-none text-white font-bold rounded py-2 px-8">
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
        <p className="mt-3 text-center text-gray-500 text-xsm">
          Adam&apos;s Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
