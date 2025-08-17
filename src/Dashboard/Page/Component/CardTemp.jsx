import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Themecontext } from "../../../Context/ThemeContext";

const CardTemp = ({ title, value, icon, gradient, bgGradient, delay = 0 }) => {
  const { darkmode } = useContext(Themecontext);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative bg-gradient-to-br ${
        bgGradient || "from-white to-gray-50"
      } p-6 rounded-3xl shadow-xl border border-white/20 overflow-hidden group cursor-pointer`}
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

      <div className="relative z-10 flex items-center space-x-4">
        <div
          className={`p-4 bg-gradient-to-br ${
            gradient || "from-blue-500 to-purple-600"
          } text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <div>
          <h4
            className={`text-sm font-semibold mb-1 ${
              darkmode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {title}
          </h4>
          <p
            className={`text-3xl font-bold ${
              darkmode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {value}
          </p>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
    </motion.div>
  );
};

export default CardTemp;
