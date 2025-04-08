import axios from "axios";
import React, { useEffect, useState } from "react";
import profilePic from "../../../assets/User.jpg";
import UserSidebar from "./UserSidebar";

function UserMedication() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/get-medications/${userData.email}`
        );

        const data = response.data;
        const medicationsArray = data.map(({ medications }) => medications);
        const detailsArray = medicationsArray.map((medications) =>
          medications.map(({ name, dosage, frequency }) => ({
            name,
            dosage,
            frequency,
          }))
        );
        setMedicines(detailsArray.flat());
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-slate-300 flex justify-center items-center ">
      <div className="h-[80%] w-[80%] bg-white shadow-xl p-2 flex">
        <UserSidebar profilePic={profilePic} userName={userData.userName} />
        <div className="w-[70%] ms-24 p-4 flex flex-col justify-start gap-5">
          <p className="font-semibold text-3xl">Medications</p>
          <div className="w-full">
            {medicines.length === 0 ? (
              <p>Medications are not prescribed</p>
            ) : (
              <div className="relative max-h-[400px] overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 border-b">#</th>
                      <th className="px-6 py-3 border-b">Medicine Name</th>
                      <th className="px-6 py-3 border-b">Dosage</th>
                      <th className="px-6 py-3 border-b">Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.map((med, index) => (
                      <tr key={index} className="text-black border-b">
                        <td className="px-6 py-3">{index + 1}</td>
                        <td className="px-6 py-3">{med.name}</td>
                        <td className="px-6 py-3">{med.dosage}</td>
                        <td className="px-6 py-3">{med.frequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserMedication;
