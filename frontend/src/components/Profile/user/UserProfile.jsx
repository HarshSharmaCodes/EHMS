import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import profilePic from "../../../assets/User.jpg";
import UserSidebar from "./UserSidebar";

function UserProfile() {
  const [userData, setuserData] = useState({});
  const [userName, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [dateOfBirth, setdateofBirth] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchInfo = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      try {
        const user = JSON.parse(storedUser);
        setuserData(user || {});
        setName(user?.userName || "");
        setMobileNumber(user?.phoneNumber || "");
        setAddress(user?.address?.street || "");
        setCity(user?.address?.city || "");
        setState(user?.address?.state || "");
        setdateofBirth(user?.dateOfBirth?.split("T")[0] || "");
        setGender(user?.gender || "");
        setEmail(user?.email || "");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    };
    fetchInfo();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return Swal.fire({
        title: "Invalid Email",
        icon: "error",
        confirmButtonText: "Ok",
        text: "Please enter a valid email address!",
      });
    }

    if (!/^[1-9]\d{9}$/.test(mobileNumber)) {
      return Swal.fire({
        title: "Invalid Phone Number",
        icon: "error",
        confirmButtonText: "Ok",
        text: "Phone number must be exactly 10 digits and cannot start with 0!",
      });
    }

    if (!dateOfBirth) {
      return Swal.fire({
        title: "Invalid Date of Birth",
        icon: "error",
        confirmButtonText: "Ok",
        text: "Please enter a valid date of birth!",
      });
    }

    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
    if (new Date(dateOfBirth) > tenYearsAgo) {
      return Swal.fire({
        title: "Invalid Date of Birth",
        icon: "error",
        confirmButtonText: "Ok",
        text: "You must be at least 10 years old!",
      });
    }

    try {
      const res = await axios.put("http://localhost:5000/user/profile-update", {
        userId: userData._id,
        updatedProfile: {
          email,
          userName,
          phoneNumber: mobileNumber,
          address: { street: address, city, state },
          gender,
          dateOfBirth,
        },
      });
      if (res.data.status === "Success") {
        Swal.fire({
          title: "Success",
          icon: "success",
          confirmButtonText: "Ok",
          text: "Profile Updated Successfully!",
          allowOutsideClick: false,
        }).then(() => {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setuserData(res.data.user);
          window.location.reload();
        });
      }
    } catch (err) {
      console.error("Update Error:", err);
      Swal.fire({
        title: "Error",
        icon: "error",
        confirmButtonText: "Ok",
        text: "Error Updating Profile! Please Try Again!",
      });
    }
  };

  return (
    <section className="bg-slate-300 flex justify-center items-center">
      <div className="h-[80%] w-[80%] bg-white shadow-xl p-2 flex">
        <UserSidebar profilePic={profilePic} userName={userData?.userName} />
        <div className=" w-[70%] ms-24 p-4 flex flex-col justify-around ">
          <p className="font-semibold text-3xl">Account Settings</p>
          <form
            onSubmit={handleUpdate}
            className="flex flex-col h-[80%] justify-between"
          >
            <div className="w-full flex justify-between">
              <div className="flex flex-col w-[50%] justify-start">
                <p>Enter Your Name:</p>
                <input
                  value={userData.userName || ""}
                  disabled
                  className="h-10 w-[90%] rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                />
              </div>
              <div className="flex flex-col w-[50%] justify-start">
                <p>Enter Your Email:</p>
                <input
                  value={userData.email || ""}
                  disabled
                  className="h-10 w-[90%] rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                />
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div className="flex flex-col w-[50%] justify-start">
                <p>Enter Your Phone:</p>
                <input
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="flex h-10 w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Phone"
                />
              </div>
              <div className="flex flex-col w-[50%] justify-start">
                <p>Enter Your DOB:</p>
                <input
                  value={dateOfBirth}
                  onChange={(e) => setdateofBirth(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="date"
                  placeholder="Name"
                />
              </div>
            </div>

            <div className="w-full flex justify-between">
              <div className="flex flex-col w-[50%] justify-start">
                <p>Enter Your Gender:</p>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="flex h-10 w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="flex flex-col w-[50%] justify-start">
                <p>Enter Your City:</p>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="City"
                />
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div className="flex flex-col w-[50%] justify-start">
                <p>Enter Your State:</p>
                <input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="flex h-10 w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="State"
                ></input>
              </div>
              <div className="flex flex-col w-[50%] justify-start">
                <p>Enter Your Address:</p>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Address"
                ></input>
              </div>
            </div>

            <button
              type="submit"
              className="bg-black w-[95%] text-white p-2 rounded-full"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
