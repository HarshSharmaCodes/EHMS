import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import docProfile from "../../../assets/Doctor.png";
import { logout } from "../../../redux/UserSlice.js";

const DoctorSidebar = ({ profilePic, userName }) => {
  const navLinkStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "600" : "400",
      color: isActive ? "white" : "black",
      backgroundColor: isActive ? "black" : "white",
    };
  };

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
      console.error("Logout Failed:", error);
      alert("Failed to log out. Please try again!");
    }
  };

  return (
    <div className="h-full w-[18%] min-w-[200px] flex flex-col justify-between p-2 bg-slate-200">
      <div className="flex flex-col gap-16">
        <div className="w-full flex flex-col items-center gap-3">
          <img
            src={docProfile}
            className="size-24 rounded-full"
            alt="profile"
          />
          <p>{userName || "Doctor"}</p>
        </div>
        <div className="flex flex-col items-start w-full gap-4 ">
          <NavLink
            style={navLinkStyle}
            className={"w-full p-2 h-[40px] flex items-center justify-center"}
            to="/doctor-profile"
          >
            Settings
          </NavLink>
          <NavLink
            style={navLinkStyle}
            className={"w-full p-2 h-[40px] flex items-center justify-center"}
            to="/doctor-appointments"
          >
            Appointments
          </NavLink>
          <NavLink
            style={navLinkStyle}
            className={"w-full p-2 h-[40px] flex items-center justify-center"}
            to="/doctor-review"
          >
            Message
          </NavLink>
        </div>
      </div>
      <div className="w-full text-center h-[80px]  flex items-center justify-center">
        <button
          onClick={handleSignOut}
          className="bg-black text-white rounded-full text-md font-medium p-2 cursor-pointer hover:scale-110 duration-200 active:scale-90 "
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default DoctorSidebar;
