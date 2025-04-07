import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../Shared/Loader";
import AdminSidebar from "./AdminSidebar";

function AdminDoctor() {
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [docname, setDocName] = useState("");
  const [docspec, setDocSpecialization] = useState("");
  const [docemail, setDocEmail] = useState("");
  const [doctimings, setDocTimings] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const availableTimings = [
    "09:00 AM - 3:00 PM",
    "10:00 AM - 2:00 PM",
    "11:00 AM - 5:00 PM",
    "12:00 PM - 4:00 PM",
    "09:00 AM - 1:00 PM",
  ];

  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/doctor/get-doctors");
      setDoctors(response.data);
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Error Fetching Data!",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loader />;

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    if (!isValidEmail(docemail)) {
      Swal.fire({
        title: "Invalid Email",
        icon: "warning",
        text: "Please enter a valid email address!",
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/doctor/add-doctor", {
        name: docname,
        specialization: docspec,
        email: docemail,
        timings: doctimings,
      });

      if (res.data.message === "Success") {
        await fetchData();
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Doctor Added Successfully!",
        });
        setDocName("");
        setDocSpecialization("");
        setDocEmail("");
        setDocTimings([]);
        setIsCreate(false);
      }
    } catch (e) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Error Adding Doctor!",
      });
    }
  };

  const handleUpdateDoctor = async (e, id) => {
    e.preventDefault();
    if (!isValidEmail(editingDoctor.email)) {
      Swal.fire({
        title: "Invalid Email",
        icon: "warning",
        text: "Please enter a valid email address!",
      });
      return;
    }

    try {
      await axios.put(`http://localhost:5000/doctor/update-doctor/${id}`, {
        name: editingDoctor.name,
        specialization: editingDoctor.specialization,
        email: editingDoctor.email,
        timings: editingDoctor.timings,
      });

      await fetchData();
      setIsEditing(false);
      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Doctor Updated Successfully!",
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Could not update Doctor!",
      });
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/doctor/delete-doctor/${id}`);
      setDoctors(doctors.filter((doctor) => doctor._id !== id));
      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Doctor Deleted Successfully!",
      });
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
              <table className="w-full text-sm text-left text-gray-500 border-collapse">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 border-b">#</th>
                    <th className="px-6 py-3 border-b">Doctor Name</th>
                    <th className="px-6 py-3 border-b">Doctor Email</th>
                    <th className="px-6 py-3 border-b">Specialization</th>
                    <th className="px-6 py-3 border-b">Timings</th>
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
                      <td className="px-6 py-3">
                        {item.timings?.join(", ") || "N/A"}
                      </td>
                      <td className="flex gap-3 py-3">
                        <button
                          onClick={() => {
                            setEditingDoctor(item);
                            setIsEditing(true);
                          }}
                          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700 transition duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteDoctor(item._id)}
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

        {/* Create Doctor Modal */}
        {isCreate && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[40%]">
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                Register Doctor
              </h2>
              <form className="flex flex-col gap-4" onSubmit={handleAddDoctor}>
                <input
                  value={docname}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="Doctor Name"
                  className="border border-gray-300 p-3 rounded-lg"
                  required
                />
                <input
                  value={docemail}
                  onChange={(e) => setDocEmail(e.target.value)}
                  placeholder="Email"
                  className={`border p-3 rounded-lg ${
                    docemail && !isValidEmail(docemail)
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  required
                />
                {docemail && !isValidEmail(docemail) && (
                  <p className="text-red-500 text-sm">Invalid email format</p>
                )}
                <select
                  value={docspec}
                  onChange={(e) => setDocSpecialization(e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg"
                  required
                >
                  <option value="" disabled>
                    Select Specialization
                  </option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Orthopedic">Orthopedic</option>
                  <option value="Pediatrician">Pediatrician</option>
                </select>
                <div>
                  <label className="font-medium">Available Timings:</label>
                  <select
                    multiple
                    value={doctimings}
                    onChange={(e) =>
                      setDocTimings(
                        Array.from(e.target.selectedOptions, (option) => option.value)
                      )
                    }
                    className="w-full border border-gray-300 p-2 rounded-lg"
                  >
                    {availableTimings.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    disabled={!isValidEmail(docemail)}
                    className={`py-2 px-4 rounded-lg transition duration-200 text-white ${
                      isValidEmail(docemail)
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Add Doctor
                  </button>
                  <button
                    onClick={() => setIsCreate(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Doctor Modal */}
        {isEditing && editingDoctor && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[40%]">
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                Edit Doctor
              </h2>
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => handleUpdateDoctor(e, editingDoctor._id)}
              >
                <input
                  value={editingDoctor.name}
                  onChange={(e) =>
                    setEditingDoctor({ ...editingDoctor, name: e.target.value })
                  }
                  placeholder="Doctor Name"
                  className="border border-gray-300 p-3 rounded-lg"
                  required
                />
                <input
                  value={editingDoctor.email}
                  onChange={(e) =>
                    setEditingDoctor({ ...editingDoctor, email: e.target.value })
                  }
                  placeholder="Email"
                  className={`border p-3 rounded-lg ${
                    isValidEmail(editingDoctor.email)
                      ? "border-gray-300"
                      : "border-red-500"
                  }`}
                  required
                />
                {!isValidEmail(editingDoctor.email) && (
                  <p className="text-red-500 text-sm">Invalid email format</p>
                )}
                <select
                  value={editingDoctor.specialization}
                  onChange={(e) =>
                    setEditingDoctor({
                      ...editingDoctor,
                      specialization: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-3 rounded-lg"
                  required
                >
                  <option value="Neurologist">Neurologist</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Orthopedic">Orthopedic</option>
                  <option value="Pediatrician">Pediatrician</option>
                </select>
                <div>
                  <label className="font-medium">Available Timings:</label>
                  <select
                    multiple
                    value={editingDoctor.timings}
                    onChange={(e) =>
                      setEditingDoctor({
                        ...editingDoctor,
                        timings: Array.from(e.target.selectedOptions, (opt) => opt.value),
                      })
                    }
                    className="w-full border border-gray-300 p-2 rounded-lg"
                  >
                    {availableTimings.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    disabled={!isValidEmail(editingDoctor.email)}
                    className={`py-2 px-4 rounded-lg transition duration-200 text-white ${
                      isValidEmail(editingDoctor.email)
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminDoctor;