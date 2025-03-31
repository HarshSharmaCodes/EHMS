import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import profilePic from "../../../assets/User.jpg";
import UserSidebar from "./UserSidebar";

function UserBookAppointment() {
  const [userData, setuserData] = useState([]);
  const [userName, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [doctor, setDoctor] = useState("");
  const [reason, setReason] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
  const [doctors, setDoctors] = useState([]);

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const [hours, minutes] = selectedTime.split(":").map(Number);

    // Convert selected time into minutes for easy comparison
    const selectedMinutes = hours * 60 + minutes;

    // Allowed range (in minutes)
    const minTime = 11 * 60 + 30; // 11:30 AM
    const maxTime = 17 * 60; // 5:00 PM

    if (selectedMinutes >= minTime && selectedMinutes <= maxTime) {
      setTime(selectedTime);
    } else {
      Swal.fire({
        title: "Invalid Time",
        text: "Appointments can only be booked between 11:30 AM and 5:00 PM.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  const getDay = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchInfo = async (e) => {
      const user = JSON.parse(localStorage.getItem("user"));
      setuserData(user);
      setName(user.userName);
      setMobileNumber(user.phoneNumber);
      setAddress(user.address.street);
      setGender(user.gender);
      setEmail(user.email);
    };

    const fetchDoctors = async (e) => {
      const res = await axios.get("http://localhost:5000/doctor/get-doctors");
      setDoctors(res.data);
    };

    fetchDoctors();
    fetchInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/appointment/add-appointment", {
        patient: userData.userName,
        phone: mobileNumber,
        doctor: doctor,
        appointmentDate: appointmentDate,
        reason: reason,
        email: email,
        time: time,
      })
      .then((res) => {
        Swal.fire({
          title: "Success",
          icon: "success",
          confirmButtonText: "Ok",
          text: "Appointment Request Sent Successfully! We will get back to you soon!",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          confirmButtonText: "Ok",
          text: "Error Sending Appointment Request! Please Try Again!",
        });
      });
  };

  return (
    <section className="bg-slate-300 flex justify-center items-center">
      <div className="h-[80%] w-[80%] bg-white shadow-xl p-2 flex">
        <UserSidebar profilePic={profilePic} userName={userData.userName} />
        <div className=" w-[70%] ms-24 p-4 flex flex-col justify-around ">
          <p className="font-semibold text-3xl">Book Appointment</p>
          <form action="" className="flex flex-col h-[80%] justify-between">
            <div className="w-full flex justify-between">
              <div className="flex flex-col w-[50%] justify-start">
                <p>Name:</p>
                <input
                  value={userData.userName || ""}
                  disabled
                  className="h-10 w-[90%] rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                />
              </div>
              <div className="flex flex-col w-[50%] justify-start">
                <p>Email:</p>
                <input
                  value={userData.email || ""}
                  disabled
                  className="h-10 w-[90%] rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                ></input>
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div className="flex flex-col w-[50%] justify-start">
                <p>Phone Number:</p>
                <input
                  value={userData.phoneNumber || ""}
                  disabled
                  className="h-10 w-[90%] rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                ></input>
              </div>
              <div className="flex flex-col w-[50%] justify-start">
                <p>Appointment Date:</p>
                <input
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="date"
                  min={getDay()}
                  placeholder="Date Of Appointment"
                ></input>
              </div>
            </div>

            <div className="w-full flex justify-between">
              <div className="flex flex-col w-[50%] justify-start">
                <p>Gender:</p>
                <input
                  value={userData.gender || ""}
                  disabled
                  className="h-10 w-[90%] rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                ></input>
              </div>
              <div className="flex flex-col w-[50%] justify-start">
                <p>Choose Your Doctor:</p>
                <select
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  id="doctors"
                  className="flex h-10 w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Choose your Doctor">Choose you Doctor</option>
                  {doctors.map((doctors) => (
                    <option key={doctors._id} value={doctors._id}>
                      {doctors.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div className="flex flex-col w-[50%] justify-start">
                <p>Enter Reason:</p>
                <input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="flex h-10 w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Reason"
                ></input>
              </div>
              <div className="flex flex-col w-[50%] justify-start">
                <p>Enter Appointment Time:</p>
                <input
                  value={time}
                  onChange={handleTimeChange}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="time"
                  placeholder="Time"
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-black w-[95%] text-white p-2 rounded-full"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserBookAppointment;
