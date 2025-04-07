import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import profiePic from "../../assets/Admin-Profile.png";
import AdminSidebar from "./AdminSidebar";

function AdminDashboard() {
  const [docount, setDocount] = useState(0);
  const [patientcount, setPatientcount] = useState(0);
  const [querieslef, setQuerieslef] = useState(0);
  const [news, setNews] = useState(0);
  const [] = useState(0);

  const fetchInfo = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/get-count");
      setDocount(res.data.doccou);
      setPatientcount(res.data.patientcou);
      setQuerieslef(res.data.queriescou);
      setNews(res.data.newcou);
    } catch (err) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Error Fetching Data!",
      });
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <section className="bg-slate-300 flex justify-center items-center">
      <div className="h-[80%] w-[80%] bg-white shadow-xl p-2 flex">
        <AdminSidebar userName={"Admin"} profiePic={profiePic} />
        <div className="w-[70%] ms-24 p-4 flex flex-col justify-around">
          <p className="font-semibold text-3xl text-center">Dashboard</p>
          <div className="w-full h-[80%] items-center flex flex-col gap-4">
            <div className="flex w-full justify-evenly h-[30%]">
              <div className="flex shadow-xl rounded-xl border-2 border-slate-900 w-[30%] justify-center items-center">
                <span className="font-semibold text-xl">
                  Doctors: {docount}
                </span>
              </div>
            </div>
            <div className="flex w-full justify-evenly h-[30%]">
              <div className="flex shadow-xl rounded-xl border-2 border-slate-900 w-[30%] justify-center items-center">
                <span className="font-semibold text-xl">
                  Patients: {patientcount}
                </span>
              </div>
              <div className="flex shadow-xl rounded-xl border-2 border-slate-900 w-[30%] justify-center items-center">
                <span className="font-semibold text-xl">
                  Query: {querieslef}
                </span>
              </div>
            </div>
            <div className="flex shadow-xl rounded-xl border-2 border-slate-900 w-[30%] h-[30%] justify-center items-center">
              <span className="font-semibold text-xl">Newsletter: {news}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
