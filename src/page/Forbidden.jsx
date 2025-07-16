import React from "react";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-[600px] flex items-center justify-center bg-gradient-to-br from-red-100 via-pink-100 to-purple-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-3xl p-10 max-w-md text-center border border-red-300"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="flex justify-center mb-4"
        >
          <FaLock className="text-5xl text-red-500" />
        </motion.div>
        <h1 className="text-4xl font-extrabold text-red-600 mb-2">403</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Access Forbidden
        </h2>
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page.
          <br />
          Please contact the administrator if you believe this is a mistake.
        </p>
        <Link
          to="/"
          className="btn btn-error text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
        >
          🔙 Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Forbidden;
