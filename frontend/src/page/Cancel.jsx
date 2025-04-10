import { XCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-red-50 px-4">
      <XCircle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-semibold text-red-600 mb-2">
        Payment Cancelled
      </h1>
      <p className="text-gray-600 mb-6">
        Your payment was not completed. If this was a mistake, you can try again
        below.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl shadow-md transition duration-200"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default Cancel;
