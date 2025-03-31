import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? "600" : "400",
    color: isActive ? "#000" : "#555",
  });

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/sign-in");
  };

  const [isMobNav, setIsMobNav] = useState(false);
  const handleNav = () => {
    setIsMobNav(!isMobNav);
  };

  return (
    <div className="bg-[#d1ffe9] h-[80px] w-full fixed z-20 px-4 md:px-10 lg:px-20">
      <div className="flex flex-wrap items-center justify-between h-full">
        <div className="flex items-center space-x-3">
          <NavLink to="/" className="flex items-center space-x-3">
            <img src="LogoK.png" alt="logo" className="h-10 w-10" />
            <div className="text-3xl font-semibold text-center">
              E HEALTH MONITORING
            </div>
          </NavLink>
        </div>

        <div className="justify-center items-center gap-4 md:gap-6 text-lg md:text-xl hidden md:flex">
          <NavLink style={navLinkStyle} to="/">
            Home
          </NavLink>
          {/* <NavLink style={navLinkStyle} to="/appointment">
            Appointment
          </NavLink> */}
          <NavLink style={navLinkStyle} to="/about-us">
            About Us
          </NavLink>
          <button
            className="bg-slate-900 text-white p-2 rounded-full hover:scale-110 hover:bg-slate-800 duration-300 active:scale-90"
            onClick={handleClick}
          >
            LogIn
          </button>
        </div>

        {/* Mobile Menu Icon Toggle */}
        <svg
          className="size-10 md:hidden cursor-pointer z-50 p-2"
          onClick={handleNav}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {isMobNav ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" />
          )}
        </svg>
        {isMobNav && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={handleNav}
          ></div>
        )}

        {/* Mobile Navigation Menu */}
        <div
          className={
            isMobNav
              ? "flex flex-col absolute top-0 left-0 min-h-screen w-[80%] text-white text-xl sm:text-2xl justify-center items-center bg-black md:hidden"
              : "hidden"
          }
        >
          <NavLink
            className="py-6 text-2xl"
            style={navLinkStyle}
            to="/"
            onClick={handleNav}
          >
            Home
          </NavLink>
          {/* <NavLink
            className="py-6 text-2xl"
            style={navLinkStyle}
            to="/appointment"
            onClick={handleNav}
          >
            Appointment
          </NavLink> */}
          <NavLink
            className="py-6 text-2xl"
            style={navLinkStyle}
            to="/about-us"
            onClick={handleNav}
          >
            About Us
          </NavLink>
          <NavLink
            className="py-6 text-2xl"
            style={navLinkStyle}
            to="/contact-us"
            onClick={handleNav}
          >
            Contact Us
          </NavLink>
          <NavLink
            className="py-6 text-2xl"
            style={navLinkStyle}
            to="/sign-in"
            onClick={handleNav}
          >
            SignIn
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
