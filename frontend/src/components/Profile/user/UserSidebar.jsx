import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../../redux/UserSlice.js";

const UserSidebar = ({ profilePic, userName }) => {
  const navLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? "600" : "400",
    color: isActive ? "white" : "black",
    backgroundColor: isActive ? "black" : "white",
  });

  const dispatch = useDispatch();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5000/auth/logout");
      if (res.data.message === "User Logged Out") {
        localStorage.removeItem("user");
        dispatch(logout());
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="bg-slate-200 h-full w-[18%] flex flex-col justify-between p-4">
      <div className="flex flex-col gap-8">
        {/* Profile Section */}
        <div className="w-full flex flex-col items-center">
          <img
            src={profilePic}
            className="size-24 rounded-full"
            alt="profile"
          />
          <p className="font-medium text-lg mt-2">{userName}</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col w-full gap-4">
          {[
            { path: "/user-profile", label: "Settings" },
            { path: "/user-appointments", label: "History" },
            { path: "/user-book-appointment", label: "Book Appointment" },
            { path: "/user-medication", label: "Medication" },
          ].map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              style={navLinkStyle}
              className="w-full p-2 h-[40px] text-center rounded-md transition-all duration-200 hover:scale-105"
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="w-full text-center h-[80px] p-2">
        <button
          onClick={handleSignOut}
          className="w-full bg-black text-white rounded-full text-md font-medium p-2 cursor-pointer hover:scale-110 duration-200 active:scale-90"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
