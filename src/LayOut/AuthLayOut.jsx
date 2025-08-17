import React, { useContext } from "react";
import { Outlet } from "react-router";
import { Themecontext } from "../Context/ThemeContext";

const AuthLayOut = () => {
  const { darkmode } = useContext(Themecontext);

  return (
    <div
      className={`min-h-screen ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      } relative overflow-hidden`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Sports Equipment Background */}
        <div
          className={`absolute top-10 left-10 text-6xl ${
            darkmode ? "text-blue-800/10" : "text-blue-200/30"
          } animate-pulse`}
        >
          🏸
        </div>

        <div
          className={`absolute top-20 right-20 text-5xl ${
            darkmode ? "text-purple-800/10" : "text-purple-200/30"
          } animate-bounce`}
        >
          ⚽
        </div>

        <div
          className={`absolute bottom-20 left-20 text-4xl ${
            darkmode ? "text-pink-800/10" : "text-pink-200/30"
          } animate-pulse`}
        >
          🏀
        </div>

        <div
          className={`absolute bottom-16 right-16 text-5xl ${
            darkmode ? "text-green-800/10" : "text-green-200/30"
          } animate-bounce`}
        >
          🎾
        </div>

        {/* Geometric Shapes */}
        <div
          className={`absolute top-1/4 left-1/4 w-32 h-32 ${
            darkmode ? "bg-blue-900/10" : "bg-blue-200/20"
          } rounded-full animate-pulse`}
        ></div>

        <div
          className={`absolute top-3/4 right-1/4 w-24 h-24 ${
            darkmode ? "bg-purple-900/10" : "bg-purple-200/20"
          } rounded-full animate-bounce`}
        ></div>

        <div
          className={`absolute top-1/2 left-1/6 w-20 h-20 ${
            darkmode ? "bg-pink-900/10" : "bg-pink-200/20"
          } rounded-full animate-pulse`}
        ></div>

        {/* Gradient Orbs */}
        <div
          className={`absolute top-0 right-0 w-96 h-96 ${
            darkmode
              ? "bg-gradient-to-br from-blue-900/20 to-purple-900/20"
              : "bg-gradient-to-br from-blue-300/30 to-purple-300/30"
          } rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2`}
        ></div>

        <div
          className={`absolute bottom-0 left-0 w-80 h-80 ${
            darkmode
              ? "bg-gradient-to-tr from-purple-900/20 to-pink-900/20"
              : "bg-gradient-to-tr from-purple-300/30 to-pink-300/30"
          } rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2`}
        ></div>
      </div>

      {/* Main Authentication Content - Let child components handle their own styling */}
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayOut;
