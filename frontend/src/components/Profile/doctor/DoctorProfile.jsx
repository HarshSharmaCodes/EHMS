import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import profilePic from "../../../assets/Doctor.png";
import DoctorSidebar from "./DoctorSidebar";

function DoctorProfile() {
  const [userData, setuserData] = useState([]);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchInfo = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setuserData(user);
        setName(user.name || "");
        setMobileNumber(user.phoneno || "");
        setAddress(user.address?.street || "");
        setCity(user.address?.city || "");
        setState(user.address?.state || "");
        setDateOfBirth(user.dob?.split("T")[0] || "");
        setGender(user.gender || "");
        setEmail(user.email || "");
      }
    };

    fetchInfo();
  }, []);

  const validateInputs = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!emailPattern.test(email)) {
      Swal.fire(
        "Invalid Email",
        "Please enter a valid email address.",
        "error"
      );
      return false;
    }

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
    try {
      const res = await axios.put(
        "http://localhost:5000/doctor/profile-update",
        {
          userId: userData._id,
          updatedProfile: {
            email,
            name,
            phoneno: mobileNumber,
            address: {
              street: address,
              city,
              state,
            },
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
        <DoctorSidebar userName={userData.name} profilePic={profilePic} />
        <div className="w-[70%] ms-24 p-4 flex flex-col justify-around lg:w-[80%] sm:w-full sm:ms-0">
          <p className="font-semibold text-3xl">Account Settings</p>
          <form
            onSubmit={handleUpdate}
            className="flex flex-col h-[80%] justify-between"
          >
            <div className="w-full flex justify-between">
              <div className="flex flex-col w-[50%]">
                <p>Enter Your Name:</p>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 w-[90%] rounded-md border px-3 py-2"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div className="flex flex-col w-[50%]">
                <p>Enter Your Email:</p>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 w-[90%] rounded-md border px-3 py-2"
                  type="email"
                  placeholder="Email"
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
              <div className="flex flex-col w-[50%]">
                <p>Enter Your City:</p>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-10 w-[90%] rounded-md border px-3 py-2"
                  type="text"
                  placeholder="City"
                />
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div className="flex flex-col w-[50%]">
                <p>Enter Your State:</p>
                <input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="h-10 w-[90%] rounded-md border px-3 py-2"
                  type="text"
                  placeholder="State"
                />
              </div>
              <div className="flex flex-col w-[50%]">
                <p>Enter Your Address:</p>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-10 w-[90%] rounded-md border px-3 py-2"
                  type="text"
                  placeholder="Address"
                />
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
