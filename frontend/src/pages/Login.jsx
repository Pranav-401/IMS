import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// --- Inline SVG Icons (Replaces react-icons/fi) ---

const IconLayers = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);
const IconUser = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
const IconLock = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);
const IconLogIn = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
    <polyline points="10 17 15 12 10 7"></polyline>
    <line x1="15" y1="12" x2="3" y2="12"></line>
  </svg>
);
const IconArrowRight = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);
const IconKey = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 2l-2 2m-2 2l-1 1M18 13v3a3 3 0 0 1-6 0v-3a3 3 0 0 1 6 0z"></path>
    <path d="M10 13l-4 4"></path>
    <path d="M4 19l4-4"></path>
  </svg>
);
const IconAlertTriangle = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);
const IconCheckCircle = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);
// ---------------------------------------------------

// Set the base URL for the backend API
// FIX: Changed port from 3000 to 5001 to match the running backend server.
const API_BASE_URL = "http://localhost:5001/api";

const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Component to display messages (replaces native alert())
  const MessageBox = ({ type, message }) => {
    if (!message) return null;

    const isSuccess = type === "success";
    // Used SVG components here
    const icon = isSuccess ? (
      <IconCheckCircle className="w-5 h-5 mr-2" />
    ) : (
      <IconAlertTriangle className="w-5 h-5 mr-2" />
    );
    const colorClass = isSuccess
      ? "bg-green-100 border-green-400 text-green-700"
      : "bg-red-100 border-red-400 text-red-700";

    return (
      <div
        className={`flex items-center p-3 mb-4 rounded-xl border-l-4 ${colorClass} transition-all duration-300`}
      >
        {icon}
        <p className="text-sm font-medium">{message}</p>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        loginId,
        password,
      });

      // Handle successful login
      console.log("Login Successful:", response.data);
      setSuccess("Sign In Successful! Redirecting...");

      // Navigate to the dashboard or home page upon success after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      // Handle login failure
      const errorMessage =
        err.response?.data?.message ||
        "Login failed. Check your ID and password.";

      console.error("Login Error:", err.response || err);
      setError(errorMessage);
    } finally {
      if (!success) {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-gray-100">
        {/* Logo at Center Top */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-col items-center">
            <IconLayers className="w-12 h-12 text-green-600 mb-2" />
            <h1 className="text-3xl font-extrabold text-gray-900">
              Stock<span className="text-green-600">Master</span>
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <MessageBox type="success" message={success} />
          <MessageBox type="error" message={error} />

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
                <IconUser className="h-5 w-5 text-gray-400" />
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
                <IconLock className="h-5 w-5 text-gray-400" />
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

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white transition duration-300 transform hover:scale-[1.01]
              ${
                isLoading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              }
            `}
          >
            <IconLogIn className="w-5 h-5 mr-2" />
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Forgot Password and Sign Up Links */}
        <div className="mt-6 flex justify-between items-center text-sm">
          <Link
            to="/forgot-password"
            className="font-medium text-green-600 hover:text-green-700 flex items-center"
          >
            <IconKey className="mr-1 w-4 h-4" />
            Forgot Password?
          </Link>
          <Link
            to="/register"
            className="font-medium text-gray-600 hover:text-green-600 flex items-center"
          >
            New User? Sign Up
            <IconArrowRight className="ml-1 w-4 h-4" />
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
