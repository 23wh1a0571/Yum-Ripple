// File: src/pages/Logout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear login state
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-orange-50 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-orange-600 mb-4">
          👋 You’ve been logged out
        </h2>
        <p className="text-gray-600 mb-6">Redirecting to the login page...</p>
        <a
          href="/login"
          className="inline-block bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
};

export default Logout;