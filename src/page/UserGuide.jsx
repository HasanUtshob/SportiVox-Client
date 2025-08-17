import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  FaBook,
  FaPlay,
  FaUser,
  FaCalendarAlt,
  FaCreditCard,
  FaCog,
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaArrowRight,
  FaDownload,
  FaPrint,
  FaSearch,
  FaHome,
  FaUserPlus,
  FaSignInAlt,
  FaThLarge,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { Themecontext } from "../Context/ThemeContext";

const UserGuide = () => {
  const { darkmode } = useContext(Themecontext);
  const [activeSection, setActiveSection] = useState("getting-started");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <FaPlay />,
      content: [
        {
          title: "Welcome to SportivoX",
          description:
            "Learn the basics of using our sports management platform",
          steps: [
            "Visit the SportivoX website",
            "Click on 'Register' to create your account",
            "Fill in your personal information",
            "Verify your email address",
            "Complete your profile setup",
          ],
        },
        {
          title: "First Time Setup",
          description: "Configure your account for the best experience",
          steps: [
            "Upload a profile picture",
            "Set your sports preferences",
            "Choose your notification settings",
            "Add payment methods",
            "Explore available facilities",
          ],
        },
      ],
    },
    {
      id: "account-management",
      title: "Account Management",
      icon: <FaUser />,
      content: [
        {
          title: "Creating Your Account",
          description: "Step-by-step guide to account registration",
          steps: [
            "Navigate to the registration page",
            "Enter your email and create a strong password",
            "Provide personal details (name, phone, address)",
            "Accept terms and conditions",
            "Verify your email through the confirmation link",
          ],
        },
        {
          title: "Profile Management",
          description: "How to update and manage your profile",
          steps: [
            "Access your profile from the dashboard",
            "Update personal information as needed",
            "Change your password regularly",
            "Manage privacy settings",
            "Upload or change profile picture",
          ],
        },
      ],
    },
    {
      id: "booking-system",
      title: "Booking System",
      icon: <FaCalendarAlt />,
      content: [
        {
          title: "Making a Reservation",
          description: "How to book courts and facilities",
          steps: [
            "Go to the 'Courts' section",
            "Select your preferred sport/facility",
            "Choose date and time slot",
            "Review booking details and pricing",
            "Complete payment to confirm booking",
          ],
        },
        {
          title: "Managing Bookings",
          description: "View, modify, or cancel your reservations",
          steps: [
            "Access 'My Bookings' from your dashboard",
            "View upcoming and past bookings",
            "Modify bookings (subject to availability)",
            "Cancel bookings (check cancellation policy)",
            "Download booking confirmations",
          ],
        },
      ],
    },
    {
      id: "payments",
      title: "Payments & Billing",
      icon: <FaCreditCard />,
      content: [
        {
          title: "Payment Methods",
          description: "Adding and managing payment options",
          steps: [
            "Go to 'Payment Settings' in your profile",
            "Add credit/debit card information",
            "Set up mobile banking (bKash, Nagad, Rocket)",
            "Choose default payment method",
            "Enable auto-payment for memberships",
          ],
        },
        {
          title: "Billing & Invoices",
          description: "Understanding charges and accessing receipts",
          steps: [
            "View payment history in your dashboard",
            "Download invoices and receipts",
            "Understand pricing structure",
            "Check for available discounts",
            "Contact support for billing issues",
          ],
        },
      ],
    },
    {
      id: "settings",
      title: "Settings & Preferences",
      icon: <FaCog />,
      content: [
        {
          title: "Notification Settings",
          description: "Customize how you receive updates",
          steps: [
            "Access 'Settings' from your profile menu",
            "Choose email notification preferences",
            "Set SMS notification options",
            "Configure booking reminders",
            "Manage promotional communications",
          ],
        },
        {
          title: "Privacy & Security",
          description: "Protect your account and data",
          steps: [
            "Enable two-factor authentication",
            "Review privacy settings",
            "Manage data sharing preferences",
            "Update password regularly",
            "Monitor account activity",
          ],
        },
      ],
    },
  ];

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "Click on 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email to reset your password.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel bookings up to 24 hours before your scheduled time for a full refund. Cancellations within 24 hours may incur a fee.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit cards, debit cards, and mobile banking services like bKash, Nagad, and Rocket.",
    },
    {
      question: "How do I change my membership plan?",
      answer:
        "Go to your dashboard, select 'Membership', and choose 'Change Plan'. You can upgrade or downgrade your membership at any time.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Currently, we offer a mobile-responsive website. A dedicated mobile app is in development and will be available soon.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our support team through the 'Support' page, via email at support@sportivox.com, or by calling +880 1601949074.",
    },
  ];

  const quickActions = [
    {
      title: "Create Account",
      description: "Sign up for SportivoX",
      icon: <FaUserPlus />,
      link: "/Register",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Sign In",
      description: "Access your account",
      icon: <FaSignInAlt />,
      link: "/SignIn",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Book Courts",
      description: "Reserve facilities",
      icon: <FaThLarge />,
      link: "/Courts",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Contact Support",
      description: "Get help when needed",
      icon: <FaQuestionCircle />,
      link: "/Support",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const filteredSections = sections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.some(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

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
            : "bg-gradient-to-r from-green-600 via-blue-600 to-purple-600"
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
            <FaBook className="text-4xl" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            User Guide
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`text-xl md:text-2xl ${
              darkmode ? "text-gray-300" : "text-blue-100"
            } max-w-3xl mx-auto`}
          >
            Everything you need to know about using SportivoX platform
            effectively.
          </motion.p>
        </div>
      </motion.section>

      {/* Quick Actions */}
      <section className="py-16 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.a
                key={index}
                href={action.link}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
                className={`${
                  darkmode
                    ? "bg-gray-800 shadow-2xl hover:shadow-gray-900/50"
                    : "bg-white shadow-xl hover:shadow-2xl"
                } rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-2 group`}
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {action.icon}
                </div>
                <h3
                  className={`text-lg font-bold ${
                    darkmode ? "text-gray-100" : "text-gray-800"
                  } mb-2`}
                >
                  {action.title}
                </h3>
                <p
                  className={`${
                    darkmode ? "text-gray-300" : "text-gray-600"
                  } text-sm`}
                >
                  {action.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className={`${
                  darkmode ? "bg-gray-800 shadow-2xl" : "bg-white shadow-xl"
                } rounded-3xl p-6 sticky top-8`}
              >
                <div className="mb-6">
                  <div className="relative">
                    <FaSearch
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                        darkmode ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Search guide..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border ${
                        darkmode
                          ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400"
                          : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                      } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                </div>

                <h3
                  className={`text-xl font-bold ${
                    darkmode ? "text-gray-100" : "text-gray-800"
                  } mb-4`}
                >
                  Contents
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 text-left ${
                        activeSection === section.id
                          ? "bg-blue-500 text-white"
                          : darkmode
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-gray-50 text-gray-700 hover:bg-blue-50"
                      }`}
                    >
                      {section.icon}
                      <span className="font-medium">{section.title}</span>
                    </button>
                  ))}
                </nav>

                <div
                  className={`mt-8 pt-6 border-t ${
                    darkmode ? "border-gray-600" : "border-gray-200"
                  }`}
                >
                  <h4
                    className={`font-semibold ${
                      darkmode ? "text-gray-100" : "text-gray-800"
                    } mb-4`}
                  >
                    Need Help?
                  </h4>
                  <div className="space-y-3">
                    <a
                      href="/Support"
                      className={`flex items-center space-x-2 text-sm ${
                        darkmode
                          ? "text-gray-400 hover:text-blue-400"
                          : "text-gray-600 hover:text-blue-600"
                      } transition-colors`}
                    >
                      <FaQuestionCircle />
                      <span>Contact Support</span>
                    </a>
                    <a
                      href="/Contact"
                      className={`flex items-center space-x-2 text-sm ${
                        darkmode
                          ? "text-gray-400 hover:text-blue-400"
                          : "text-gray-600 hover:text-blue-600"
                      } transition-colors`}
                    >
                      <FaEnvelope />
                      <span>Send Feedback</span>
                    </a>
                    <a
                      href="tel:+8801601949074"
                      className={`flex items-center space-x-2 text-sm ${
                        darkmode
                          ? "text-gray-400 hover:text-blue-400"
                          : "text-gray-600 hover:text-blue-600"
                      } transition-colors`}
                    >
                      <FaPhoneAlt />
                      <span>Call Support</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className={`${
                  darkmode ? "bg-gray-800 shadow-2xl" : "bg-white shadow-xl"
                } rounded-3xl p-8`}
              >
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                      {sections.find((s) => s.id === activeSection)?.icon}
                    </div>
                    <h2
                      className={`text-3xl font-bold ${
                        darkmode ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      {sections.find((s) => s.id === activeSection)?.title}
                    </h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className={`p-2 ${
                        darkmode
                          ? "text-gray-400 hover:text-blue-400"
                          : "text-gray-500 hover:text-blue-600"
                      } transition-colors`}
                    >
                      <FaDownload />
                    </button>
                    <button
                      className={`p-2 ${
                        darkmode
                          ? "text-gray-400 hover:text-blue-400"
                          : "text-gray-500 hover:text-blue-600"
                      } transition-colors`}
                    >
                      <FaPrint />
                    </button>
                  </div>
                </div>

                {/* Section Content */}
                <div className="space-y-8">
                  {sections
                    .find((s) => s.id === activeSection)
                    ?.content.map((item, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-blue-500 pl-6"
                      >
                        <h3
                          className={`text-2xl font-bold ${
                            darkmode ? "text-gray-100" : "text-gray-800"
                          } mb-3`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`${
                            darkmode ? "text-gray-300" : "text-gray-600"
                          } mb-6`}
                        >
                          {item.description}
                        </p>

                        <div className="space-y-4">
                          {item.steps.map((step, stepIndex) => (
                            <div
                              key={stepIndex}
                              className="flex items-start space-x-4"
                            >
                              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                                {stepIndex + 1}
                              </div>
                              <div className="flex-1">
                                <p
                                  className={`${
                                    darkmode ? "text-gray-300" : "text-gray-700"
                                  } leading-relaxed`}
                                >
                                  {step}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>

              {/* FAQ Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className={`${
                  darkmode ? "bg-gray-800 shadow-2xl" : "bg-white shadow-xl"
                } rounded-3xl p-8 mt-8`}
              >
                <h2
                  className={`text-3xl font-bold ${
                    darkmode ? "text-gray-100" : "text-gray-800"
                  } mb-8`}
                >
                  Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className={`border ${
                        darkmode ? "border-gray-600" : "border-gray-200"
                      } rounded-2xl overflow-hidden`}
                    >
                      <button
                        onClick={() =>
                          setExpandedFaq(expandedFaq === index ? null : index)
                        }
                        className={`w-full px-6 py-4 text-left flex items-center justify-between ${
                          darkmode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                        } transition-colors duration-300`}
                      >
                        <div className="flex items-center space-x-3">
                          <FaQuestionCircle
                            className={`${
                              darkmode ? "text-blue-400" : "text-blue-500"
                            }`}
                          />
                          <span
                            className={`font-semibold ${
                              darkmode ? "text-gray-100" : "text-gray-800"
                            }`}
                          >
                            {faq.question}
                          </span>
                        </div>
                        {expandedFaq === index ? (
                          <FaChevronUp
                            className={`${
                              darkmode ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                        ) : (
                          <FaChevronDown
                            className={`${
                              darkmode ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-4"
                        >
                          <div className="flex items-start space-x-3">
                            <FaCheckCircle
                              className={`${
                                darkmode ? "text-green-400" : "text-green-500"
                              } mt-1 flex-shrink-0`}
                            />
                            <p
                              className={`${
                                darkmode ? "text-gray-300" : "text-gray-600"
                              } leading-relaxed`}
                            >
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserGuide;
