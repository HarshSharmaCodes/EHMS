import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import profilePic from "../../../assets/doct2.jpg";
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

  return (
    <section className="bg-slate-300 flex justify-center items-center">
      <div className="h-[80%] w-[80%] bg-white shadow-xl p-2 flex">
        <DoctorSidebar userName={currentUser.name} profilePic={profilePic} />
        <div className="w-[70%] ms-24 p-4 flex flex-col justify-start gap-5">
          <p className="font-semibold text-3xl">Appointments</p>
          <div className="w-full">
            <div className="relative shadow-md sm:rounded-lg">
              <div className="max-h-[450px] overflow-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  {/* Table Header (Fixed) */}
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                    <tr>
                      <th scope="col" className="px-6 py-3">#</th>
                      <th scope="col" className="px-6 py-3">Patient Name</th>
                      <th scope="col" className="px-6 py-3">Appointment Date</th>
                      <th scope="col" className="px-6 py-3">Appointment Time</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                    </tr>
                  </thead>

                  {/* Scrollable Table Body */}
                  <tbody>
                    {(appointments || []).length > 0 ? (
                      appointments.map((item, index) => (
                        <tr key={item._id} className="text-black border-b">
                          <td className="px-6 py-3">{index + 1}</td>
                          <td className="px-6 py-3">{item.patient || "Unknown"}</td>
                          <td className="px-6 py-3">{item.appointmentDate}</td>
                          <td className="px-6 py-3">{item.time}</td>
                          <td className="px-6 py-3">{item.status}</td>
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
