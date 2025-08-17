import React, { useContext } from "react";
import { Outlet } from "react-router";
import Navber from "../Shared/Navber";
import Footer from "../Shared/Footer ";
import { Themecontext } from "../Context/ThemeContext";

const MainLayout = () => {
  const { darkmode } = useContext(Themecontext);

  return (
    <div
      className={`min-h-screen ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100"
          : "bg-gradient-to-br from-white via-gray-50 to-blue-50 text-gray-900"
      } transition-all duration-300`}
    >
      {/* Navigation */}
      <Navber />

      {/* Main Content */}
      <main
        className={`relative ${darkmode ? "bg-transparent" : "bg-transparent"}`}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
