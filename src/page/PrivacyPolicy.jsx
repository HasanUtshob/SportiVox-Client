import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaLock,
  FaUserShield,
  FaEye,
  FaDatabase,
  FaCookie,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { Themecontext } from "../Context/ThemeContext";

const PrivacyPolicy = () => {
  const { darkmode } = useContext(Themecontext);
  const sections = [
    {
      icon: <FaDatabase />,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating an account (name, email, phone number)",
        "Booking and payment information for court reservations",
        "Usage data and preferences to improve our services",
        "Device information and IP addresses for security purposes",
        "Communication records when you contact our support team",
      ],
    },
    {
      icon: <FaEye />,
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our sports facility booking services",
        "To process payments and manage your bookings",
        "To communicate with you about your account and bookings",
        "To improve our services and user experience",
        "To comply with legal obligations and prevent fraud",
      ],
    },
    {
      icon: <FaUserShield />,
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "Information may be shared with payment processors for transaction processing",
        "We may share data with service providers who assist in our operations",
        "Legal authorities may receive information if required by law",
        "Anonymous, aggregated data may be used for analytics and research",
      ],
    },
    {
      icon: <FaLock />,
      title: "Data Security",
      content: [
        "We use industry-standard encryption to protect your data",
        "Regular security audits and updates to our systems",
        "Secure payment processing through certified providers",
        "Limited access to personal data on a need-to-know basis",
        "Regular backups and disaster recovery procedures",
      ],
    },
    {
      icon: <FaCookie />,
      title: "Cookies and Tracking",
      content: [
        "We use cookies to enhance your browsing experience",
        "Analytics cookies help us understand how you use our site",
        "You can control cookie settings through your browser",
        "Essential cookies are necessary for site functionality",
        "Third-party cookies may be used for payment processing",
      ],
    },
    {
      icon: <FaShieldAlt />,
      title: "Your Rights",
      content: [
        "Access and review your personal information",
        "Request corrections to inaccurate data",
        "Delete your account and associated data",
        "Opt-out of marketing communications",
        "Data portability and transfer rights",
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
            : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
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
            <FaShieldAlt className="text-4xl" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`text-xl md:text-2xl ${
              darkmode ? "text-gray-300" : "text-blue-100"
            } max-w-3xl mx-auto`}
          >
            Your privacy is important to us. Learn how we collect, use, and
            protect your personal information.
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
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Introduction
            </h2>
            <p
              className={`${
                darkmode ? "text-gray-300" : "text-gray-600"
              } text-lg leading-relaxed`}
            >
              At SportivoX, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you use our sports facility booking platform and
              related services. By using our services, you agree to the
              collection and use of information in accordance with this policy.
            </p>
          </motion.div>

          {/* Privacy Sections */}
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
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mr-4">
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
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
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

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className={`${
              darkmode
                ? "bg-gradient-to-r from-gray-700 to-gray-600"
                : "bg-gradient-to-r from-blue-500 to-purple-600"
            } rounded-3xl p-8 text-white mt-12`}
          >
            <h2 className="text-3xl font-bold mb-6">
              Contact Us About Privacy
            </h2>
            <p
              className={`${
                darkmode ? "text-gray-300" : "text-blue-100"
              } text-lg mb-6`}
            >
              If you have any questions about this Privacy Policy or our data
              practices, please don't hesitate to contact us.
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
                    privacy@sportivox.com
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

          {/* Policy Updates */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className={`${
              darkmode
                ? "bg-orange-900/30 border border-orange-700/50"
                : "bg-yellow-50 border border-yellow-200"
            } rounded-3xl p-8 mt-8`}
          >
            <h3
              className={`text-2xl font-bold ${
                darkmode ? "text-orange-300" : "text-yellow-800"
              } mb-4`}
            >
              Policy Updates
            </h3>
            <p
              className={`${
                darkmode ? "text-orange-200" : "text-yellow-700"
              } leading-relaxed`}
            >
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by
              posting the new Privacy Policy on this page and updating the "Last
              updated" date. We encourage you to review this Privacy Policy
              periodically to stay informed about how we are protecting your
              information.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
