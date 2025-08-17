import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  FaBullseye,
  FaDirections,
  FaEye,
  FaHistory,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Themecontext } from "../Context/ThemeContext";

const About = () => {
  const { darkmode } = useContext(Themecontext);
  const sections = [
    {
      icon: <FaHistory className="text-4xl text-primary" />,
      title: "History",
      description:
        "Established in 1998, our club has evolved into a vibrant hub of athletic excellence. From humble beginnings, we've hosted national and international events that shaped our legacy.",
    },
    {
      icon: <FaBullseye className="text-4xl text-primary" />,
      title: "Mission",
      description:
        "We aim to empower youth through sport, promote health, and cultivate a spirit of teamwork and discipline in a welcoming and inclusive environment.",
    },
    {
      icon: <FaEye className="text-4xl text-primary" />,
      title: "Vision",
      description:
        "To become a leading platform for aspiring athletes, encouraging them to thrive on both national and global stages through opportunity and mentorship.",
    },
  ];

  const address = {
    line1: "SportiVox Sports Club",
    line2: "123 Club Street, Mirpur DOHS",
    city: "Dhaka 1216, Bangladesh",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.532825499708!2d90.35346201543541!3d23.83145349154742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c10bdb9f413d%3A0x60d5aee4c2a4b132!2sMirpur%20DOHS%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1627123456789",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=SportiVox+Sports+Club,+Mirpur+DOHS,+Dhaka",
  };

  return (
    <>
      {/* About */}
      <section className="w-11/12 md:w-10/12 mx-auto my-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            About SportivoX
          </h2>
          <p
            className={`text-center ${
              darkmode ? "text-gray-300" : "text-gray-600"
            } max-w-3xl mx-auto text-lg md:text-xl leading-relaxed`}
          >
            Discover our journey, guiding principles, and future ambitions that
            fuel our passion for sports and community excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className={`group ${
                darkmode
                  ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 hover:border-gray-500 hover:shadow-2xl hover:shadow-gray-500/10"
                  : "bg-gradient-to-br from-white to-blue-50 border-blue-100 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10"
              } rounded-3xl shadow-xl p-8 space-y-6 border transition-all duration-500 transform hover:-translate-y-2`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white shadow-lg">
                  {section.icon}
                </div>
              </div>
              <h3
                className={`text-xl md:text-2xl font-bold text-center ${
                  darkmode
                    ? "bg-gradient-to-r from-gray-200 to-gray-100 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                }`}
              >
                {section.title}
              </h3>
              <p
                className={`${
                  darkmode ? "text-gray-300" : "text-gray-600"
                } text-center leading-relaxed text-sm md:text-base`}
              >
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enhanced Location Section */}
      <section className="w-11/12 md:w-10/12 mx-auto my-20 relative">
        {/* Background Elements */}
        <div
          className={`absolute inset-0 ${
            darkmode
              ? "bg-gradient-to-br from-gray-800/30 via-gray-700/30 to-gray-900/30"
              : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
          } rounded-3xl opacity-30 -z-10`}
        ></div>
        <div
          className={`absolute top-10 right-10 w-32 h-32 ${
            darkmode
              ? "bg-gradient-to-br from-gray-600/20 to-gray-700/20"
              : "bg-gradient-to-br from-blue-400/20 to-purple-400/20"
          } rounded-full blur-2xl`}
        ></div>
        <div
          className={`absolute bottom-10 left-10 w-24 h-24 ${
            darkmode
              ? "bg-gradient-to-br from-gray-500/20 to-gray-600/20"
              : "bg-gradient-to-br from-pink-400/20 to-blue-400/20"
          } rounded-full blur-xl`}
        ></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative z-10"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <FaMapMarkerAlt className="text-3xl text-white" />
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Find Us Here
          </h2>
          <p
            className={`text-center ${
              darkmode ? "text-gray-300" : "text-gray-600"
            } max-w-2xl mx-auto text-lg md:text-xl leading-relaxed`}
          >
            Located in the heart of Dhaka, our state-of-the-art sports facility
            is easily accessible and ready to welcome you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch relative z-10">
          {/* Enhanced Address Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group"
          >
            <div
              className={`${
                darkmode
                  ? "bg-gray-800/80 border-gray-600/20 hover:shadow-3xl"
                  : "bg-white/80 border-white/20 hover:shadow-3xl"
              } backdrop-blur-sm shadow-2xl rounded-3xl p-8 space-y-6 border transition-all duration-500 transform hover:-translate-y-2 h-full`}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <FaMapMarkerAlt className="text-2xl text-white" />
                </div>
                <div>
                  <h3
                    className={`text-2xl font-bold ${
                      darkmode
                        ? "bg-gradient-to-r from-gray-200 to-gray-100 bg-clip-text text-transparent"
                        : "bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                    }`}
                  >
                    Our Address
                  </h3>
                  <p
                    className={`${
                      darkmode ? "text-gray-400" : "text-gray-500"
                    } text-sm`}
                  >
                    Visit us anytime
                  </p>
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-4">
                <div
                  className={`flex items-start gap-3 p-4 ${
                    darkmode
                      ? "bg-gradient-to-r from-gray-700 to-gray-600 border-gray-600"
                      : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100"
                  } rounded-xl border`}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p
                      className={`font-semibold ${
                        darkmode ? "text-gray-200" : "text-gray-800"
                      } text-lg`}
                    >
                      {address.line1}
                    </p>
                    <p
                      className={`${
                        darkmode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {address.line2}
                    </p>
                    <p
                      className={`${
                        darkmode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {address.city}
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className={`flex items-center gap-3 p-3 ${
                      darkmode
                        ? "bg-green-900/30 border-green-700/50"
                        : "bg-green-50 border-green-100"
                    } rounded-xl border`}
                  >
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <p
                        className={`text-sm ${
                          darkmode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Status
                      </p>
                      <p
                        className={`font-semibold ${
                          darkmode ? "text-green-400" : "text-green-600"
                        }`}
                      >
                        Open Now
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-3 p-3 ${
                      darkmode
                        ? "bg-orange-900/30 border-orange-700/50"
                        : "bg-orange-50 border-orange-100"
                    } rounded-xl border`}
                  >
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div>
                      <p
                        className={`text-sm ${
                          darkmode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Hours
                      </p>
                      <p
                        className={`font-semibold ${
                          darkmode ? "text-orange-400" : "text-orange-600"
                        }`}
                      >
                        6AM - 10PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href={address.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <FaDirections className="text-lg" />
                  Get Directions
                </a>
                <a
                  href="tel:+8801601949074"
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-black-600 text-white font-semibold px-6 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
                >
                  <svg
                    className="w-5 h-5 group-hover:animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>Call Us Now</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group h-full"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 h-full min-h-[400px]">
              {/* Map Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none"></div>

              {/* Map Badge */}
              <div
                className={`absolute top-4 left-4 z-20 ${
                  darkmode ? "bg-gray-800/90" : "bg-white/90"
                } backdrop-blur-sm px-4 py-2 rounded-full shadow-lg`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span
                    className={`text-sm font-semibold ${
                      darkmode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Live Location
                  </span>
                </div>
              </div>

              {/* Interactive Map */}
              <iframe
                src={address.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="w-full h-full min-h-[400px] transition-all duration-300 group-hover:scale-105"
                title="SportiVox Location Map"
              ></iframe>

              {/* Map Footer */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-20">
                <div className="text-white">
                  <p className="font-semibold text-lg">SportiVox Sports Club</p>
                  <p className="text-white/80 text-sm">Mirpur DOHS, Dhaka</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 relative z-10"
        >
          <div
            className={`${
              darkmode
                ? "bg-gray-800/80 border-gray-600/20"
                : "bg-white/80 border-white/20"
            } backdrop-blur-sm rounded-2xl p-6 shadow-lg border text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h4
              className={`font-bold ${
                darkmode ? "text-gray-200" : "text-gray-800"
              } mb-2`}
            >
              Easy Access
            </h4>
            <p
              className={`${
                darkmode ? "text-gray-300" : "text-gray-600"
              } text-sm`}
            >
              Located near major transport hubs with ample parking space
            </p>
          </div>

          <div
            className={`${
              darkmode
                ? "bg-gray-800/80 border-gray-600/20"
                : "bg-white/80 border-white/20"
            } backdrop-blur-sm rounded-2xl p-6 shadow-lg border text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4
              className={`font-bold ${
                darkmode ? "text-gray-200" : "text-gray-800"
              } mb-2`}
            >
              Safe Environment
            </h4>
            <p
              className={`${
                darkmode ? "text-gray-300" : "text-gray-600"
              } text-sm`}
            >
              24/7 security with CCTV monitoring for your safety
            </p>
          </div>

          <div
            className={`${
              darkmode
                ? "bg-gray-800/80 border-gray-600/20"
                : "bg-white/80 border-white/20"
            } backdrop-blur-sm rounded-2xl p-6 shadow-lg border text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h4
              className={`font-bold ${
                darkmode ? "text-gray-200" : "text-gray-800"
              } mb-2`}
            >
              Flexible Hours
            </h4>
            <p
              className={`${
                darkmode ? "text-gray-300" : "text-gray-600"
              } text-sm`}
            >
              Open daily from 6AM to 10PM to fit your schedule
            </p>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default About;
