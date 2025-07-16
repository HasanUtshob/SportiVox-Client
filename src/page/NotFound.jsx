import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="text-center bg-white p-10 rounded-3xl shadow-2xl max-w-md"
      >
        <div className="text-6xl text-red-500 mb-4">
          <FaExclamationTriangle />
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full transition-all shadow-md"
        >
          🔙 Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
