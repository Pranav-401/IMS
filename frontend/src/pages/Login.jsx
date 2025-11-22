// Login.jsx
import React, { useState } from "react";
import {
  FiLayers,
  FiUser,
  FiLock,
  FiLogIn,
  FiArrowRight,
  FiKey,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle login errors
  const navigate = useNavigate(); // Hook for programmatically navigating

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // API call to the backend login endpoint
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loginId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        console.log("Login Successful:", data.data);
        alert("Login Successful! Welcome.");
        // Example: Redirect to a dashboard page
        navigate("/dashboard");
      } else {
        // Unsuccessful login (e.g., 401 Unauthorized, 404 Not Found)
        setError(
          data.message || "Login failed. Please check your credentials."
        );
        console.error("Login Error:", data.message);
      }
    } catch (err) {
      // Network or other unexpected error
      setError("An unexpected error occurred. Please try again later.");
      console.error("Fetch Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-gray-100">
        {/* Logo at Center Top */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-col items-center">
            <FiLayers className="w-12 h-12 text-green-600 mb-2" />
            <h1 className="text-3xl font-extrabold text-gray-900">
              Stock<span className="text-green-600">Master</span>
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Login ID Input */}
          <div>
            <label
              htmlFor="loginId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Login ID
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="loginId"
                name="loginId"
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                required
                placeholder="Enter your unique ID"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-150 text-gray-900"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-150 text-gray-900"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500 font-medium text-center">
              {error}
            </p>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 transform hover:scale-[1.01]"
          >
            <FiLogIn className="w-5 h-5 mr-2" />
            Sign In
          </button>
        </form>

        {/* Forgot Password and Sign Up Links */}
        <div className="mt-6 flex justify-between items-center text-sm">
          <Link
            to="/forgot-password"
            className="font-medium text-green-600 hover:text-green-700 flex items-center"
          >
            <FiKey className="mr-1 w-4 h-4" />
            Forgot Password?
          </Link>
          <Link
            to="/register"
            className="font-medium text-gray-600 hover:text-green-600 flex items-center"
          >
            New User? Sign Up
            <FiArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        {/* Back to Home Link */}
        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
