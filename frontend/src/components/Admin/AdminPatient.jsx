import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminSidebar from "./AdminSidebar";

function AdminPatient() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/get-users");
        setUsers(response.data);
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

  const handleDeletePatient = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/admin/delete-user/${id}`);
          setUsers(users.filter((user) => user._id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "Patient has been deleted.",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Error deleting patient!",
          });
        }
      }
    });
  };

  return (
    <section className="bg-slate-300 flex justify-center items-center">
      <div className="h-[80%] w-[80%] bg-white shadow-xl p-2 flex">
        <AdminSidebar userName={"Admin"} />
        <div className="w-[70%] ms-24 p-4 flex flex-col justify-start gap-5">
          <p className="font-semibold text-3xl">Patients</p>
          <div className="w-full">
            <div className="relative overflow-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 border-b">#</th>
                    <th className="px-6 py-3 border-b">Patient Name</th>
                    <th className="px-6 py-3 border-b">Patient Email</th>
                    <th className="px-6 py-3 border-b">Role</th>
                    <th className="px-6 py-3 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((item, index) => (
                      <tr key={item._id} className="text-black border-b">
                        <td className="px-6 py-3">{index + 1}</td>
                        <td className="px-6 py-3">{item.userName}</td>
                        <td className="px-6 py-3">{item.email}</td>
                        <td className="px-6 py-3">{item.role}</td>
                        <td className="px-6 py-3">
                          <button
                            onClick={() => handleDeletePatient(item._id)}
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
        </div>
      </div>
    </section>
  );
}

export default AdminPatient;