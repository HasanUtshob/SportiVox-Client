import React from "react";
import { motion } from "framer-motion";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex flex-col items-center space-y-4"
      >
        {/* DaisyUI spinner */}
        <span className="loading loading-spinner loading-lg text-primary"></span>

        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
          {message}
        </p>
      </motion.div>
    </div>
  );
};

export default Loading;
