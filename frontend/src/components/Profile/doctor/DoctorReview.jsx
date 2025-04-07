import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import profilePic from "../../../assets/Doctor.png";
import DoctorSidebar from "./DoctorSidebar";

function DoctorReview() {
  const [userData, setUserData] = useState({});
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [dosage, setDosage] = useState("");
  const [changePatient, setChangePatient] = useState("");

  useEffect(() => {
    const fetchInfoAndPatients = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setUserData(user);

      if (user && user._id) {
        try {
          const response = await axios.get(
            `http://localhost:5000/appointment/patients/${user._id}`
          );
          setPatients(response.data);
        } catch (error) {
          console.error("Error fetching patients:", error);
        }
      }
    };

    fetchInfoAndPatients();
  }, []);

  const handleAddMedication = async (e) => {
    e.preventDefault();

    if (!changePatient || !name || !dosage || !frequency) {
      Swal.fire({
        title: "Missing Fields",
        icon: "warning",
        confirmButtonText: "Ok",
        text: "Please fill in all fields and select a patient.",
      });
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/user/add-medications/${changePatient}`,
        { name, frequency, dosage }
      );

      Swal.fire({
        title: "Success",
        icon: "success",
        confirmButtonText: "Ok",
        text: "Medication added successfully",
      });

      setName("");
      setDosage("");
      setFrequency("");
      setChangePatient("");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        icon: "error",
        confirmButtonText: "Ok",
        text: "Please Check Your Credentials and Try Again!",
      });
    }
  };

  return (
    <section className="bg-slate-300 flex justify-center items-center">
      <div className="h-[80%] w-[80%] bg-white shadow-xl p-2 flex">
        <DoctorSidebar userName={userData.name} profilePic={profilePic} />
        <div className="w-[70%] ms-24 p-4 flex flex-col justify-start gap-5 bg-gray-50">
          <p className="font-semibold text-3xl">Add Prescription</p>
          <div className="w-full">
            <div className="relative overflow-auto shadow-md sm:rounded-lg bg-gray-50 p-6">
              <form className="flex flex-col gap-6" onSubmit={handleAddMedication}>
                <div>
                  <label className="block mb-1 font-medium">Select Patient:</label>
                  <select
                    value={changePatient}
                    onChange={(e) => setChangePatient(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-400"
                  >
                    <option value="">-- Select --</option>
                    {patients.map((patient, index) => (
                      <option key={index} value={patient.email}>
                        {patient.name} ({patient.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Name Of Medicine:</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Medicine"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Dosage:</label>
                  <input
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    type="text"
                    placeholder="(Ml, Tablets)"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Frequency:</label>
                  <input
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    type="text"
                    placeholder="2 Times a Day..."
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-full transition duration-200"
                >
                  Add Prescription
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorReview;
