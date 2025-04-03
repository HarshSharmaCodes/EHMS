import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminSidebar from "./AdminSidebar";

function AdminNurse() {
  const [nurses, setNurses] = useState([]);
  const [nurname, setNurName] = useState("");
  const [nurdept, setNurDept] = useState("");
  const [nuremail, setNurEmail] = useState("");
  const [departments, setDepartments] = useState([]);
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/get-department"
        );
        setDepartments(response.data);
      } catch (error) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error Fetching Data!",
        });
      }
    };

    fetchData();
  }, []);

  const getNurses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/nurse/get-nurses");
      setNurses(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  useEffect(() => {
    getNurses();
  }, []);

  const handleAddNurse = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/nurse/add-nurse", {
        name: nurname,
        email: nuremail,
        department: nurdept,
      });

      if (res.data.message === "Success") {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Nurse Added Successfully!",
        });
        setIsCreate(false);
        getNurses();
      }
    } catch (e) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Error Adding Nurse!",
      });
    }
  };

  const deleteNurse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/nurse/delete-nurse/${id}`);
      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Nurse Deleted Successfully!",
      });
      getNurses();
    } catch (err) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Error Deleting Nurse!",
      });
    }
  };

  return (
    <section className="bg-slate-300 flex justify-center items-center">
      <div className="h-[80%] w-[80%] bg-white shadow-xl p-2 flex">
        <AdminSidebar userName={"Admin"} />
        <div className="w-[70%] ms-24 p-4 flex flex-col justify-start gap-5">
          <p className="font-semibold text-3xl">Nurses</p>
          <div className="w-full">
            <div className="relative overflow-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 border-b">#</th>
                    <th className="px-6 py-3 border-b">Nurse Name</th>
                    <th className="px-6 py-3 border-b">Ward</th>
                    <th className="px-6 py-3 border-b">Department</th>
                    <th className="px-6 py-3 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {nurses.map((item, index) => (
                    <tr key={item._id} className="text-black border-b">
                      <td className="px-6 py-3">{index + 1}</td>
                      <td className="px-6 py-3">{item.name}</td>
                      <td className="px-6 py-3">{item.ward}</td>
                      <td className="px-6 py-3">{item.department.name}</td>
                      <td className="flex gap-3 py-3">
                        <button
                          onClick={() => deleteNurse(item._id)}
                          className="bg-black text-white px-4 py-1 rounded hover:bg-red-700 transition duration-200"
                        >
                          Remove
                        </button>
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

        {/* Nurse Registration Form */}
        {isCreate && (
          <div className="absolute h-[78%] w-[79%] z-50 bg-white flex justify-center items-center">
            <form className="flex flex-col w-[50%] gap-4">
              <div className="flex flex-col">
                <label>Enter Nurse Name:</label>
                <input
                  value={nurname}
                  onChange={(e) => setNurName(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded focus:ring-1 focus:ring-gray-400"
                  type="text"
                  placeholder="Nurse Name"
                />
              </div>
              <div className="flex flex-col">
                <label>Enter Nurse Email:</label>
                <input
                  value={nuremail}
                  onChange={(e) => setNurEmail(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded focus:ring-1 focus:ring-gray-400"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="flex flex-col">
                <label>Enter Nurse Department:</label>
                <select
                  value={nurdept}
                  onChange={(e) => setNurDept(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded focus:ring-1 focus:ring-gray-400"
                >
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department._id} value={department._id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAddNurse}
                className="w-full bg-black text-white rounded-full text-md font-medium p-2 hover:scale-110 duration-200 active:scale-90"
              >
                Add Nurse
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

export default AdminNurse;