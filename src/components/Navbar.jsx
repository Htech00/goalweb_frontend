import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Frame 1.png";
import profile from "../assets/Ellipse 2.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-black/20 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-8 sm:h-10 w-auto" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-10">
          <Link
            to="/ongoing"
            className="text-black text-[16px] lg:text-[18px] font-semibold font-montserrat hover:text-gray-700 transition"
          >
            Ongoing
          </Link>
          <Link
            to="/complete"
            className="text-black text-[16px] lg:text-[18px] font-semibold font-montserrat hover:text-gray-700 transition"
          >
            Completed
          </Link>
          <Link
            to="/allgoals"
            className="text-black text-[16px] lg:text-[18px] font-semibold font-montserrat hover:text-gray-700 transition"
          >
            All Goals
          </Link>
        </div>

        {/* Profile and Menu Icon */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <img src={profile} alt="Profile" className="h-8 w-8 rounded-full" />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              className="h-6 w-6 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-60 py-2" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-start space-y-3 px-6">
          <Link
            to="/ongoing"
            className="text-black text-base font-semibold font-montserrat hover:text-gray-700 transition"
            onClick={() => setMenuOpen(false)}
          >
            Ongoing
          </Link>
          <Link
            to="/complete"
            className="text-black text-base font-semibold font-montserrat hover:text-gray-700 transition"
            onClick={() => setMenuOpen(false)}
          >
            Completed
          </Link>
          <Link
            to="/allgoals"
            className="text-black text-base font-semibold font-montserrat hover:text-gray-700 transition"
            onClick={() => setMenuOpen(false)}
          >
            All Goals
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
