// layouts/DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import DashboardSidebar from "../Dashboard/Page/DashboardSidebar";
import DashboardNavbar from "../Dashboard/Page/DashboardNavbar";
import useAuth from "../hooks/useAuth";
import Loading from "../component/Loading";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardNavbar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        <section className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <Outlet /> {/* ✅ Show dashboard page content here */}
          </div>
        </section>
      </main>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </div>
  );
};

export default DashboardLayout;
