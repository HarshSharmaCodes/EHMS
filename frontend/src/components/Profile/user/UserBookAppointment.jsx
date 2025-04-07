import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import profilePic from "../../../assets/User.jpg";
import UserSidebar from "./UserSidebar";

function UserBookAppointment() {
  const [userData, setuserData] = useState({});
  const [userName, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [doctor, setDoctor] = useState("");
  const [reason, setReason] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
  const [availableTimings, setAvailableTimings] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [specialization, setSpecialization] = useState("");
  const [specializations, setSpecializations] = useState([]);

  const getDay = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setuserData(user);
      setName(user.userName);
      setMobileNumber(user.phoneNumber);
      setAddress(user.address?.street || "");
      setGender(user.gender);
      setEmail(user.email);
    };

    const fetchDoctors = async () => {
      const res = await axios.get("http://localhost:5000/doctor/get-doctors");
      setDoctors(res.data);
      const specs = [...new Set(res.data.map((doc) => doc.specialization))];
      setSpecializations(specs);
    };

    fetchUser();
    fetchDoctors();
  }, []);

  const handleDoctorChange = async (doctorId) => {
    setDoctor(doctorId);
    setTime(""); // Reset time
    try {
      const res = await axios.get(`http://localhost:5000/doctor/get-timings/${doctorId}`);
      setAvailableTimings(res.data.timings || []);
    } catch (err) {
      console.error("Failed to fetch timings", err);
      setAvailableTimings([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctor || !appointmentDate || !time || !reason) {
      Swal.fire({
        title: "Missing Fields",
        text: "Please fill all required fields before submitting.",
        icon: "warning",
      });
      return;
    }

    try {
      await axios.post("http://localhost:5000/appointment/add-appointment", {
        patient: userData.userName,
        phone: mobileNumber,
        doctor: doctor,
        appointmentDate: appointmentDate,
        reason: reason,
        email: email,
        time: time,
      });
      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Appointment request sent successfully!",
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Could not send appointment request.",
      });
    }
  };

  const filteredDoctors = doctors.filter(
    (doc) => doc.specialization === specialization
  );

  return (
    <section className="bg-slate-300 flex justify-center items-center">
      <div className="h-[80%] w-[80%] bg-white shadow-xl p-2 flex">
        <UserSidebar profilePic={profilePic} userName={userData.userName} />
        <div className="w-[70%] ms-24 p-4 flex flex-col justify-around">
          <p className="font-semibold text-3xl">Book Appointment</p>
          <form className="flex flex-col h-[80%] justify-between" onSubmit={handleSubmit}>
            <div className="w-full flex justify-between">
              <div className="flex flex-col w-[50%]">
                <p>Appointment Date:</p>
                <input
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="h-10 w-[90%] rounded-md border px-3 py-2 text-sm"
                  type="date"
                  min={getDay()}
                />
              </div>
            </div>

            <div className="w-full flex justify-between">
              <div className="flex flex-col w-[50%]">
                <p>Select Specialization:</p>
                <select
                  value={specialization}
                  onChange={(e) => {
                    setSpecialization(e.target.value);
                    setDoctor("");
                    setAvailableTimings([]);
                  }}
                  className="h-10 w-[90%] rounded-md border px-3 py-2 text-sm"
                >
                  <option value="">Select Specialization</option>
                  {specializations.map((spec, idx) => (
                    <option key={idx} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full flex justify-between">
              <div className="flex flex-col w-[50%]">
                <p>Choose Doctor:</p>
                <select
                  value={doctor}
                  onChange={(e) => handleDoctorChange(e.target.value)}
                  className="h-10 w-[90%] rounded-md border px-3 py-2 text-sm"
                >
                  <option value="">Select Doctor</option>
                  {filteredDoctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full flex justify-between">
              <div className="flex flex-col w-[50%]">
                <p>Reason:</p>
                <input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="h-10 w-[90%] rounded-md border px-3 py-2 text-sm"
                  type="text"
                  placeholder="Reason"
                />
              </div>
              <div className="flex flex-col w-[50%]">
                <p>Appointment Time:</p>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="h-10 w-[90%] rounded-md border px-3 py-2 text-sm"
                >
                  <option value="">Select Time</option>
                  {availableTimings.map((t, idx) => (
                    <option key={idx} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
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
