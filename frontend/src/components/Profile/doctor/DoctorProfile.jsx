import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import profilePic from "../../../assets/Doctor.png";
import DoctorSidebar from "./DoctorSidebar";

function DoctorProfile() {
  const [userData, setUserData] = useState({});
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchInfo = async () => {
      const user = localStorage.getItem("user");
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          setUserData(parsedUser);
          setName(parsedUser.name || "");
          setMobileNumber(parsedUser.phoneno || "");
          setDateOfBirth(parsedUser.dob?.split("T")[0] || "");
          setGender(parsedUser.gender || "");
          setEmail(parsedUser.email || "");
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("user");
        }
      }
    };

    fetchInfo();
  }, []);

  const validateInputs = () => {
    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(mobileNumber)) {
      Swal.fire(
        "Invalid Phone Number",
        "Enter a 10-digit phone number.",
        "error"
      );
      return false;
    }

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    if (birthDate > today) {
      Swal.fire(
        "Invalid DOB",
        "Date of birth cannot be in the future.",
        "error"
      );
      return false;
    }

    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 15) {
      Swal.fire("Invalid DOB", "Age must be at least 15 years old.", "error");
      return false;
    }
    return true;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    if (!userData._id) {
      Swal.fire("Error", "User ID is missing. Please log in again.", "error");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:5000/doctor/profile-update",
        {
          userId: userData._id,
          updatedProfile: {
            email,
            name,
            phoneno: mobileNumber,
            gender,
            dob: dateOfBirth,
          },
        }
      );

      if (res.data.status === "Success") {
        Swal.fire({
          title: "Success",
          icon: "success",
          confirmButtonText: "Ok",
          text: "Profile Updated Successfully!",
          allowOutsideClick: false,
        }).then(() => {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setUserData(res.data.user);
          setName(res.data.user.name);
          setMobileNumber(res.data.user.phoneno);
          setDateOfBirth(res.data.user.dob?.split("T")[0] || "");
          setGender(res.data.user.gender);
          setEmail(res.data.user.email);
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
        <DoctorSidebar userName={userData.name} profilePic={profilePic} />
        <div className="w-[70%] ms-24 p-4 flex flex-col justify-around lg:w-[80%] sm:w-full sm:ms-0">
          <p className="font-semibold text-3xl">Account Settings</p>
          <form
            onSubmit={handleUpdate}
            className="flex flex-col h-[80%] justify-between"
          >
            <div className="w-full flex justify-between">
              <div className="flex flex-col w-[50%]">
                <p>Name:</p>
                <input
                  value={name}
                  disabled
                  className="h-10 w-[90%] rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                />
              </div>
              <div className="flex flex-col w-[50%]">
                <p>Email:</p>
                <input
                  value={email}
                  disabled
                  className="h-10 w-[90%] rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                />
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div className="flex flex-col w-[50%]">
                <p>Enter Your Phone:</p>
                <input
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="h-10 w-[90%] rounded-md border px-3 py-2"
                  type="text"
                  placeholder="Phone"
                />
              </div>
              <div className="flex flex-col w-[50%]">
                <p>Enter Your DOB:</p>
                <input
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="h-10 w-[90%] rounded-md border px-3 py-2"
                  type="date"
                />
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div className="flex flex-col w-[50%]">
                <p>Select Your Gender:</p>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="h-10 w-[90%] rounded-md border px-3 py-2"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
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

export default DoctorProfile;
