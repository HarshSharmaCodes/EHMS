import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../Shared/Loader";
import AdminSidebar from "./AdminSidebar";

function AdminDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [docname, setDocName] = useState("");
  const [docspec, setDocSpecialization] = useState("");
  const [docemail, setDocEmail] = useState("");
  const [isCreate, setIsCreate] = useState(false);

  // Fetch doctors data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/doctor/get-doctors"
      );
      setDoctors(response.data);
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Error Fetching Data!",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (doctors.length === 0) {
    return <Loader />;
  }

  // Add a new doctor
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/doctor/add-doctor", {
        name: docname,
        specialization: docspec,
        email: docemail,
      });

      if (res.data.message === "Success") {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Doctor Added Successfully!",
        });
        setDocName("");
        setDocSpecialization("");
        setDocEmail("");
        setIsCreate(false);
        fetchData();
      }
    } catch (e) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Error Adding Doctor!",
      });
    }
  };

  const editDoctor = async (id, updatedData) => {
    try {
      await axios.put(
        `http://localhost:5000/doctor/update-doctor/${id}`,
        updatedData
      );
      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Doctor Updated Successfully!",
      });
      fetchData();
    } catch (err) {
      Swal.fire({
        title: "Error",
        icon: "warning",
        text: "Could not update Doctor!",
      });
    }
  };

  // Delete doctor
  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/doctor/delete-doctor/${id}`);
      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Doctor Deleted Successfully!",
      });
      fetchData();
    } catch (err) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Error Deleting Doctor!",
      });
    }
  };

  return (
    <section className="bg-slate-300 flex justify-center items-center">
      <div className="h-[80%] w-[80%] bg-white shadow-xl p-2 flex">
        <AdminSidebar userName={"Admin"} />
        <div className="w-[70%] ms-24 p-4 flex flex-col justify-start gap-5">
          <p className="font-semibold text-3xl">Doctors</p>
          <div className="w-full">
            <div className="relative overflow-auto shadow-md sm:rounded-lg">
              {/* Table Styling */}
              <table className="w-full text-sm text-left text-gray-500 border-collapse">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 border-b">#</th>
                    <th className="px-6 py-3 border-b">Doctor Name</th>
                    <th className="px-6 py-3 border-b">Doctor Email</th>
                    <th className="px-6 py-3 border-b">Department</th>
                    <th className="px-6 py-3 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((item, index) => (
                    <tr key={item._id} className="text-black border-b">
                      <td className="px-6 py-3">{index + 1}</td>
                      <td className="px-6 py-3">{item.name}</td>
                      <td className="px-6 py-3">{item.email}</td>
                      <td className="px-6 py-3">{item.specialization}</td>
                      <td className="flex gap-3 py-3">
                        <button
                          onClick={() => deleteDoctor(item._id)}
                          className="bg-black text-white px-4 py-1 rounded hover:bg-red-700 transition duration-200"
                        > Remove </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button
            onClick={() => setIsCreate(true)}
            className="bg-slate-900 p-2 w-[10%] rounded-full hover:scale-110 active:scale-90 transition duration-200 text-white"
          >
            Create
          </button>
        </div>

        {/* Doctor Registration Form */}
        {isCreate && (
          <div className="absolute h-[78%] w-[79%] z-50 bg-white flex justify-center items-center">
            <form className="flex flex-col w-[50%] gap-4">
              <div className="flex flex-col">
                <label>Enter Doctor's Name:</label>
                <input
                  value={docname}
                  onChange={(e) => setDocName(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded focus:ring-1 focus:ring-gray-400"
                  type="text"
                  placeholder="Doctor Name"
                />
              </div>
              <div className="flex flex-col">
                <label>Enter Doctor's Email:</label>
                <input
                  value={docemail}
                  onChange={(e) => setDocEmail(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded focus:ring-1 focus:ring-gray-400"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="flex flex-col">
                <label>Enter Doctor's Specialization:</label>
                <input
                  value={docspec}
                  onChange={(e) => setDocSpecialization(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded focus:ring-1 focus:ring-gray-400"
                  type="text"
                  placeholder="Specialization"
                />
              </div>
              <button
                onClick={handleAddDoctor}
                className="w-full bg-black text-white rounded-full text-md font-medium p-2 hover:scale-110 duration-200 active:scale-90"
              >
                Add Doctor
              </button>
              <button
                onClick={() => setIsCreate(false)}
                className="w-full bg-gray-500 text-white rounded-full text-md font-medium p-2 hover:scale-105 duration-200 active:scale-90"
              >
                {"<- Go back"}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminDoctor;
