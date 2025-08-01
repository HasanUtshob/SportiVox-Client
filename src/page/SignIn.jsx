import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Login from "../assets/Login.json";
import { Link, useLocation, useNavigate } from "react-router"; // fixed
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const SignIn = () => {
  const { SignInUser, setLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

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
        });
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* Left Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 py-10"
      >
        {/* Logo */}
        <Link
          to="/"
          className="absolute top-6 left-6 text-xl font-bold text-primary"
        >
          🌐 SportiVox
        </Link>

        {/* Card */}
        <div className="mt-40 md:mt-0 w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary text-center mb-4">
            Welcome Back 👋
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="label font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@mail.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="label justify-between font-medium text-gray-700">
                <span>Password</span>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot?
                </a>
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Login Button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="btn w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg hover:brightness-105"
              type="submit"
            >
              Sign In
            </motion.button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/Register"
              className="text-primary font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Right Side - Animation */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="hidden md:flex w-1/2 items-center justify-center bg-blue-100"
      >
        <Lottie
          animationData={Login}
          loop
          autoplay
          className="w-full max-w-lg"
        />
      </motion.div>
    </div>
  );
};

export default SignIn;
