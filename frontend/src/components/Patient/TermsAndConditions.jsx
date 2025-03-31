import { motion } from "framer-motion";
import React from "react";
import Navbar from "../Shared/Navbar";

function TermsAndConditions() {
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
          className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg p-8 mt-20"
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
            Terms & Conditions
          </motion.h1>

          <motion.p
            className="text-gray-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Welcome to the E-Health Monitoring System (EHMS). By accessing or
            using our services, you agree to comply with the following terms and
            conditions.
          </motion.p>

          {[
            {
              title: "1. Acceptance of Terms",
              content:
                "By using EHMS, you agree to abide by these terms and conditions. If you do not agree, please refrain from using our services.",
            },
            {
              title: "2. User Responsibilities",
              content:
                "- You must provide accurate and up-to-date information.\n- You are responsible for maintaining the confidentiality of your account credentials.\n- Unauthorized use of the system is strictly prohibited.",
            },
            {
              title: "3. Medical Disclaimer",
              content:
                "EHMS provides health monitoring but does not replace professional medical advice. Always consult a healthcare provider for serious medical concerns.",
            },
            {
              title: "4. Privacy and Data Security",
              content:
                "Your personal health data is stored securely and will not be shared with third parties without consent, except as required by law.",
            },
            {
              title: "5. Service Modifications",
              content:
                "EHMS reserves the right to modify or discontinue services at any time without prior notice.",
            },
            {
              title: "6. Limitation of Liability",
              content:
                "EHMS is not responsible for any damages or losses resulting from the use of our platform, including inaccurate health data interpretation.",
            },
            {
              title: "7. Changes to Terms",
              content:
                "We may update these terms periodically. Continued use of EHMS after changes implies acceptance of the revised terms.",
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
              <p className="text-gray-600 mb-4 whitespace-pre-wrap">
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

export default TermsAndConditions;