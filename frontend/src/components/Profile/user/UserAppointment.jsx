import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import profilePic from "../../../assets/User.jpg";
import UserSidebar from "./UserSidebar";

function UserAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [userData, setUserData] = useState({});

  const colorForStatus = (status) => {
    switch (status) {
      case "scheduled":
        return "text-orange-300";
      case "inProgress":
        return "text-blue-300";
      case "completed":
        return "text-green-300";
      case "cancelled":
        return "text-red-300";
      default:
        return "text-gray-300";
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
    <section className="flex items-center justify-center bg-slate-300 min-h-screen">
      <div className="flex h-[80vh] w-[80%] bg-white p-2 shadow-xl overflow-hidden">
        {/* Sidebar */}
        <UserSidebar
          profilePic={profilePic}
          userName={userData?.userName || "Guest"}
        />

        {/* Main Content */}
        <div className="flex flex-col gap-4 p-4 w-full overflow-hidden">
          <h1 className="text-3xl font-medium">Appointments</h1>

          <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-2">
            {appointments.length > 0 ? (
              appointments.map((appointment) => {
                const appointmentDate = new Date(appointment.appointmentDate);
                const formattedDate = appointmentDate.toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                );

                const formattedTime = appointment.time
                  ? new Date(
                      0,
                      0,
                      0,
                      ...appointment.time.split(":").map(Number)
                    ).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "Time not provided";

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
