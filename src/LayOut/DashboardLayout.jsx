// layouts/DashboardLayout.jsx
import React, { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router";
import DashboardSidebar from "../Dashboard/Page/DashboardSidebar";
import DashboardNavbar from "../Dashboard/Page/DashboardNavbar";
import useAuth from "../hooks/useAuth";
import Loading from "../Component/Loading";
import { Themecontext } from "../Context/ThemeContext";

const DashboardLayout = () => {
  const { darkmode } = useContext(Themecontext);
  const { userDataLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    // Prevent body scroll when sidebar is open on mobile
    if (typeof window !== "undefined") {
      document.body.style.overflow =
        sidebarOpen && window.innerWidth < 768 ? "hidden" : "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  useEffect(() => {
    // Simulate loading for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (userDataLoading || isLoading) {
    return <Loading message="Loading Dashboard..." variant="dashboard" />;
  }

  return (
    <div
      className={`flex h-screen ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-gray-50 to-gray-100"
      } overflow-hidden`}
    >
      {/* Sidebar */}
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Navigation */}
        <DashboardNavbar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Page Content */}
        <section
          className={`flex-1 overflow-y-auto relative ${
            darkmode ? "bg-gray-900/50" : "bg-white/30"
          } backdrop-blur-sm`}
        >
          <div className="min-h-full">
            {/* Content Container */}
            <div className="px-4 py-6 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                {/* Page Content with Animation */}
                <div className="animate-fadeIn">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll to Top Button */}
          <ScrollToTopButton darkmode={darkmode} />
        </section>
      </main>

      {/* Enhanced Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className={`fixed inset-0 ${
            darkmode ? "bg-black/70" : "bg-black/50"
          } backdrop-blur-sm z-40 md:hidden transition-all duration-300 animate-fadeIn`}
        />
      )}

      {/* Loading Overlay for Page Transitions */}
      <PageTransitionOverlay darkmode={darkmode} />
    </div>
  );
};

// Scroll to Top Button Component
const ScrollToTopButton = ({ darkmode }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = (e) => {
      setShowScrollTop(e.target.scrollTop > 300);
    };

    const scrollContainer = document.querySelector(
      'section[class*="overflow-y-auto"]'
    );
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.querySelector(
      'section[class*="overflow-y-auto"]'
    );
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!showScrollTop) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 w-12 h-12 ${
        darkmode
          ? "bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 shadow-gray-900/50"
          : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-gray-500/30"
      } text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-30 flex items-center justify-center`}
      aria-label="Scroll to top"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

// Page Transition Overlay Component
const PageTransitionOverlay = ({ darkmode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 300);
    };

    // Listen for route changes (this is a simplified version)
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  if (!isTransitioning) return null;

  return (
    <div
      className={`fixed inset-0 ${
        darkmode
          ? "bg-gradient-to-br from-gray-900/40 via-blue-900/40 to-purple-900/40"
          : "bg-gradient-to-br from-slate-900/20 via-purple-900/20 to-slate-900/20"
      } backdrop-blur-sm z-50 flex items-center justify-center`}
    >
      <div
        className={`w-8 h-8 border-4 ${
          darkmode
            ? "border-blue-400 border-t-transparent"
            : "border-blue-500 border-t-transparent"
        } rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default DashboardLayout;
