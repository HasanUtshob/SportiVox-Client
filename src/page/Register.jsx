import React from "react";
import { Link } from "react-router"; // fixed import
import Regist from "../assets/register.json";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Register = () => {
  const { CreateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const imgbbApiKey = "35d533c9830c979166daa6d60911d270";
  const onSubmit = async (data) => {
    const Image = data.Photo[0];
    const formdata = new FormData();
    formdata.append("image", Image);

    try {
      // 🔵 Upload to imgbb
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formdata
      );

      if (res.data.success) {
        const PhotoUrl = res.data.data.url;

        const userInfo = {
          name: data.FullName,
          dob: data.DOB,
          email: data.Email,
          password: data.Password,
          photo: PhotoUrl,
          role: "user",
        };

        // 🟢 Firebase Register
        const SignUp = await CreateUser(userInfo.email, userInfo.password);
        console.log("Firebase User Created:", SignUp.user);

        // 🟢 Update Firebase Profile
        await updateProfile(SignUp.user, {
          displayName: userInfo.name,
          photoURL: userInfo.photo,
        });

        // 🟢 Save to your own DB
        const result = await axios.post(
          "http://localhost:5000/Users",
          userInfo
        );
        console.log("Saved to DB:", result.data);
        if (result.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Account Create Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (err) {
      console.error("Registration Failed:", err.message);
      // toast.error("Something went wrong!");
    }
  };
  return (
    <div className="min-h-screen w-full bg-base-200 relative overflow-hidden">
      {/* 🔵 Logo Top-Left (fixed) */}
      <Link to="/">
        <div className="absolute top-4 left-4 z-50">
          <h1 className="text-2xl font-bold text-primary">🏀 SportiVox</h1>
        </div>
      </Link>

      {/* 🔴 Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center h-screen px-4 pt-20 md:pt-20 overflow-hidden">
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 flex justify-center h-full items-center">
          <div className="card w-full max-w-md shadow-xl bg-base-100 p-6 md:p-8">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Create an Account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <fieldset className="border border-gray-300 p-4 rounded-md">
                <legend className="text-lg font-semibold text-primary">
                  Registration Info
                </legend>
                {/* Full Name */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium">
                      Profile Photo
                    </span>
                  </label>
                  <input
                    {...register("Photo", {
                      required: "Profile Photo is required",
                    })}
                    type="file"
                    accept="image/*"
                    className="file-input file-input-primary file-input-bordered w-full"
                  />
                  {errors.Photo && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Photo.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  <input
                    {...register("FullName", {
                      required: "Full Name is required",
                    })}
                    type="text"
                    placeholder="Your full name"
                    className="input input-bordered w-full"
                  />
                  {errors.FullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.FullName.message}
                    </p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium">
                      Date of Birth
                    </span>
                  </label>
                  <input
                    {...register("DOB", {
                      required: "Date of Birth is required",
                    })}
                    type="date"
                    className="input input-bordered w-full"
                  />
                  {errors.DOB && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.DOB.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <input
                    {...register("Email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder="you@example.com"
                    className="input input-bordered w-full"
                  />
                  {errors.Email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
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
                          "Password must include uppercase, lowercase, number & 6+ chars",
                      },
                    })}
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full"
                  />
                  {errors.Password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Password.message}
                    </p>
                  )}
                </div>
              </fieldset>

              <button className="btn btn-primary w-full mt-4">Register</button>
            </form>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/SignIn" className="link link-primary">
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Lottie Animation */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center items-center h-full">
          <Lottie
            animationData={Regist}
            loop
            autoplay
            style={{ width: "400px", height: "400px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
