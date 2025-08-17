import React, { useContext } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FaExclamationTriangle,
  FaHome,
  FaSearch,
  FaCompass,
  FaArrowLeft,
  FaQuestionCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Themecontext } from "../Context/ThemeContext";

const NotFound = () => {
  const { darkmode } = useContext(Themecontext);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
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
        damping: 15,
        delay: 0.4,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-15, 15, -15],
      rotate: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const bounceVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      } relative overflow-hidden`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Sports Equipment Background */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className={`absolute top-16 left-16 text-6xl ${
            darkmode ? "text-blue-800/20" : "text-blue-200/40"
          }`}
        >
          🏸
        </motion.div>

        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
          className={`absolute top-20 right-20 text-5xl ${
            darkmode ? "text-purple-800/20" : "text-purple-200/40"
          }`}
        >
          ⚽
        </motion.div>

        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className={`absolute bottom-20 left-20 text-4xl ${
            darkmode ? "text-pink-800/20" : "text-pink-200/40"
          }`}
        >
          🏀
        </motion.div>

        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "0.5s" }}
          className={`absolute bottom-16 right-16 text-5xl ${
            darkmode ? "text-green-800/20" : "text-green-200/40"
          }`}
        >
          🎾
        </motion.div>

        {/* Geometric Shapes */}
        <motion.div
          variants={bounceVariants}
          animate="animate"
          className={`absolute top-1/3 left-1/4 w-24 h-24 ${
            darkmode ? "bg-blue-900/20" : "bg-blue-200/30"
          } rounded-full`}
        />

        <motion.div
          variants={bounceVariants}
          animate="animate"
          style={{ animationDelay: "1.5s" }}
          className={`absolute top-2/3 right-1/4 w-20 h-20 ${
            darkmode ? "bg-purple-900/20" : "bg-purple-200/30"
          } rounded-full`}
        />

        <motion.div
          variants={bounceVariants}
          animate="animate"
          style={{ animationDelay: "3s" }}
          className={`absolute top-1/2 left-1/6 w-16 h-16 ${
            darkmode ? "bg-pink-900/20" : "bg-pink-200/30"
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
        } backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-12 max-w-3xl w-full text-center border`}
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
                  ? "bg-gradient-to-br from-orange-900/50 to-red-900/50"
                  : "bg-gradient-to-br from-orange-100 to-red-100"
              } rounded-full`}
            >
              <FaExclamationTriangle
                className={`text-6xl ${
                  darkmode ? "text-orange-400" : "text-orange-500"
                }`}
              />
              <div className="absolute -top-2 -right-2">
                <FaQuestionCircle
                  className={`text-2xl ${
                    darkmode ? "text-red-400" : "text-red-500"
                  }`}
                />
              </div>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={`text-7xl md:text-8xl font-bold ${
              darkmode
                ? "bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
            } mb-4`}
          >
            404
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className={`text-2xl md:text-3xl font-bold ${
              darkmode ? "text-gray-100" : "text-gray-800"
            } mb-3`}
          >
            Court Not Found
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className={`w-24 h-1 ${
              darkmode
                ? "bg-gradient-to-r from-orange-400 to-red-400"
                : "bg-gradient-to-r from-orange-500 to-red-500"
            } mx-auto rounded-full mb-6`}
          />
        </motion.div>

        {/* Content Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div
            className={`${
              darkmode
                ? "bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-700/50"
                : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
            } border rounded-2xl p-6 mb-6`}
          >
            <div className="flex items-center justify-center mb-4">
              <FaCompass
                className={`text-2xl ${
                  darkmode ? "text-blue-400" : "text-blue-600"
                } mr-3`}
              />
              <span
                className={`text-lg font-semibold ${
                  darkmode ? "text-blue-400" : "text-blue-700"
                }`}
              >
                Lost in SportivoX?
              </span>
            </div>
            <p
              className={`${
                darkmode ? "text-gray-300" : "text-gray-700"
              } text-lg leading-relaxed mb-4`}
            >
              Oops! The sports facility or page you're looking for seems to have
              moved to a different court. Don't worry, we'll help you get back
              in the game!
            </p>
            <p
              className={`${
                darkmode ? "text-gray-400" : "text-gray-600"
              } text-sm`}
            >
              The page might have been removed, renamed, or is temporarily
              unavailable.
            </p>
          </div>

          {/* Sports-themed suggestions */}
          <motion.div
            variants={itemVariants}
            className={`${
              darkmode
                ? "bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-700/50"
                : "bg-gradient-to-r from-green-50 to-teal-50 border-green-200"
            } border rounded-2xl p-6 mb-6`}
          >
            <div className="flex items-center justify-center mb-3">
              <FaMapMarkerAlt
                className={`text-xl ${
                  darkmode ? "text-green-400" : "text-green-600"
                } mr-2`}
              />
              <span
                className={`font-semibold ${
                  darkmode ? "text-green-400" : "text-green-700"
                }`}
              >
                Where to Go Next?
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <ul
                className={`space-y-2 ${
                  darkmode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Browse available sports courts
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Check out community forums
                </li>
              </ul>
              <ul
                className={`space-y-2 ${
                  darkmode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  View your booking history
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Read user reviews and guides
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <Link
            to="/"
            className={`group flex items-center justify-center px-6 py-4 ${
              darkmode
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            } text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
          >
            <FaHome className="mr-2 group-hover:animate-bounce" />
            <span>Home</span>
          </Link>

          <Link
            to="/courts"
            className={`group flex items-center justify-center px-6 py-4 ${
              darkmode
                ? "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                : "bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
            } text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
          >
            <FaSearch className="mr-2 group-hover:animate-pulse" />
            <span>Find Courts</span>
          </Link>

          <Link
            to="/support"
            className={`group flex items-center justify-center px-6 py-4 ${
              darkmode
                ? "bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-300"
                : "bg-white hover:bg-gray-50 border-gray-300 text-gray-700"
            } border-2 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
          >
            <FaQuestionCircle className="mr-2 group-hover:animate-spin" />
            <span>Get Help</span>
          </Link>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          variants={itemVariants}
          className={`${
            darkmode
              ? "bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-700/50"
              : "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200"
          } border rounded-2xl p-6 mb-6`}
        >
          <h3
            className={`text-lg font-semibold ${
              darkmode ? "text-gray-200" : "text-gray-800"
            } mb-4`}
          >
            Quick Navigation
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              to="/reviews"
              className={`p-3 ${
                darkmode
                  ? "bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
                  : "bg-white/70 hover:bg-white text-gray-700"
              } rounded-xl transition-all duration-300 hover:scale-105 text-center`}
            >
              <div className="text-2xl mb-1">⭐</div>
              <div className="text-sm font-medium">Reviews</div>
            </Link>

            <Link
              to="/community-forum"
              className={`p-3 ${
                darkmode
                  ? "bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
                  : "bg-white/70 hover:bg-white text-gray-700"
              } rounded-xl transition-all duration-300 hover:scale-105 text-center`}
            >
              <div className="text-2xl mb-1">💬</div>
              <div className="text-sm font-medium">Forum</div>
            </Link>

            <Link
              to="/user-guide"
              className={`p-3 ${
                darkmode
                  ? "bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
                  : "bg-white/70 hover:bg-white text-gray-700"
              } rounded-xl transition-all duration-300 hover:scale-105 text-center`}
            >
              <div className="text-2xl mb-1">📖</div>
              <div className="text-sm font-medium">Guide</div>
            </Link>

            <Link
              to="/contact"
              className={`p-3 ${
                darkmode
                  ? "bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
                  : "bg-white/70 hover:bg-white text-gray-700"
              } rounded-xl transition-all duration-300 hover:scale-105 text-center`}
            >
              <div className="text-2xl mb-1">📞</div>
              <div className="text-sm font-medium">Contact</div>
            </Link>
          </div>
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
            Still Lost? Contact SportivoX Support
          </h3>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center">
              <div
                className={`p-2 ${
                  darkmode ? "bg-blue-900/50" : "bg-blue-100"
                } rounded-xl mr-3`}
              >
                <FaEnvelope
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
                  Email Support
                </p>
                <p
                  className={`font-semibold ${
                    darkmode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  help@sportivox.com
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div
                className={`p-2 ${
                  darkmode ? "bg-green-900/50" : "bg-green-100"
                } rounded-xl mr-3`}
              >
                <FaPhone
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
                  Call Us
                </p>
                <p
                  className={`font-semibold ${
                    darkmode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  +1 (555) 404-HELP
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
          Don't let a 404 stop your game! We're here to help you find what
          you're looking for.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;
