import React from "react";
import { Link, useLocation, useNavigate } from "react-router"; // ✅ Fixed
import Regist from "../assets/register.json";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const { CreateUser, setLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

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

        const save = await axios.post(
          "https://sportivo-x-server.vercel.app/Users",
          userInfo
        );

        if (save.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Account Created!",
            showConfirmButton: false,
            timer: 1500,
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
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center justify-center px-4">
      {/* 🔰 Brand Logo */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-3xl font-bold text-primary"
      >
        🏀 SportiVox
      </Link>

      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 py-12">
        {/* 👤 Form Section */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Profile Photo */}
            <div>
              <label className="label font-semibold">Profile Photo</label>
              <input
                {...register("Photo", { required: "Photo is required" })}
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
              />
              {errors.Photo && (
                <p className="text-sm text-red-500">{errors.Photo.message}</p>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="label font-semibold">Full Name</label>
              <input
                {...register("FullName", { required: "Name is required" })}
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full"
              />
              {errors.FullName && (
                <p className="text-sm text-red-500">
                  {errors.FullName.message}
                </p>
              )}
            </div>

            {/* DOB */}
            <div>
              <label className="label font-semibold">Date of Birth</label>
              <input
                {...register("DOB", { required: "DOB is required" })}
                type="date"
                className="input input-bordered w-full"
              />
              {errors.DOB && (
                <p className="text-sm text-red-500">{errors.DOB.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label font-semibold">Email</label>
              <input
                {...register("Email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
              />
              {errors.Email && (
                <p className="text-sm text-red-500">{errors.Email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label font-semibold">Password</label>
              <input
                {...register("Password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                    message: "At least 1 uppercase, 1 lowercase, 1 number",
                  },
                })}
                type="password"
                placeholder="********"
                className="input input-bordered w-full"
              />
              {errors.Password && (
                <p className="text-sm text-red-500">
                  {errors.Password.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full mt-4">
              Register
            </button>
          </form>
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/SignIn" className="link link-primary">
              Login
            </Link>
          </p>
        </div>

        {/* 🎬 Animation */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Lottie animationData={Regist} loop autoplay className="w-96 h-96" />
        </div>
      </div>
    </div>
  );
};

export default Register;
