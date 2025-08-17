import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  FaLock,
  FaShieldAlt,
  FaHome,
  FaExclamationTriangle,
  FaUserShield,
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { Link } from "react-router";
import { Themecontext } from "../Context/ThemeContext";

const Forbidden = () => {
  const { darkmode } = useContext(Themecontext);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.3,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50"
      } relative overflow-hidden`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Sports Equipment Background */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute top-10 left-10 w-16 h-16 ${
            darkmode ? "text-gray-700/20" : "text-orange-200/30"
          } text-6xl`}
        >
          🏸
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={`absolute top-20 right-20 w-16 h-16 ${
            darkmode ? "text-gray-700/20" : "text-red-200/30"
          } text-5xl`}
        >
          ⚽
        </motion.div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-20 left-20 w-16 h-16 ${
            darkmode ? "text-gray-700/20" : "text-blue-200/30"
          } text-4xl`}
        >
          🏀
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-10 right-10 w-16 h-16 ${
            darkmode ? "text-gray-700/20" : "text-green-200/30"
          } text-5xl`}
        >
          🎾
        </motion.div>

        {/* Floating Geometric Shapes */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className={`absolute top-1/4 left-1/4 w-20 h-20 ${
            darkmode ? "bg-red-900/20" : "bg-red-200/30"
          } rounded-full`}
        />

        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
          className={`absolute top-3/4 right-1/4 w-16 h-16 ${
            darkmode ? "bg-orange-900/20" : "bg-orange-200/30"
          } rounded-full`}
        />

        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className={`absolute top-1/2 left-1/6 w-12 h-12 ${
            darkmode ? "bg-yellow-900/20" : "bg-yellow-200/30"
          } rounded-full`}
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`relative z-10 ${
          darkmode
            ? "bg-gray-800/90 border-gray-700/50"
            : "bg-white/90 border-white/50"
        } backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center border`}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            variants={iconVariants}
            className="flex justify-center mb-6"
          >
            <div
              className={`relative p-6 ${
                darkmode
                  ? "bg-gradient-to-br from-red-900/50 to-orange-900/50"
                  : "bg-gradient-to-br from-red-100 to-orange-100"
              } rounded-full`}
            >
              <FaShieldAlt
                className={`text-6xl ${
                  darkmode ? "text-red-400" : "text-red-500"
                }`}
              />
              <div className="absolute -top-2 -right-2">
                <FaLock
                  className={`text-2xl ${
                    darkmode ? "text-orange-400" : "text-orange-500"
                  }`}
                />
              </div>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={`text-6xl md:text-7xl font-bold ${
              darkmode
                ? "bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"
            } mb-4`}
          >
            403
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className={`text-2xl md:text-3xl font-bold ${
              darkmode ? "text-gray-100" : "text-gray-800"
            } mb-3`}
          >
            Access Restricted
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className={`w-24 h-1 ${
              darkmode
                ? "bg-gradient-to-r from-red-400 to-orange-400"
                : "bg-gradient-to-r from-red-500 to-orange-500"
            } mx-auto rounded-full mb-6`}
          />
        </motion.div>

        {/* Content Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div
            className={`${
              darkmode
                ? "bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-700/50"
                : "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200"
            } border rounded-2xl p-6 mb-6`}
          >
            <div className="flex items-center justify-center mb-4">
              <FaExclamationTriangle
                className={`text-2xl ${
                  darkmode ? "text-yellow-400" : "text-yellow-600"
                } mr-3`}
              />
              <span
                className={`text-lg font-semibold ${
                  darkmode ? "text-yellow-400" : "text-yellow-700"
                }`}
              >
                SportivoX Access Control
              </span>
            </div>
            <p
              className={`${
                darkmode ? "text-gray-300" : "text-gray-700"
              } text-lg leading-relaxed`}
            >
              You don't have the required permissions to access this sports
              facility or feature. This could be due to membership restrictions,
              booking limitations, or administrative settings.
            </p>
          </div>

          {/* Sports-themed message */}
          <motion.div
            variants={itemVariants}
            className={`${
              darkmode
                ? "bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-700/50"
                : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
            } border rounded-2xl p-6 mb-6`}
          >
            <div className="flex items-center justify-center mb-3">
              <FaUserShield
                className={`text-xl ${
                  darkmode ? "text-blue-400" : "text-blue-600"
                } mr-2`}
              />
              <span
                className={`font-semibold ${
                  darkmode ? "text-blue-400" : "text-blue-700"
                }`}
              >
                Possible Reasons
              </span>
            </div>
            <ul
              className={`text-left space-y-2 ${
                darkmode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Your membership level doesn't include this feature
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Court booking requires admin approval
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                Premium sports facilities access needed
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Administrative area restricted to staff only
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
        >
          <Link
            to="/"
            className={`group flex items-center justify-center px-8 py-4 ${
              darkmode
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            } text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-48`}
          >
            <FaHome className="mr-2 group-hover:animate-bounce" />
            <span>Back to Home</span>
          </Link>

          <Link
            to="/Dashboard"
            className={`group flex items-center justify-center px-8 py-4 ${
              darkmode
                ? "bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-300"
                : "bg-white hover:bg-gray-50 border-gray-300 text-gray-700"
            } border-2 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-48`}
          >
            <FaArrowLeft className="mr-2 group-hover:animate-pulse" />
            <span>Browse to Dashboard</span>
          </Link>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          variants={itemVariants}
          className={`${
            darkmode
              ? "bg-gray-700/50 border-gray-600"
              : "bg-gray-50 border-gray-200"
          } border rounded-2xl p-6`}
        >
          <h3
            className={`text-lg font-semibold ${
              darkmode ? "text-gray-200" : "text-gray-800"
            } mb-4`}
          >
            Need Help? Contact SportivoX Support
          </h3>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center">
              <div
                className={`p-2 ${
                  darkmode ? "bg-green-900/50" : "bg-green-100"
                } rounded-xl mr-3`}
              >
                <FaEnvelope
                  className={`${
                    darkmode ? "text-green-400" : "text-green-600"
                  } text-sm`}
                />
              </div>
              <div>
                <p
                  className={`text-sm ${
                    darkmode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Email Support
                </p>
                <p
                  className={`font-semibold ${
                    darkmode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  support@sportivox.com
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div
                className={`p-2 ${
                  darkmode ? "bg-blue-900/50" : "bg-blue-100"
                } rounded-xl mr-3`}
              >
                <FaPhone
                  className={`${
                    darkmode ? "text-blue-400" : "text-blue-600"
                  } text-sm`}
                />
              </div>
              <div>
                <p
                  className={`text-sm ${
                    darkmode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Call Us
                </p>
                <p
                  className={`font-semibold ${
                    darkmode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  +1 (555) 123-SPORT
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.p
          variants={itemVariants}
          className={`text-sm ${
            darkmode ? "text-gray-400" : "text-gray-500"
          } mt-6`}
        >
          If you believe this is an error, please contact our support team with
          your account details.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Forbidden;
