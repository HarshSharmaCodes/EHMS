import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import profilePic from "../../../assets/Doctor.png";
import DoctorSidebar from "./DoctorSidebar";

function DoctorAppointmen() {
  const [appointments, setAppointments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser || !currentUser._id) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/appointment/get-appointment/${currentUser._id}`
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/appointment/update-status/${id}`, {
        status: newStatus,
      });

      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt._id === id ? { ...appt, status: newStatus } : appt
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <section className="bg-slate-300 flex justify-center items-center">
      <div className="h-[80%] w-[80%] bg-white shadow-xl p-2 flex">
        <DoctorSidebar
          userName={currentUser?.name || "Doctor"}
          profilePic={profilePic}
        />
        <div className="w-[70%] ms-24 p-4 flex flex-col justify-start gap-5">
          <p className="font-semibold text-3xl">Appointments</p>
          <div className="w-full">
            <div className="relative shadow-md sm:rounded-lg">
              <div className="max-h-[450px] overflow-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 border-b">#</th>
                      <th className="px-6 py-3 border-b">Patient Name</th>
                      <th className="px-6 py-3 border-b">Appointment Date</th>
                      <th className="px-6 py-3 border-b">Appointment Time</th>
                      <th className="px-6 py-3 border-b">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(appointments || []).length > 0 ? (
                      appointments.map((item, index) => (
                        <tr key={item._id} className="text-black border-b">
                          <td className="px-6 py-3">{index + 1}</td>
                          <td className="px-6 py-3">
                            {item.patient || "Unknown"}
                          </td>
                          <td className="px-6 py-3">{item.appointmentDate}</td>
                          <td className="px-6 py-3">{item.time}</td>
                          <td className="px-6 py-3">
                            <select
                              value={item.status}
                              onChange={(e) =>
                                handleStatusChange(item._id, e.target.value)
                              }
                              className="p-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                              <option value="Scheduled">Scheduled</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Cancelled">Cancelled</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="px-6 py-3 text-center" colSpan="5">
                          <p>Sorry, You have No appointments !!</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorAppointmen;
