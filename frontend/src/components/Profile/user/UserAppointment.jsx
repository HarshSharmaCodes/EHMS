import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import profilePic from "../../../assets/User.jpg";
import UserSidebar from "./UserSidebar";

function UserAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [userData, setUserData] = useState({});

  const colorForStatus = (status) => {
    const normalizedStatus = status.toLowerCase().replace(/\s+/g, "");

    switch (normalizedStatus) {
      case "scheduled":
        return "text-orange-500";
      case "inprogress":
        return "text-blue-500";
      case "completed":
        return "text-green-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  const fetchAppointments = async (email) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/appointment/get-appointments/${email}`
      );
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      Swal.fire({
        title: "Error",
        icon: "error",
        confirmButtonText: "Ok",
        text: "Error Fetching Appointments! Please Try Again!",
      });
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUserData(storedUser);

    if (!storedUser.email) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "User not found! Please log in again.",
        confirmButtonText: "Ok",
      });
      return;
    }

    fetchAppointments(storedUser.email);
  }, []);

  return (
    <section className="bg-slate-300 flex justify-center items-center">
      <div className="h-[80%] w-[80%] bg-white shadow-xl p-2 flex">
        {/* Sidebar */}
        <UserSidebar
          profilePic={profilePic}
          userName={userData?.userName || "Guest"}
        />

        {/* Main Content */}
        <div className="w-[70%] ms-24 p-4 flex flex-col justify-start gap-5">
          <h1 className="text-3xl font-medium">Appointments</h1>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-2">
            {appointments.length > 0 ? (
              appointments.map((appointment) => {
                let formattedDate = "Invalid date";
                if (appointment.appointmentDate) {
                  const parsedDate = new Date(appointment.appointmentDate);
                  if (!isNaN(parsedDate.getTime())) {
                    formattedDate = parsedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }
                }

                const formattedTime = appointment.time || "Time not provided";

                return (
                  <div
                    className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md"
                    key={appointment._id}
                  >
                    <div className="flex justify-between">
                      <p className="text-lg font-medium">
                        Doctor: {appointment.doctor?.name || "Unknown Doctor"}
                      </p>
                      <p className="text-lg font-medium">
                        {formattedDate} at {formattedTime}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-lg">
                        <span className="font-medium">Reason:</span>{" "}
                        <span className="font-normal">
                          {appointment.reason}
                        </span>
                      </p>
                      <div className="text-lg font-medium flex items-center gap-2">
                        <p>Status:</p>
                        <p className={colorForStatus(appointment.status)}>
                          {appointment.status}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-lg text-gray-500">
                No appointments found.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserAppointment;
