import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Regist from "../assets/register.json";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
  FaImage,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";
import { Themecontext } from "../Context/ThemeContext";

const Register = () => {
  const { darkmode } = useContext(Themecontext);
  const { CreateUser, setLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imgbbApiKey = "35d533c9830c979166daa6d60911d270";

  const onSubmit = async (data) => {
    const imageFile = data.Photo[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const imageUpload = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );

      if (imageUpload.data.success) {
        const PhotoUrl = imageUpload.data.data.url;

        const userInfo = {
          name: data.FullName,
          dob: data.DOB,
          email: data.Email,
          password: data.Password,
          photo: PhotoUrl,
          role: "user",
        };

        const SignUp = await CreateUser(userInfo.email, userInfo.password);
        await updateProfile(SignUp.user, {
          displayName: userInfo.name,
          photoURL: userInfo.photo,
        });

        const save = await axios.post("http://localhost:5000/Users", userInfo);

        if (save.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Account Created!",
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
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
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
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900"
          : "bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50"
      } relative overflow-hidden`}
    >
      {/* Background Decorations */}
      <div
        className={`absolute inset-0 ${
          darkmode
            ? "bg-gradient-to-r from-purple-800/10 to-pink-800/10"
            : "bg-gradient-to-r from-purple-600/5 to-pink-600/5"
        }`}
      ></div>
      <div
        className={`absolute top-0 right-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-bl from-purple-600/10 to-transparent"
            : "bg-gradient-to-bl from-purple-400/20 to-transparent"
        } rounded-full translate-x-48 -translate-y-48`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-tr from-pink-600/10 to-transparent"
            : "bg-gradient-to-tr from-pink-400/20 to-transparent"
        } rounded-full -translate-x-48 translate-y-48`}
      ></div>
      <div
        className={`absolute top-1/3 right-1/4 w-32 h-32 ${
          darkmode
            ? "bg-gradient-to-br from-blue-600/5 to-transparent"
            : "bg-gradient-to-br from-blue-400/10 to-transparent"
        } rounded-full animate-pulse`}
      ></div>

      {/* Logo */}
      <Link
        to="/"
        className={`absolute top-8 left-8 z-20 flex items-center space-x-2 text-2xl font-bold ${
          darkmode
            ? "bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            : "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
        }`}
      >
        <span className="text-3xl">🏸</span>
        <span>SportivoX</span>
      </Link>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side - Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex justify-center items-center relative order-2 lg:order-1"
          >
            {/* Decorative Elements */}
            <div
              className={`absolute top-10 left-10 w-20 h-20 ${
                darkmode
                  ? "bg-gradient-to-br from-purple-600/20 to-transparent"
                  : "bg-gradient-to-br from-purple-400/30 to-transparent"
              } rounded-full animate-bounce`}
            ></div>
            <div
              className={`absolute bottom-10 right-10 w-16 h-16 ${
                darkmode
                  ? "bg-gradient-to-br from-pink-600/20 to-transparent"
                  : "bg-gradient-to-br from-pink-400/30 to-transparent"
              } rounded-full animate-pulse`}
            ></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <Lottie
                animationData={Regist}
                loop
                autoplay
                className="w-full max-w-lg drop-shadow-2xl"
              />
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 ${
                  darkmode
                    ? "bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10"
                    : "bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20"
                } rounded-full blur-3xl`}
              ></div>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 order-1 lg:order-2"
          >
            <div
              className={`${
                darkmode
                  ? "bg-gray-800/90 backdrop-blur-sm border-gray-700/50"
                  : "bg-white/80 backdrop-blur-sm border-white/20"
              } shadow-2xl rounded-3xl border p-8 lg:p-10`}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className={`text-4xl lg:text-5xl font-bold ${
                    darkmode
                      ? "bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                      : "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
                  } mb-3`}
                >
                  Join SportivoX! 🚀
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className={`${
                    darkmode ? "text-gray-300" : "text-gray-600"
                  } text-lg`}
                >
                  Create your account and start your sports adventure
                </motion.p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Profile Photo */}
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
                    Profile Photo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaImage className="text-pink-500" />
                    </div>
                    <input
                      {...register("Photo", { required: "Photo is required" })}
                      type="file"
                      accept="image/*"
                      className={`w-full pl-12 pr-4 py-4 ${
                        darkmode
                          ? "bg-gray-700/70 border-gray-600 text-gray-200 focus:bg-gray-700 focus:border-pink-400"
                          : "bg-white/70 border-gray-200 text-gray-700 focus:bg-white focus:border-pink-500"
                      } border-2 rounded-2xl focus:outline-none transition-all duration-300 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold ${
                        darkmode
                          ? "file:bg-pink-900/50 file:text-pink-300 hover:file:bg-pink-800/50"
                          : "file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                      }`}
                    />
                  </div>
                  {errors.Photo && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.Photo.message}
                    </p>
                  )}
                </motion.div>

                {/* Full Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <label
                    className={`block text-sm font-semibold ${
                      darkmode ? "text-gray-300" : "text-gray-700"
                    } mb-2`}
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUser className="text-blue-500" />
                    </div>
                    <input
                      {...register("FullName", {
                        required: "Name is required",
                      })}
                      type="text"
                      placeholder="Enter your full name"
                      className={`w-full pl-12 pr-4 py-4 ${
                        darkmode
                          ? "bg-gray-700/70 border-gray-600 text-gray-200 placeholder-gray-400 focus:bg-gray-700 focus:border-blue-400"
                          : "bg-white/70 border-gray-200 text-gray-700 placeholder-gray-500 focus:bg-white focus:border-blue-500"
                      } border-2 rounded-2xl focus:outline-none transition-all duration-300 shadow-sm`}
                    />
                  </div>
                  {errors.FullName && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.FullName.message}
                    </p>
                  )}
                </motion.div>

                {/* Date of Birth */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <label
                    className={`block text-sm font-semibold ${
                      darkmode ? "text-gray-300" : "text-gray-700"
                    } mb-2`}
                  >
                    Date of Birth
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-purple-500" />
                    </div>
                    <input
                      {...register("DOB", {
                        required: "Date of birth is required",
                      })}
                      type="date"
                      className={`w-full pl-12 pr-4 py-4 ${
                        darkmode
                          ? "bg-gray-700/70 border-gray-600 text-gray-200 focus:bg-gray-700 focus:border-purple-400"
                          : "bg-white/70 border-gray-200 text-gray-700 focus:bg-white focus:border-purple-500"
                      } border-2 rounded-2xl focus:outline-none transition-all duration-300 shadow-sm`}
                    />
                  </div>
                  {errors.DOB && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.DOB.message}
                    </p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
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
                      <FaEnvelope className="text-green-500" />
                    </div>
                    <input
                      {...register("Email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email format",
                        },
                      })}
                      type="email"
                      placeholder="Enter your email"
                      className={`w-full pl-12 pr-4 py-4 ${
                        darkmode
                          ? "bg-gray-700/70 border-gray-600 text-gray-200 placeholder-gray-400 focus:bg-gray-700 focus:border-green-400"
                          : "bg-white/70 border-gray-200 text-gray-700 placeholder-gray-500 focus:bg-white focus:border-green-500"
                      } border-2 rounded-2xl focus:outline-none transition-all duration-300 shadow-sm`}
                    />
                  </div>
                  {errors.Email && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.Email.message}
                    </p>
                  )}
                </motion.div>

                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <label
                    className={`block text-sm font-semibold ${
                      darkmode ? "text-gray-300" : "text-gray-700"
                    } mb-2`}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-red-500" />
                    </div>
                    <input
                      {...register("Password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                          message:
                            "Password must contain uppercase, lowercase, and number",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className={`w-full pl-12 pr-12 py-4 ${
                        darkmode
                          ? "bg-gray-700/70 border-gray-600 text-gray-200 placeholder-gray-400 focus:bg-gray-700 focus:border-red-400"
                          : "bg-white/70 border-gray-200 text-gray-700 placeholder-gray-500 focus:bg-white focus:border-red-500"
                      } border-2 rounded-2xl focus:outline-none transition-all duration-300 shadow-sm`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute inset-y-0 right-0 pr-4 flex items-center ${
                        darkmode
                          ? "text-gray-400 hover:text-red-400"
                          : "text-gray-500 hover:text-red-600"
                      } transition-colors duration-300`}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.Password && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.Password.message}
                    </p>
                  )}
                </motion.div>

                {/* Register Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full py-4 px-6 ${
                    darkmode
                      ? "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700"
                      : "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600"
                  } text-white rounded-2xl font-semibold text-lg transform transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2`}
                >
                  <span>Create Account</span>
                  <FaArrowRight className="text-sm" />
                </motion.button>
              </form>

              {/* Login Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-center mt-8"
              >
                <p
                  className={`${darkmode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Already have an account?{" "}
                  <Link
                    to="/SignIn"
                    className={`font-semibold ${
                      darkmode
                        ? "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-pink-400 hover:to-blue-400"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-pink-600 hover:to-blue-600"
                    } transition-all duration-300`}
                  >
                    Sign In
                  </Link>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
