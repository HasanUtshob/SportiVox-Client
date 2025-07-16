import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Login from "../assets/Login.json";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const SignIn = () => {
  const { SignInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(from);
    // SignIn User

    SignInUser(email, password)
      .then((result) => {
        if (location.state?.court) {
          // If user came from Book Now
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
          title: "Sign In Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden relative bg-white">
      {/* Vertical Divider */}
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-[3px] bg-gradient-to-b from-primary via-secondary to-accent z-10 rounded-full" />

      {/* Left Side - Logo + Form */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 flex flex-col items-center justify-center px-4 sm:px-8 py-8 md:py-16 z-20 relative"
      >
        {/* Logo - centered on small, fixed top-left on md+ */}
        <div className="w-full text-center mb-6 md:mb-0 md:absolute md:top-6 md:left-6 md:text-left">
          <Link to="/">
            <h1 className="text-2xl font-bold text-primary">🌐 SportiVox</h1>
          </Link>
        </div>

        {/* Login Box */}
        <div className="w-full max-w-md bg-white p-6 sm:p-10  rounded-2xl shadow-xl border border-gray-200">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">
              Welcome Back 👋
              {}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Please login to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 12H8m0 0l4-4m0 8l-4-4m12-6H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2z" />
                </svg>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  name="email"
                  className="grow"
                  required
                />
              </label>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
                <a
                  href="#"
                  className="label-text-alt text-primary link-hover text-sm"
                >
                  Forgot?
                </a>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2zm6-4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <input
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  className="grow"
                  required
                />
              </label>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="btn w-full bg-gradient-to-r from-primary to-secondary text-white text-lg hover:brightness-110"
              >
                Login
              </motion.button>
            </div>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/Register"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Right Side - Lottie Animation */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="hidden md:flex w-1/2 items-center justify-center bg-base-200 z-20"
      >
        <Lottie
          animationData={Login}
          loop
          autoplay
          className="w-full max-w-lg px-4"
        />
      </motion.div>
    </div>
  );
};

export default SignIn;
