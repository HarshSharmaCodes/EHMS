import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const [loading, setLoading] = useState(true);
  const hasSaved = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saveAppointment = async () => {
      if (hasSaved.current) return;
      hasSaved.current = true;

      const data = JSON.parse(localStorage.getItem("appointmentData"));
      if (data) {
        try {
          await axios.post("http://localhost:5000/appointment/add-appointment", data);
          localStorage.removeItem("appointmentData");
        } catch (error) {
          console.error("Failed to save appointment:", error);
        }
      }

      setLoading(false);

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    };

    saveAppointment();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="text-center text-green-600 mt-10 text-2xl">
      ✅ Payment Successful & Appointment Confirmed!
      <p className="text-base mt-2 text-gray-600">Redirecting to home...</p>
    </div>
  );
};

export default SuccessPage;