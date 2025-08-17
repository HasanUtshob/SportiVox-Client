import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  FaHeadset,
  FaQuestionCircle,
  FaBook,
  FaVideo,
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaComments,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaClock,
  FaUserFriends,
  FaTools,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { Themecontext } from "../Context/ThemeContext";

const Support = () => {
  const { darkmode } = useContext(Themecontext);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    category: "",
    priority: "",
    subject: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate ticket submission
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Support Ticket Created!",
        text: "We've received your request and will respond within 24 hours.",
        confirmButtonColor: "#3b82f6",
      });
      setTicketForm({
        name: "",
        email: "",
        category: "",
        priority: "",
        subject: "",
        description: "",
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const supportChannels = [
    {
      icon: <FaPhoneAlt />,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+880 1601949074",
      hours: "Mon-Fri: 9AM-6PM",
      color: "from-green-500 to-green-600",
      action: "tel:+8801601949074",
    },
    {
      icon: <FaEnvelope />,
      title: "Email Support",
      description: "Send us detailed questions or issues",
      contact: "support@sportivox.com",
      hours: "Response within 24 hours",
      color: "from-blue-500 to-blue-600",
      action: "mailto:support@sportivox.com",
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      description: "Quick chat support via WhatsApp",
      contact: "+880 1601949074",
      hours: "Mon-Fri: 9AM-6PM",
      color: "from-green-400 to-green-500",
      action: "https://wa.me/8801601949074",
    },
    {
      icon: <FaComments />,
      title: "Live Chat",
      description: "Instant messaging with support agents",
      contact: "Available on website",
      color: "from-purple-500 to-purple-600",
      action: "#",
    },
  ];

  const faqs = [
    {
      question: "How do I book a court?",
      answer:
        "To book a court, log into your account, navigate to the Courts page, select your preferred court and time slot, then complete the payment process. You'll receive a confirmation email with your booking details.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "You can cancel bookings up to 24 hours before your scheduled time for a full refund. Cancellations made within 24 hours may incur a 50% cancellation fee. No-shows will be charged the full amount.",
    },
    {
      question: "Do you offer membership packages?",
      answer:
        "Yes! We offer various membership packages including monthly, quarterly, and annual plans. Members enjoy priority booking, discounted rates, and exclusive access to special events and training sessions.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, mobile banking (bKash, Nagad, Rocket), and bank transfers. All payments are processed securely through our encrypted payment gateway.",
    },
    {
      question: "Can I reschedule my booking?",
      answer:
        "Yes, you can reschedule your booking up to 12 hours before your scheduled time, subject to court availability. Log into your account and use the 'Reschedule' option in your booking history.",
    },
    {
      question: "What should I bring to the facility?",
      answer:
        "Bring appropriate sports attire, non-marking sports shoes, a water bottle, and a towel. We provide basic equipment, but you're welcome to bring your own. Lockers are available for storing personal belongings.",
    },
    {
      question: "Do you provide coaching services?",
      answer:
        "Yes, we have certified coaches available for individual and group lessons. Coaching sessions can be booked separately and cover various skill levels from beginner to advanced.",
    },
    {
      question: "Is there parking available?",
      answer:
        "Yes, we provide free parking for all members and visitors. The parking area is secure and well-lit, with spaces for both cars and motorcycles.",
    },
  ];

  const supportStats = [
    { icon: <FaClock />, value: "< 2 hrs", label: "Average Response Time" },
    { icon: <FaUserFriends />, value: "98%", label: "Customer Satisfaction" },
    { icon: <FaCheckCircle />, value: "24/7", label: "Ticket System" },
    { icon: <FaTools />, value: "99.9%", label: "Issue Resolution" },
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
            <FaHeadset className="text-4xl" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Support Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`text-xl md:text-2xl ${
              darkmode ? "text-gray-300" : "text-blue-100"
            } max-w-3xl mx-auto`}
          >
            We're here to help! Get quick answers, submit support tickets, or
            contact our team directly.
          </motion.p>
        </div>
      </motion.section>

      {/* Support Stats */}
      <section className="py-16 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {supportStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
                className={`${
                  darkmode
                    ? "bg-gray-800 shadow-2xl hover:shadow-gray-900/50"
                    : "bg-white shadow-xl hover:shadow-2xl"
                } rounded-2xl p-6 text-center transition-all duration-300`}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                  {stat.icon}
                </div>
                <div
                  className={`text-2xl font-bold ${
                    darkmode ? "text-gray-100" : "text-gray-800"
                  } mb-1`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-sm ${
                    darkmode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Get In Touch
            </h2>
            <p
              className={`${
                darkmode ? "text-gray-300" : "text-gray-600"
              } text-lg max-w-2xl mx-auto`}
            >
              Choose your preferred way to reach our support team. We're
              available through multiple channels to assist you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                className={`${
                  darkmode
                    ? "bg-gray-800 shadow-2xl hover:shadow-gray-900/50"
                    : "bg-white shadow-xl hover:shadow-2xl"
                } rounded-3xl p-6 transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${channel.color} rounded-xl flex items-center justify-center text-white mb-4`}
                >
                  {channel.icon}
                </div>
                <h3
                  className={`text-xl font-bold ${
                    darkmode ? "text-gray-100" : "text-gray-800"
                  } mb-2`}
                >
                  {channel.title}
                </h3>
                <p
                  className={`${
                    darkmode ? "text-gray-300" : "text-gray-600"
                  } text-sm mb-4`}
                >
                  {channel.description}
                </p>
                <div className="space-y-2 mb-4">
                  <p
                    className={`text-sm font-semibold ${
                      darkmode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    {channel.contact}
                  </p>
                  <p
                    className={`text-xs ${
                      darkmode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {channel.hours}
                  </p>
                </div>
                <a
                  href={channel.action}
                  className={`w-full bg-gradient-to-r ${channel.color} text-white py-2 px-4 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center`}
                >
                  Contact Now
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Ticket Form */}
      <section className={`py-16 ${darkmode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Submit a Support Ticket
            </h2>
            <p className="text-gray-600 text-lg">
              Can't find what you're looking for? Submit a detailed support
              ticket and we'll get back to you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={`${
              darkmode ? "bg-gray-800 shadow-2xl" : "bg-gray-50 shadow-xl"
            } rounded-3xl p-8`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkmode ? "text-gray-300" : "text-gray-700"
                    } mb-2`}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={ticketForm.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border ${
                      darkmode
                        ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400"
                        : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                    } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkmode ? "text-gray-300" : "text-gray-700"
                    } mb-2`}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={ticketForm.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border ${
                      darkmode
                        ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400"
                        : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                    } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkmode ? "text-gray-300" : "text-gray-700"
                    } mb-2`}
                  >
                    Category *
                  </label>
                  <select
                    name="category"
                    value={ticketForm.category}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border ${
                      darkmode
                        ? "border-gray-600 bg-gray-700 text-gray-200"
                        : "border-gray-300 bg-white text-gray-900"
                    } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                  >
                    <option value="">Select a category</option>
                    <option value="booking">Booking Issues</option>
                    <option value="payment">Payment Problems</option>
                    <option value="technical">Technical Support</option>
                    <option value="facility">Facility Issues</option>
                    <option value="membership">Membership Questions</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkmode ? "text-gray-300" : "text-gray-700"
                    } mb-2`}
                  >
                    Priority *
                  </label>
                  <select
                    name="priority"
                    value={ticketForm.priority}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border ${
                      darkmode
                        ? "border-gray-600 bg-gray-700 text-gray-200"
                        : "border-gray-300 bg-white text-gray-900"
                    } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                  >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkmode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={ticketForm.subject}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border ${
                    darkmode
                      ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400"
                      : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                  } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkmode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Description *
                </label>
                <textarea
                  name="description"
                  value={ticketForm.description}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 border ${
                    darkmode
                      ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400"
                      : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                  } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
                  placeholder="Please provide detailed information about your issue..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FaHeadset />
                    <span>Submit Support Ticket</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Quick answers to common questions about our services and
              facilities.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                className={`${
                  darkmode ? "bg-gray-800 shadow-2xl" : "bg-white shadow-lg"
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section
        className={`py-16 ${
          darkmode
            ? "bg-gradient-to-r from-gray-700 to-gray-600"
            : "bg-gradient-to-r from-green-500 to-blue-600"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Additional Resources
            </h2>
            <p
              className={`${
                darkmode ? "text-gray-300" : "text-blue-100"
              } text-lg`}
            >
              Explore our help resources for self-service support options.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-white hover:bg-white/20 transition-all duration-300"
            >
              <FaBook className="text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-2">User Guide</h3>
              <p className="text-blue-100 mb-4">
                Comprehensive guide covering all features and functionalities of
                our platform.
              </p>
              <a
                href="/Guide"
                className={`${
                  darkmode
                    ? "text-blue-300 hover:text-blue-200"
                    : "text-yellow-300 hover:text-yellow-200"
                } font-semibold transition-colors`}
              >
                Read Guide →
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-white hover:bg-white/20 transition-all duration-300"
            >
              <FaVideo className="text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Video Tutorials</h3>
              <p className="text-blue-100 mb-4">
                Step-by-step video tutorials to help you get the most out of our
                services.
              </p>
              <Link to="/demo">
                <button
                  className={`${
                    darkmode
                      ? "text-blue-300 hover:text-blue-200"
                      : "text-yellow-300 hover:text-yellow-200"
                  } font-semibold transition-colors`}
                >
                  Watch Videos →
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-white hover:bg-white/20 transition-all duration-300"
            >
              <FaComments className="text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Community Forum</h3>
              <p className="text-blue-100 mb-4">
                Connect with other users, share tips, and get answers from the
                community.
              </p>
              <Link
                to="/Forum"
                className={`${
                  darkmode
                    ? "text-blue-300 hover:text-blue-200"
                    : "text-yellow-300 hover:text-yellow-200"
                } font-semibold transition-colors`}
              >
                Join Forum →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
