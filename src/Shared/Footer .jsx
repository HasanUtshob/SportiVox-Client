import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaStar,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";
import logo from "../assets/Images/logo.png";
import { Themecontext } from "../Context/ThemeContext";

const Footer = () => {
  const { darkmode } = useContext(Themecontext);
  const socialLinks = [
    {
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/Shahriahasanutshob/",
      color: "hover:bg-blue-600",
      label: "Facebook",
    },
    {
      icon: <FaInstagram />,
      href: "https://instagram.com/ShahriarUtshob",
      color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
      label: "Instagram",
    },
    {
      icon: <FaTwitter />,
      href: "https://X.com/shuthob",
      color: "hover:bg-sky-500",
      label: "Twitter",
    },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Courts", path: "/Courts" },
    { name: "Contact", path: "/Contact" },
    { name: "Dashboard", path: "/Dashboard" },
    { name: "Demo Tutorial", path: "/demo" },
  ];

  const stats = [
    { icon: <FaUsers />, value: "500+", label: "Members" },
    { icon: <FaTrophy />, value: "50+", label: "Awards" },
    { icon: <FaStar />, value: "4.9", label: "Rating" },
  ];

  return (
    <footer
      className={`relative ${
        darkmode
          ? "bg-gradient-to-br from-black via-gray-900 to-gray-800"
          : "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
      } text-white overflow-hidden`}
    >
      {/* Background Decorations */}
      <div
        className={`absolute inset-0 ${
          darkmode
            ? "bg-gradient-to-r from-gray-700/10 to-gray-600/10"
            : "bg-gradient-to-r from-blue-600/10 to-purple-600/10"
        }`}
      ></div>
      <div
        className={`absolute top-0 left-0 w-64 h-64 ${
          darkmode
            ? "bg-gradient-to-br from-gray-600/20 to-transparent"
            : "bg-gradient-to-br from-blue-500/20 to-transparent"
        } rounded-full -translate-x-32 -translate-y-32`}
      ></div>
      <div
        className={`absolute bottom-0 right-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-tl from-gray-600/20 to-transparent"
            : "bg-gradient-to-tl from-purple-500/20 to-transparent"
        } rounded-full translate-x-48 translate-y-48`}
      ></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <img
                    src={logo}
                    alt="SportivoX Logo"
                    className="w-12 h-12 rounded-full shadow-lg"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SportivoX
                </span>
              </div>

              <p
                className={`${
                  darkmode ? "text-gray-400" : "text-gray-300"
                } leading-relaxed mb-6`}
              >
                Your premier destination for sports excellence. Join our
                community of champions and elevate your game to new heights.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`text-center p-3 ${
                      darkmode
                        ? "bg-gray-700/30 border-gray-600/30"
                        : "bg-white/10 border-white/20"
                    } backdrop-blur-sm rounded-xl border`}
                  >
                    <div className="text-yellow-400 text-xl mb-1">
                      {stat.icon}
                    </div>
                    <div className="font-bold text-white">{stat.value}</div>
                    <div
                      className={`text-xs ${
                        darkmode ? "text-gray-400" : "text-gray-300"
                      }`}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3
                className={`text-xl font-bold mb-6 ${
                  darkmode
                    ? "bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                }`}
              >
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={link.path}
                      className={`${
                        darkmode
                          ? "text-gray-400 hover:text-gray-200"
                          : "text-gray-300 hover:text-white"
                      } transition-colors duration-300 flex items-center group`}
                    >
                      <span
                        className={`w-2 h-2 ${
                          darkmode
                            ? "bg-gradient-to-r from-gray-400 to-gray-300"
                            : "bg-gradient-to-r from-blue-400 to-purple-400"
                        } rounded-full mr-3 group-hover:scale-125 transition-transform duration-300`}
                      ></span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3
                className={`text-xl font-bold mb-6 ${
                  darkmode
                    ? "bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                }`}
              >
                Contact Us
              </h3>
              <div className="space-y-4">
                <div
                  className={`flex items-center space-x-3 ${
                    darkmode ? "text-gray-400" : "text-gray-300"
                  }`}
                >
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <FaPhoneAlt className="text-blue-400" />
                  </div>
                  <span>+880 1601949074</span>
                </div>
                <div
                  className={`flex items-center space-x-3 ${
                    darkmode ? "text-gray-400" : "text-gray-300"
                  }`}
                >
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <FaEnvelope className="text-purple-400" />
                  </div>
                  <span>shutshob@gmail.com</span>
                </div>
                <div
                  className={`flex items-start space-x-3 ${
                    darkmode ? "text-gray-400" : "text-gray-300"
                  }`}
                >
                  <div className="p-2 bg-pink-500/20 rounded-lg mt-1">
                    <FaMapMarkerAlt className="text-pink-400" />
                  </div>
                  <span>
                    123 Club Street, Mirpur DOHS,
                    <br />
                    Dhaka 1216, Bangladesh
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Social Media & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3
                className={`text-xl font-bold mb-6 ${
                  darkmode
                    ? "bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                }`}
              >
                Follow Us
              </h3>

              {/* Social Links */}
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 ${
                      darkmode
                        ? "bg-gray-700/30 border-gray-600/30"
                        : "bg-white/10 border-white/20"
                    } backdrop-blur-sm rounded-xl border text-white hover:text-white transition-all duration-300 ${
                      social.color
                    }`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              {/* Newsletter */}
              <div
                className={`lg:w-[320px] ${
                  darkmode
                    ? "bg-gray-700/30 border-gray-600/30"
                    : "bg-white/10 border-white/20"
                } backdrop-blur-sm rounded-2xl p-4 border`}
              >
                <h4 className="font-semibold mb-3 text-white">Stay Updated</h4>
                <p
                  className={`text-sm ${
                    darkmode ? "text-gray-400" : "text-gray-300"
                  } mb-4`}
                >
                  Get the latest news and updates from SportivoX
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`flex-1 px-3 py-2 ${
                      darkmode
                        ? "bg-gray-600/30 border-gray-500/30 placeholder-gray-400"
                        : "bg-white/20 border-white/30 placeholder-gray-300"
                    } border rounded-l-lg text-white focus:outline-none focus:border-blue-400`}
                  />
                  <button className="w-20 sm:w-24 md:w-28 lg:w-25 px-2 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium whitespace-nowrap text-sm">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`border-t ${
            darkmode
              ? "border-gray-700/50 bg-black/40"
              : "border-white/20 bg-black/20"
          } backdrop-blur-sm`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div
                className={`${
                  darkmode ? "text-gray-400" : "text-gray-300"
                } text-sm flex items-center`}
              >
                © {new Date().getFullYear()} SportivoX Sports Club. Made with
                <FaHeart className="text-red-400 mx-1 animate-pulse" />
                for sports enthusiasts.
              </div>
              <div
                className={`flex space-x-6 text-sm ${
                  darkmode ? "text-gray-400" : "text-gray-300"
                }`}
              >
                <Link
                  to="/Privacy"
                  className={`${
                    darkmode ? "hover:text-gray-200" : "hover:text-white"
                  } transition-colors duration-300`}
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/Terms"
                  className={`${
                    darkmode ? "hover:text-gray-200" : "hover:text-white"
                  } transition-colors duration-300`}
                >
                  Terms of Service
                </Link>
                <Link
                  to="/Support"
                  className={`${
                    darkmode ? "hover:text-gray-200" : "hover:text-white"
                  } transition-colors duration-300`}
                >
                  Support
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
