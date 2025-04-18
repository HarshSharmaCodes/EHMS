import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminSidebar from "./AdminSidebar";

function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);

  const fetchSentMessages = async () => {
    try {
      await axios
        .get("http://localhost:5000/admin/get-sent-newsletter")
        .then((res) => {
          setSubscribers(res.data);
        });
    } catch (err) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Error Fetching Data!",
      });
    }
  };

  useEffect(() => {
    fetchSentMessages();
  }, []);

  return (
    <section className="bg-slate-300 flex justify-center items-center">
      <div className="h-[80%] w-[80%] bg-white shadow-xl p-2 flex">
        <AdminSidebar userName={"Admin"} />
        <div className=" w-[70%] ms-24 p-4 flex flex-col justify-start gap-5 ">
          <p className="font-semibold text-3xl">Subscribers Mail</p>
          <div className="w-full">
            <div className="relative overflow-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 border-b">#</th>
                    <th className="px-6 py-3 border-b">Subscriber's Email</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((email, index) => {
                    return (
                      <tr key={index} className="text-black">
                        <td className="px-6 py-3">{index + 1}</td>
                        <td className="px-6 py-3">{email.email}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminNewsletter;
