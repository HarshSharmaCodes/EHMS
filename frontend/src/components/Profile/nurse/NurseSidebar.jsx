import axios from "axios";
import React from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { logout } from "../../../redux/UserSlice.js";

const NurseSidebar = ({ profilePic, userName }) => {
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
      console.error("Logout failed:", error);
    }
  };

  const navLinkStyle = ({ isActive }) =>
    `w-full p-2 h-[40px] ${isActive ? "font-semibold bg-black text-white" : "font-normal bg-white text-black"}`;

  return (
    <div className='bg-slate-200 h-full max-w-sm flex flex-col justify-between p-2'>
      <div className='flex flex-col gap-16'>
        <div className='w-full flex flex-col items-center gap-3'>
          <img
            src={profilePic || "/default-profile.png"}
            className="size-24 rounded-full"
            alt="profile"
          />
          <p>{userName}</p>
        </div>
        <div className="flex flex-col items-start w-full gap-4">
          <NavLink className={navLinkStyle} to="/nurse-profile">Settings</NavLink>
          <NavLink className={navLinkStyle} to="/nurse-medication">Medication</NavLink>
          <NavLink className={navLinkStyle} to="/nurse-bed">Messages</NavLink>
        </div>
      </div>
      <div className='w-full text-center h-[80px] p-2'>
        <button 
          onClick={handleSignOut} 
          aria-label="Sign out from your account"
          className='bg-black text-white rounded-full text-md font-medium p-2 cursor-pointer hover:scale-110 duration-200 active:scale-90'
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default NurseSidebar;
