// Register.jsx - Enhanced and Modern
import React, { useState } from "react";
import axios from "axios"; // 👈 Import Axios
import {
  FiLayers,
  FiUser,
  FiLock,
  FiMail,
  FiArrowLeft,
  FiPlusSquare,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"; // 👈 Import useNavigate

// Set the registration endpoint (Backend Port: 3000, Route: /api/user)
const REGISTER_URL = "http://localhost:5001/api/user";

const Register = () => {
  const [formData, setFormData] = useState({
    loginId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    // 👈 Made function async
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Error: Passwords do not match!");
      return;
    }

    try {
      // 1. Prepare data for the API (must include 'role' as per your controller/model)
      const registrationData = {
        loginId: formData.loginId,
        email: formData.email,
        password: formData.password,
        role: "user", // Hardcoded default role for registration
      };

      // 2. Make the POST request using Axios
      const response = await axios.post(REGISTER_URL, registrationData);

      // 3. Handle success response
      console.log("Registration Successful:", response.data);
      alert(response.data.message || "Account Created Successfully!");

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      // 4. Handle error response
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create account.";

      console.error("Registration Error:", error.response || error);
      alert(`Registration Failed: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl p-10 bg-white rounded-3xl shadow-2xl border border-gray-100 backdrop-blur-sm">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-10">
          <FiLayers className="w-10 h-10 text-green-600 mb-2" />
          <h1 className="text-3xl font-extrabold text-gray-900">
            Secure Your <span className="text-green-600">StockMaster</span>{" "}
            Account
          </h1>
          <p className="text-gray-500 mt-2">
            Start managing your inventory in minutes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Login ID Input */}
            <div>
              <label
                htmlFor="loginId"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Login ID (6-12 Characters)
              </label>
              <div className="relative">
                <input
                  id="loginId"
                  name="loginId"
                  type="text"
                  value={formData.loginId}
                  onChange={handleChange}
                  required
                  placeholder="Choose a unique ID"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-150 text-gray-900 shadow-sm hover:border-green-400"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your professional email"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-150 text-gray-900 shadow-sm hover:border-green-400"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Secure password (>8 chars)"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-150 text-gray-900 shadow-sm hover:border-green-400"
                />
              </div>
            </div>

            {/* Re-enter Password Input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Re-enter password"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-150 text-gray-900 shadow-sm hover:border-green-400"
                />
              </div>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 transform hover:scale-[1.01] mt-8"
          >
            <FiPlusSquare className="w-5 h-5 mr-2" />
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center text-sm">
          <Link
            to="/login"
            className="font-medium text-gray-600 hover:text-green-600 flex items-center justify-center"
          >
            <FiArrowLeft className="mr-1 w-4 h-4" />
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
