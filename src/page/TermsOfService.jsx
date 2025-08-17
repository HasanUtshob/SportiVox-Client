import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  FaFileContract,
  FaUserCheck,
  FaCreditCard,
  FaExclamationTriangle,
  FaGavel,
  FaHandshake,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { Themecontext } from "../Context/ThemeContext";

const TermsOfService = () => {
  const { darkmode } = useContext(Themecontext);
  const sections = [
    {
      icon: <FaUserCheck />,
      title: "Account Registration",
      content: [
        "You must be at least 18 years old to create an account",
        "Provide accurate and complete information during registration",
        "Maintain the security of your account credentials",
        "You are responsible for all activities under your account",
        "Notify us immediately of any unauthorized account access",
      ],
    },
    {
      icon: <FaHandshake />,
      title: "Facility Usage",
      content: [
        "Follow all facility rules and safety guidelines",
        "Respect other members and staff at all times",
        "Use equipment properly and report any damage immediately",
        "Appropriate sports attire is required at all times",
        "No outside food or beverages without prior approval",
      ],
    },
    {
      icon: <FaCreditCard />,
      title: "Booking and Payments",
      content: [
        "All bookings must be paid in advance",
        "Cancellations must be made at least 24 hours in advance",
        "Late cancellations may incur a cancellation fee",
        "Refunds are processed according to our refund policy",
        "Payment disputes must be reported within 30 days",
      ],
    },
    {
      icon: <FaExclamationTriangle />,
      title: "Prohibited Activities",
      content: [
        "No illegal activities or substances on the premises",
        "Harassment or discrimination of any kind is not tolerated",
        "No unauthorized commercial activities or solicitation",
        "Damaging facility property will result in charges",
        "Violation of rules may result in membership termination",
      ],
    },
    {
      icon: <FaGavel />,
      title: "Liability and Insurance",
      content: [
        "Participate in activities at your own risk",
        "SportivoX is not liable for personal injuries during activities",
        "Members are responsible for their personal belongings",
        "We recommend maintaining personal health and accident insurance",
        "Report all incidents to facility staff immediately",
      ],
    },
    {
      icon: <FaFileContract />,
      title: "Intellectual Property",
      content: [
        "All content on our platform is protected by copyright",
        "You may not reproduce or distribute our content without permission",
        "User-generated content remains your property but grants us usage rights",
        "Respect third-party intellectual property rights",
        "Report any copyright infringement to our legal team",
      ],
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"
      }`}
    >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative py-20 ${
          darkmode
            ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900"
            : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
        } text-white overflow-hidden`}
      >
        <div
          className={`absolute inset-0 ${
            darkmode ? "bg-black/40" : "bg-black/20"
          }`}
        ></div>
        <div
          className={`absolute top-0 left-0 w-64 h-64 ${
            darkmode ? "bg-gray-600/20" : "bg-white/10"
          } rounded-full -translate-x-32 -translate-y-32`}
        ></div>
        <div
          className={`absolute bottom-0 right-0 w-96 h-96 ${
            darkmode ? "bg-gray-600/20" : "bg-white/10"
          } rounded-full translate-x-48 translate-y-48`}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`inline-flex items-center justify-center w-20 h-20 ${
              darkmode ? "bg-gray-600/30" : "bg-white/20"
            } rounded-full mb-6`}
          >
            <FaFileContract className="text-4xl" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`text-xl md:text-2xl ${
              darkmode ? "text-gray-300" : "text-blue-100"
            } max-w-3xl mx-auto`}
          >
            Please read these terms carefully before using our sports facility
            and services.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className={`mt-8 ${darkmode ? "text-gray-400" : "text-blue-200"}`}
          >
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`${
              darkmode ? "bg-gray-800 shadow-2xl" : "bg-white shadow-xl"
            } rounded-3xl p-8 mb-12`}
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Agreement to Terms
            </h2>
            <p
              className={`${
                darkmode ? "text-gray-300" : "text-gray-600"
              } text-lg leading-relaxed mb-4`}
            >
              Welcome to SportivoX! These Terms of Service ("Terms") govern your
              use of our sports facility, booking platform, and related
              services. By accessing or using our services, you agree to be
              bound by these Terms and our Privacy Policy.
            </p>
            <p
              className={`${
                darkmode ? "text-gray-300" : "text-gray-600"
              } text-lg leading-relaxed`}
            >
              If you do not agree with any part of these terms, you may not
              access or use our services. We reserve the right to update these
              Terms at any time, and your continued use of our services
              constitutes acceptance of any changes.
            </p>
          </motion.div>

          {/* Terms Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                className={`${
                  darkmode
                    ? "bg-gray-800 shadow-2xl hover:shadow-gray-900/50"
                    : "bg-white shadow-xl hover:shadow-2xl"
                } rounded-3xl p-8 transition-all duration-300`}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white mr-4">
                    {section.icon}
                  </div>
                  <h3
                    className={`text-2xl font-bold ${
                      darkmode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span
                        className={`${
                          darkmode ? "text-gray-300" : "text-gray-600"
                        } leading-relaxed`}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Termination Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className={`${
              darkmode
                ? "bg-red-900/30 border border-red-700/50"
                : "bg-red-50 border border-red-200"
            } rounded-3xl p-8 mt-12`}
          >
            <h3
              className={`text-2xl font-bold ${
                darkmode ? "text-red-300" : "text-red-800"
              } mb-4`}
            >
              Termination
            </h3>
            <p
              className={`${
                darkmode ? "text-red-200" : "text-red-700"
              } leading-relaxed mb-4`}
            >
              We reserve the right to terminate or suspend your account and
              access to our services immediately, without prior notice or
              liability, for any reason, including but not limited to:
            </p>
            <ul
              className={`space-y-2 ${
                darkmode ? "text-red-200" : "text-red-700"
              }`}
            >
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Breach of these Terms of Service</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Violation of facility rules or safety guidelines</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Fraudulent or illegal activities</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Harassment of other members or staff</span>
              </li>
            </ul>
          </motion.div>

          {/* Governing Law */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className={`${
              darkmode
                ? "bg-blue-900/30 border border-blue-700/50"
                : "bg-blue-50 border border-blue-200"
            } rounded-3xl p-8 mt-8`}
          >
            <h3
              className={`text-2xl font-bold ${
                darkmode ? "text-blue-300" : "text-blue-800"
              } mb-4`}
            >
              Governing Law
            </h3>
            <p
              className={`${
                darkmode ? "text-blue-200" : "text-blue-700"
              } leading-relaxed`}
            >
              These Terms shall be interpreted and governed by the laws of
              Bangladesh. Any disputes arising from these Terms or your use of
              our services shall be subject to the exclusive jurisdiction of the
              courts in Dhaka, Bangladesh. If any provision of these Terms is
              found to be unenforceable, the remaining provisions will remain in
              full force and effect.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className={`${
              darkmode
                ? "bg-gradient-to-r from-gray-700 to-gray-600"
                : "bg-gradient-to-r from-indigo-500 to-purple-600"
            } rounded-3xl p-8 text-white mt-12`}
          >
            <h2 className="text-3xl font-bold mb-6">Questions About Terms?</h2>
            <p
              className={`${
                darkmode ? "text-gray-300" : "text-blue-100"
              } text-lg mb-6`}
            >
              If you have any questions about these Terms of Service, please
              contact our legal team.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <FaEnvelope className="text-2xl mr-4" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p
                    className={`${
                      darkmode ? "text-gray-300" : "text-blue-100"
                    }`}
                  >
                    legal@sportivox.com
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="text-2xl mr-4" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p
                    className={`${
                      darkmode ? "text-gray-300" : "text-blue-100"
                    }`}
                  >
                    +880 1601949074
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Acceptance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className={`${
              darkmode
                ? "bg-green-900/30 border border-green-700/50"
                : "bg-green-50 border border-green-200"
            } rounded-3xl p-8 mt-8`}
          >
            <h3
              className={`text-2xl font-bold ${
                darkmode ? "text-green-300" : "text-green-800"
              } mb-4`}
            >
              Acceptance of Terms
            </h3>
            <p
              className={`${
                darkmode ? "text-green-200" : "text-green-700"
              } leading-relaxed`}
            >
              By using SportivoX services, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service. These
              Terms constitute a legally binding agreement between you and
              SportivoX. Thank you for choosing SportivoX for your sports and
              fitness needs!
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
