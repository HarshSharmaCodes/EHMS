import { motion } from "framer-motion";
import React from "react";
import Navbar from "../Shared/Navbar";

function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <motion.div
        className="min-h-screen bg-gray-100 py-10 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mt-20"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-3xl font-bold text-center text-gray-800 mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Privacy Policy
          </motion.h1>

          <motion.p
            className="text-gray-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Welcome to the E-Health Monitoring System (EHMS). Your privacy is
            important to us. This policy explains how we collect, use, and
            protect your information.
          </motion.p>

          {[
            {
              title: "1. Information We Collect",
              content:
                "We collect personal information such as name, email, medical history, and health-related data for better health monitoring.",
            },
            {
              title: "2. How We Use Your Information",
              content:
                "- To provide and improve health monitoring services.\n- To ensure secure user authentication.\n- To comply with healthcare regulations.",
            },
            {
              title: "3. Data Security",
              content:
                "We implement strong security measures to protect your health data from unauthorized access, use, or disclosure.",
            },
            {
              title: "4. Third-Party Sharing",
              content:
                "Your data is not shared with third parties without your consent, except where required by law.",
            },
            {
              title: "5. Your Rights",
              content:
                "You have the right to access, update, or request deletion of your data. Contact us for assistance.",
            },
            {
              title: "6. Updates to This Policy",
              content:
                "We may update this policy periodically. Any changes will be communicated through our platform.",
            },
          ].map((section, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h2 className="text-xl font-semibold text-gray-700 mt-6">
                {section.title}
              </h2>
              <p className="text-gray-600 mb-4 whitespace-pre-line">
                {section.content}
              </p>
            </motion.div>
          ))}

          <motion.p
            className="text-gray-600 text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            If you have any questions, contact us at{" "}
            <strong>support@ehms.com</strong>.
          </motion.p>
        </motion.div>
      </motion.div>
    </>
  );
}

export default PrivacyPolicy;
