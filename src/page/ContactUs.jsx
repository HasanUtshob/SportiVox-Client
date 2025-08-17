import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPaperPlane,
  FaUser,
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { Themecontext } from "../Context/ThemeContext";

const ContactUs = () => {
  const { darkmode } = useContext(Themecontext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for contacting us. We'll get back to you soon!",
        confirmButtonColor: "#3b82f6",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <FaPhoneAlt />,
      title: "Phone",
      details: "+880 1601949074",
      subtitle: "Mon-Fri 9AM-6PM",
      color: "from-blue-500 to-blue-600",
      isClickable: true,
      href: "tel:+8801601949074",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      details: "shutshob@gmail.com",
      subtitle: "We reply within 24 hours",
      color: "from-purple-500 to-purple-600",
      isClickable: true,
      href: "mailto:shutshob@gmail.com",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      details: "123 Club Street, Mirpur DOHS",
      subtitle: "Dhaka 1216, Bangladesh",
      color: "from-pink-500 to-pink-600",
      isClickable: false,
    },
    {
      icon: <FaClock />,
      title: "Office Hours",
      details: "Mon-Fri: 9AM-6PM",
      subtitle: "Sat-Sun: 10AM-4PM",
      color: "from-green-500 to-green-600",
      isClickable: false,
    },
  ];

  const faqs = [
    {
      question: "How do I book a court?",
      answer:
        "You can book a court through our online booking system. Simply navigate to the Courts page, select your preferred court and time slot, and complete the booking process.",
    },
    {
      question: "What are your membership benefits?",
      answer:
        "Our members enjoy priority booking, discounted rates, access to exclusive events, and complimentary equipment rental. We also offer flexible membership plans to suit your needs.",
    },
    {
      question: "Do you offer coaching services?",
      answer:
        "Yes, we have certified coaches available for individual and group lessons. Our coaching programs cater to all skill levels, from beginners to advanced players.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and online payment methods. We also offer flexible payment plans for memberships and coaching packages.",
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer:
        "Yes, you can cancel or reschedule your booking up to 24 hours before your scheduled time. Cancellations made within 24 hours may be subject to a cancellation fee.",
    },
  ];

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
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={`text-xl md:text-2xl ${
              darkmode ? "text-gray-300" : "text-blue-100"
            } max-w-3xl mx-auto`}
          >
            We're here to help you elevate your sports experience. Reach out to
            us for any questions, bookings, or support.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
                className={`${
                  darkmode
                    ? "bg-gray-800 shadow-2xl hover:shadow-gray-900/50"
                    : "bg-white shadow-xl hover:shadow-2xl"
                } rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-2 ${
                  info.isClickable ? "cursor-pointer group" : ""
                }`}
                onClick={() =>
                  info.isClickable && window.open(info.href, "_self")
                }
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${
                    info.color
                  } rounded-xl flex items-center justify-center text-white mb-4 ${
                    info.isClickable
                      ? "group-hover:scale-110 transition-transform duration-300"
                      : ""
                  }`}
                >
                  {info.icon}
                </div>
                <h3
                  className={`text-lg font-bold ${
                    darkmode ? "text-gray-100" : "text-gray-800"
                  } mb-2`}
                >
                  {info.title}
                </h3>
                <p
                  className={`${
                    darkmode ? "text-gray-300" : "text-gray-600"
                  } font-medium mb-1 ${
                    info.isClickable
                      ? `group-hover:${
                          darkmode ? "text-blue-400" : "text-blue-600"
                        } transition-colors duration-300`
                      : ""
                  }`}
                >
                  {info.details}
                </p>
                <p
                  className={`text-sm ${
                    darkmode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {info.subtitle}
                </p>
                {info.isClickable && (
                  <p
                    className={`text-xs ${
                      darkmode ? "text-blue-400" : "text-blue-500"
                    } mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  >
                    Click to {info.title === "Phone" ? "call" : "email"}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className={`${
                darkmode ? "bg-gray-800 shadow-2xl" : "bg-white shadow-xl"
              } rounded-3xl p-8`}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Send us a Message
                </h2>
                <p
                  className={`${darkmode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

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
                    <div className="relative">
                      <FaUser
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                          darkmode ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full pl-10 pr-4 py-3 border ${
                          darkmode
                            ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400"
                            : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                        } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } mb-2`}
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <FaEnvelope
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                          darkmode ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full pl-10 pr-4 py-3 border ${
                          darkmode
                            ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400"
                            : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                        } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } mb-2`}
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <FaPhoneAlt
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                          darkmode ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border ${
                          darkmode
                            ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400"
                            : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                        } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                        placeholder="Enter your phone number"
                      />
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
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border ${
                        darkmode
                          ? "border-gray-600 bg-gray-700 text-gray-200"
                          : "border-gray-300 bg-white text-gray-900"
                      } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Court Booking</option>
                      <option value="membership">Membership Inquiry</option>
                      <option value="coaching">Coaching Services</option>
                      <option value="support">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkmode ? "text-gray-300" : "text-gray-700"
                    } mb-2`}
                  >
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 border ${
                      darkmode
                        ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400"
                        : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                    } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="space-y-8"
            >
              {/* Map Section */}
              <div
                className={`${
                  darkmode ? "bg-gray-800 shadow-2xl" : "bg-white shadow-xl"
                } rounded-3xl p-8`}
              >
                <h3
                  className={`text-2xl font-bold ${
                    darkmode ? "text-gray-100" : "text-gray-800"
                  } mb-6`}
                >
                  Find Us Here
                </h3>
                <div
                  className={`relative h-64 ${
                    darkmode
                      ? "bg-gradient-to-br from-gray-700 to-gray-600"
                      : "bg-gradient-to-br from-blue-100 to-purple-100"
                  } rounded-2xl overflow-hidden mb-6`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <FaMapMarkerAlt className="text-4xl text-blue-600 mx-auto mb-4" />
                      <p
                        className={`${
                          darkmode ? "text-gray-300" : "text-gray-600"
                        } font-medium`}
                      >
                        Interactive Map
                      </p>
                      <p
                        className={`text-sm ${
                          darkmode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        123 Club Street, Mirpur DOHS
                      </p>
                      <p
                        className={`text-sm ${
                          darkmode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Dhaka 1216, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call Us Button */}
                <motion.a
                  href="tel:+8801601949074"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 group"
                >
                  <FaPhoneAlt className="text-lg group-hover:animate-pulse" />
                  <span>Call Us Now</span>
                  <span className="text-sm opacity-90">+880 1601949074</span>
                </motion.a>
              </div>

              {/* Social Media */}
              <div
                className={`${
                  darkmode ? "bg-gray-800 shadow-2xl" : "bg-white shadow-xl"
                } rounded-3xl p-8`}
              >
                <h3
                  className={`text-2xl font-bold ${
                    darkmode ? "text-gray-100" : "text-gray-800"
                  } mb-6`}
                >
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 ${
                        darkmode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-600"
                      } rounded-xl hover:text-white transition-all duration-300 ${
                        social.color
                      }`}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
                <p
                  className={`${
                    darkmode ? "text-gray-300" : "text-gray-600"
                  } mt-4`}
                >
                  Stay connected with us on social media for the latest updates,
                  events, and sports news.
                </p>
              </div>

              {/* Quick Stats */}
              <div
                className={`${
                  darkmode
                    ? "bg-gradient-to-r from-gray-700 to-gray-600"
                    : "bg-gradient-to-r from-blue-500 to-purple-600"
                } rounded-3xl p-8 text-white`}
              >
                <h3 className="text-2xl font-bold mb-6">
                  Why Choose SportivoX?
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">500+</div>
                    <div
                      className={`${
                        darkmode ? "text-gray-300" : "text-blue-100"
                      }`}
                    >
                      Happy Members
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">50+</div>
                    <div
                      className={`${
                        darkmode ? "text-gray-300" : "text-blue-100"
                      }`}
                    >
                      Awards Won
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">4.9</div>
                    <div
                      className={`${
                        darkmode ? "text-gray-300" : "text-blue-100"
                      }`}
                    >
                      Star Rating
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">24/7</div>
                    <div
                      className={`${
                        darkmode ? "text-gray-300" : "text-blue-100"
                      }`}
                    >
                      Support
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-16 ${darkmode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h2>
            <p
              className={`${
                darkmode ? "text-gray-300" : "text-gray-600"
              } text-lg`}
            >
              Find answers to common questions about our services and
              facilities.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                className={`${
                  darkmode ? "bg-gray-800" : "bg-gray-50"
                } rounded-2xl overflow-hidden`}
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className={`w-full px-6 py-4 text-left flex items-center justify-between ${
                    darkmode ? "hover:bg-gray-700" : "hover:bg-gray-100"
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
    </div>
  );
};

export default ContactUs;
