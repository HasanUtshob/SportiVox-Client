import React, { useState, useEffect, useContext } from "react";
import { motion, useInView } from "framer-motion";
import { Link, useNavigate } from "react-router";
import Banner from "../Component/Banner";
import About from "../Component/About";
import PromotionsSection from "../Component/PromotionsSection ";
import {
  FaStar,
  FaUsers,
  FaTrophy,
  FaCalendarAlt,
  FaPhone,
  FaInfoCircle,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Reviews from "./Reviews";
import { Themecontext } from "../Context/ThemeContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { darkmode } = useContext(Themecontext);
  const stats = [
    { icon: <FaUsers />, number: 500, suffix: "+", label: "Active Members" },
    { icon: <FaTrophy />, number: 50, suffix: "+", label: "Championships Won" },
    {
      icon: <FaCalendarAlt />,
      number: 25,
      suffix: "+",
      label: "Years of Excellence",
    },
    { icon: <FaStar />, number: 4.9, suffix: "", label: "Average Rating" },
  ];

  // Counter component for animated numbers
  const Counter = ({ target, suffix, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.3 });

    useEffect(() => {
      if (isInView && !hasAnimated) {
        setHasAnimated(true);
        let startTime;
        const animate = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);

          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentCount = target * easeOutQuart;

          if (target % 1 === 0) {
            setCount(Math.floor(currentCount));
          } else {
            setCount(Math.round(currentCount * 10) / 10);
          }

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(target);
          }
        };
        requestAnimationFrame(animate);
      }
    }, [isInView, target, duration, hasAnimated]);

    return (
      <span ref={ref}>
        {count}
        {suffix}
      </span>
    );
  };

  return (
    <div
      className={`min-h-screen ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
      }`}
    >
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 z-10"></div>
        <Banner />
      </section>

      {/* Stats Section */}
      <section
        className={`py-16 ${
          darkmode
            ? "bg-gradient-to-r from-gray-800 to-gray-900"
            : "bg-gradient-to-r from-blue-600 to-purple-600"
        } relative overflow-hidden`}
      >
        <div
          className={`absolute inset-0 ${
            darkmode ? "bg-black/20" : "bg-black/10"
          }`}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                darkmode ? "text-gray-100" : "text-white"
              } mb-4`}
            >
              Our Achievements
            </h2>
            <p
              className={`${
                darkmode ? "text-gray-300" : "text-blue-100"
              } text-lg max-w-2xl mx-auto`}
            >
              Celebrating excellence in sports and community building
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`text-center ${
                  darkmode
                    ? "bg-gray-700/20 border-gray-600/30 hover:bg-gray-600/30"
                    : "bg-white/10 border-white/20 hover:bg-white/20"
                } backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300`}
              >
                <div
                  className={`text-4xl ${
                    darkmode ? "text-blue-400" : "text-yellow-300"
                  } mb-3 flex justify-center`}
                >
                  {stat.icon}
                </div>
                <div
                  className={`text-3xl md:text-4xl font-bold ${
                    darkmode ? "text-gray-100" : "text-white"
                  } mb-2`}
                >
                  <Counter
                    target={stat.number}
                    suffix={stat.suffix}
                    duration={2000 + index * 200}
                  />
                </div>
                <div
                  className={`${
                    darkmode ? "text-gray-300" : "text-blue-100"
                  } text-sm md:text-base font-medium`}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Enhanced Styling */}
      <section
        className={`relative py-16 ${
          darkmode
            ? "bg-gradient-to-br from-gray-900 to-gray-800"
            : "bg-gradient-to-br from-white to-blue-50"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            darkmode
              ? "bg-gradient-to-r from-transparent via-gray-700/20 to-transparent"
              : "bg-gradient-to-r from-transparent via-blue-100/30 to-transparent"
          }`}
        ></div>
        <div className="relative z-10">
          <About />
        </div>
      </section>

      {/* Promotions Section with Enhanced Background */}
      <section
        className={`relative py-16 ${
          darkmode
            ? "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900"
            : "bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            darkmode
              ? "bg-gradient-to-r from-gray-600/10 via-gray-500/10 to-gray-600/10"
              : "bg-gradient-to-r from-purple-100/20 via-pink-100/20 to-orange-100/20"
          }`}
        ></div>
        <div className="relative z-10">
          <PromotionsSection />
        </div>
      </section>

      {/* Reviews Section */}

      <section>
        <Reviews></Reviews>
      </section>
      {/* Call to Action Section */}
      <section
        className={`py-20 ${
          darkmode
            ? "bg-gradient-to-r from-gray-900 via-gray-800 to-black"
            : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
        } relative overflow-hidden`}
      >
        <div
          className={`absolute inset-0 ${
            darkmode ? "bg-black/40" : "bg-black/20"
          }`}
        ></div>
        <div
          className={`absolute inset-0 ${
            darkmode
              ? "bg-gradient-to-r from-gray-800/30 to-gray-900/30"
              : "bg-gradient-to-r from-blue-600/30 to-purple-600/30"
          }`}
        ></div>

        {/* Animated Background Elements */}
        <div
          className={`absolute top-10 left-10 w-20 h-20 ${
            darkmode ? "bg-gray-600/20" : "bg-white/10"
          } rounded-full animate-pulse`}
        ></div>
        <div
          className={`absolute bottom-10 right-10 w-32 h-32 ${
            darkmode ? "bg-blue-400/20" : "bg-yellow-300/20"
          } rounded-full animate-bounce`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/4 w-16 h-16 ${
            darkmode ? "bg-gray-500/20" : "bg-pink-300/20"
          } rounded-full animate-ping`}
        ></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className={`text-4xl md:text-6xl font-bold ${
                darkmode ? "text-gray-100" : "text-white"
              } mb-6 ${
                darkmode
                  ? ""
                  : "bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent"
              }`}
            >
              Ready to Join Us?
            </h2>
            <p
              className={`text-xl md:text-2xl ${
                darkmode ? "text-gray-300" : "text-blue-100"
              } mb-8 max-w-3xl mx-auto leading-relaxed`}
            >
              Experience the thrill of sports, build lasting friendships, and
              achieve your fitness goals with SportivoX
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (user) {
                    navigate("/Courts");
                  } else {
                    navigate("/SignIn");
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-full text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2 group"
              >
                <FaStar className="group-hover:animate-spin" />
                <span>{user ? "Book a Court Now" : "Sign In to Book"}</span>
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col sm:flex-row gap-2"
              >
                <Link
                  to="/About"
                  className={`px-6 py-3 ${
                    darkmode
                      ? "bg-gray-700/30 border-gray-500/30 hover:bg-gray-600/40 text-gray-200"
                      : "bg-white/20 border-white/30 hover:bg-white/30 text-white"
                  } backdrop-blur-sm font-bold rounded-full text-lg border-2 transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2 group`}
                >
                  <FaInfoCircle className="group-hover:animate-pulse" />
                  <span>Learn More</span>
                </Link>

                <Link
                  to="/Contact"
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2 group"
                >
                  <FaPhone className="group-hover:animate-bounce" />
                  <span>Contact Us</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Action Elements */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className={`${
            darkmode
              ? "bg-gradient-to-r from-gray-700 to-gray-800 hover:shadow-gray-500/25"
              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-blue-500/25"
          } text-white p-4 rounded-full shadow-2xl cursor-pointer transition-all duration-300`}
        >
          <FaStar className="text-2xl animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
