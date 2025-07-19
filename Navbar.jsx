import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const goToProfile = () => {
    setDropdownOpen(false);
    navigate("/profile");
  };

  const logout = () => {
    setDropdownOpen(false);
    handleLogout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-cyan-600">🍲 Food Recipe Finder</h1>
        </div>

        {/* Right Side: Login or Avatar */}
        <div className="flex justify-end flex-1 relative">
          {!isLoggedIn ? (
            <a
              href="/login"
              className="text-slate-700 hover:text-cyan-600 font-semibold text-lg"
            >
              Login
            </a>
          ) : (
            <div className="relative">
              <button onClick={toggleDropdown} className="focus:outline-none">
                <img
                  src="/avatar.png"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-cyan-500 hover:scale-105 transition-transform"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
                  <button
                    onClick={goToProfile}
                    className="block w-full text-left px-4 py-2 hover:bg-cyan-50 text-slate-800"
                  >
                    Profile
                  </button>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
