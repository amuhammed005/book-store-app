import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toastAlert";
import axios from "axios";
import getBaseURL from "../utils/baseURL.js";

const AdminLogin = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${getBaseURL()}/api/auth/admin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const auth = response.data;
      if (auth.token) {
        localStorage.setItem("token", auth.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          alert("Token has been expired. Please login in again");
          navigate("/");
        }, 24 * 60 * 60 * 1000);
      }
      showToast("success", "Admin login successful!");
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Username:{" "}
            </label>
            <input
              {...register("username", { required: true })}
              type="text"
              placeholder="username"
              name="username"
              id="username"
              className="w-full py-2 px-3 focus:outline-none focus:shadow-md leading-tight shadow appearance-none border rounded  "
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
              className="w-full py-2 px-3 focus:outline-none focus:shadow-md leading-tight shadow appearance-none border rounded  "
            />
          </div>
          {errorMessage && (
            <p className="mb-4 text-red-500 text-sm italic">{errorMessage}</p>
          )}
          <div className="mb-4">
            <button className="bg-blue-500 w-full flex-1 hover:bg-blue-600 focus:outline-none text-white font-bold rounded py-2 px-8">
              Login
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-gray-500 text-xsm">
          Adam&apos;s Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
