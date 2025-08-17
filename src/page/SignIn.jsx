import React, { useState, useContext } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Login from "../assets/Login.json";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";
import { Themecontext } from "../Context/ThemeContext";

const SignIn = () => {
  const { darkmode } = useContext(Themecontext);
  const { SignInUser, setLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    SignInUser(email, password)
      .then((result) => {
        if (location.state?.court) {
          navigate("/Courts", {
            state: { reopenCourt: location.state.court },
            replace: true,
          });
        } else {
          navigate(from, { replace: true });
        }
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign In Successful",
          showConfirmButton: false,
          timer: 1500,
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
          customClass: {
            popup: darkmode ? "dark-popup" : "",
            title: darkmode ? "dark-title" : "",
            content: darkmode ? "dark-content" : "",
          },
        });
        return result;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: error.message,
          showConfirmButton: false,
          timer: 2000,
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
          customClass: {
            popup: darkmode ? "dark-popup" : "",
            title: darkmode ? "dark-title" : "",
            content: darkmode ? "dark-content" : "",
          },
        });
        setLoading(false);
      });
  };

  return (
    <div
      className={`min-h-screen ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
      } relative overflow-hidden`}
    >
      {/* Background Decorations */}
      <div
        className={`absolute inset-0 ${
          darkmode
            ? "bg-gradient-to-r from-blue-800/10 to-purple-800/10"
            : "bg-gradient-to-r from-blue-600/5 to-purple-600/5"
        }`}
      ></div>
      <div
        className={`absolute top-0 left-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-br from-blue-600/10 to-transparent"
            : "bg-gradient-to-br from-blue-400/20 to-transparent"
        } rounded-full -translate-x-48 -translate-y-48`}
      ></div>
      <div
        className={`absolute bottom-0 right-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-tl from-purple-600/10 to-transparent"
            : "bg-gradient-to-tl from-purple-400/20 to-transparent"
        } rounded-full translate-x-48 translate-y-48`}
      ></div>
      <div
        className={`absolute top-1/2 left-1/4 w-32 h-32 ${
          darkmode
            ? "bg-gradient-to-br from-pink-600/5 to-transparent"
            : "bg-gradient-to-br from-pink-400/10 to-transparent"
        } rounded-full animate-pulse`}
      ></div>

      <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
        {/* Left Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 py-10"
        >
          {/* Logo */}
          <Link
            to="/"
            className={`absolute top-8 left-8 flex items-center space-x-2 text-2xl font-bold ${
              darkmode
                ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            }`}
          >
            <span className="text-3xl">🏸</span>
            <span>SportivoX</span>
          </Link>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`mt-20 md:mt-0 w-full max-w-md ${
              darkmode
                ? "bg-gray-800/90 backdrop-blur-sm border-gray-700/50"
                : "bg-white/80 backdrop-blur-sm border-white/20"
            } rounded-3xl shadow-2xl border p-8 sm:p-10`}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`text-4xl sm:text-5xl font-bold ${
                  darkmode
                    ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                } mb-3`}
              >
                Welcome Back! 👋
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className={`${
                  darkmode ? "text-gray-300" : "text-gray-600"
                } text-lg`}
              >
                Sign in to continue your sports journey
              </motion.p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <label
                  className={`block text-sm font-semibold ${
                    darkmode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-blue-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`w-full pl-12 pr-4 py-4 ${
                      darkmode
                        ? "bg-gray-700/70 border-gray-600 text-gray-200 placeholder-gray-400 focus:bg-gray-700 focus:border-blue-400"
                        : "bg-white/70 border-gray-200 text-gray-700 placeholder-gray-500 focus:bg-white focus:border-blue-500"
                    } border-2 rounded-2xl focus:outline-none transition-all duration-300 shadow-sm`}
                    required
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <label
                    className={`block text-sm font-semibold ${
                      darkmode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className={`text-sm ${
                      darkmode
                        ? "text-blue-400 hover:text-purple-400"
                        : "text-blue-600 hover:text-purple-600"
                    } transition-colors duration-300 font-medium`}
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-purple-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className={`w-full pl-12 pr-12 py-4 ${
                      darkmode
                        ? "bg-gray-700/70 border-gray-600 text-gray-200 placeholder-gray-400 focus:bg-gray-700 focus:border-purple-400"
                        : "bg-white/70 border-gray-200 text-gray-700 placeholder-gray-500 focus:bg-white focus:border-purple-500"
                    } border-2 rounded-2xl focus:outline-none transition-all duration-300 shadow-sm`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 right-0 pr-4 flex items-center ${
                      darkmode
                        ? "text-gray-400 hover:text-purple-400"
                        : "text-gray-500 hover:text-purple-600"
                    } transition-colors duration-300`}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </motion.div>

              {/* Sign In Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 ${
                  darkmode
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700"
                    : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600"
                } text-white rounded-2xl font-semibold text-lg transform transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2`}
                type="submit"
              >
                <span>Sign In</span>
                <FaArrowRight className="text-sm" />
              </motion.button>
            </form>

            {/* Register Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-center mt-8"
            >
              <p className={`${darkmode ? "text-gray-300" : "text-gray-600"}`}>
                Don't have an account?{" "}
                <Link
                  to="/Register"
                  className={`font-semibold ${
                    darkmode
                      ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-purple-400 hover:to-pink-400"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600"
                  } transition-all duration-300`}
                >
                  Create Account
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Side - Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`hidden md:flex w-1/2 items-center justify-center ${
            darkmode
              ? "bg-gradient-to-br from-gray-800/50 to-blue-800/50"
              : "bg-gradient-to-br from-blue-100/50 to-purple-100/50"
          } relative`}
        >
          {/* Decorative Elements */}
          <div
            className={`absolute top-20 left-20 w-20 h-20 ${
              darkmode
                ? "bg-gradient-to-br from-blue-600/20 to-transparent"
                : "bg-gradient-to-br from-blue-400/30 to-transparent"
            } rounded-full animate-bounce`}
          ></div>
          <div
            className={`absolute bottom-20 right-20 w-16 h-16 ${
              darkmode
                ? "bg-gradient-to-br from-purple-600/20 to-transparent"
                : "bg-gradient-to-br from-purple-400/30 to-transparent"
            } rounded-full animate-pulse`}
          ></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <Lottie
              animationData={Login}
              loop
              autoplay
              className="w-full max-w-lg drop-shadow-2xl"
            />
            {/* Glow Effect */}
            <div
              className={`absolute inset-0 ${
                darkmode
                  ? "bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"
                  : "bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20"
              } rounded-full blur-3xl`}
            ></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
