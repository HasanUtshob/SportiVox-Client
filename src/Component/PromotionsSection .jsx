import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaTag, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useAxios from "../hooks/useAxios";
import { Themecontext } from "../Context/ThemeContext";

const PromotionsSection = () => {
  const { darkmode } = useContext(Themecontext);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;
  const axiosSecure = useAxios();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axiosSecure.get("/all_coupons");
        setCoupons(res.data);
      } catch (err) {
        console.error("Error fetching coupons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(coupons.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCoupons = coupons.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className="w-11/12 md:w-10/12 mx-auto my-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 sm:mb-16"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent mb-4 sm:mb-6"
        >
          🎁 Special Promotions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`text-center ${
            darkmode ? "text-gray-300" : "text-gray-600"
          } mb-4 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl sm:max-w-3xl mx-auto px-4`}
        >
          Unlock amazing savings with our exclusive promo codes and special
          offers!
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "6rem" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"
        ></motion.div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div
            className={`animate-spin rounded-full h-16 w-16 border-4 ${
              darkmode
                ? "border-purple-400 border-t-transparent"
                : "border-pink-500 border-t-transparent"
            }`}
          ></div>
        </div>
      ) : coupons.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-center py-16 ${
            darkmode
              ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600"
              : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300"
          } rounded-3xl border-2 border-dashed`}
        >
          <div className="text-6xl mb-4">🎫</div>
          <p
            className={`text-xl ${
              darkmode ? "text-gray-400" : "text-gray-500"
            } font-medium`}
          >
            No coupons available right now.
          </p>
          <p className={`${darkmode ? "text-gray-500" : "text-gray-400"} mt-2`}>
            Check back soon for exciting offers!
          </p>
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8">
            {currentCoupons.map((coupon, index) => (
              <motion.div
                key={coupon._id || index}
                className={`group relative ${
                  darkmode
                    ? "bg-gradient-to-br from-gray-800/90 via-gray-700/90 to-gray-600/90 border-gray-600/50 hover:border-gray-500/70 hover:shadow-2xl hover:shadow-purple-500/25"
                    : "bg-gradient-to-br from-white/95 via-pink-50/95 to-purple-50/95 border-pink-200/60 hover:border-pink-300/80 hover:shadow-2xl hover:shadow-pink-500/25"
                } backdrop-blur-sm shadow-lg p-4 sm:p-5 lg:p-6 rounded-2xl text-center border transition-all duration-700 transform hover:-translate-y-3 hover:rotate-1 overflow-hidden`}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Enhanced Background Decorations */}
                <div
                  className={`absolute top-0 right-0 w-16 h-16 ${
                    darkmode
                      ? "bg-gradient-to-br from-purple-600/30 to-pink-600/30"
                      : "bg-gradient-to-br from-pink-300/40 to-purple-300/40"
                  } rounded-full -translate-y-8 translate-x-8 opacity-60 group-hover:opacity-80 transition-opacity duration-500`}
                ></div>
                <div
                  className={`absolute bottom-0 left-0 w-12 h-12 ${
                    darkmode
                      ? "bg-gradient-to-tr from-orange-500/30 to-pink-500/30"
                      : "bg-gradient-to-tr from-orange-300/40 to-pink-300/40"
                  } rounded-full translate-y-6 -translate-x-6 opacity-60 group-hover:opacity-80 transition-opacity duration-500`}
                ></div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className={`absolute top-1/4 left-1/4 w-2 h-2 ${
                      darkmode ? "bg-purple-400" : "bg-pink-400"
                    } rounded-full animate-ping`}
                  ></div>
                  <div
                    className={`absolute top-3/4 right-1/4 w-1.5 h-1.5 ${
                      darkmode ? "bg-pink-400" : "bg-purple-400"
                    } rounded-full animate-ping`}
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className={`absolute top-1/2 right-1/3 w-1 h-1 ${
                      darkmode ? "bg-orange-400" : "bg-orange-400"
                    } rounded-full animate-ping`}
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>

                {/* Beautiful Content */}
                <div className="relative z-10">
                  <motion.div
                    className="flex justify-center mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div
                      className={`p-3 sm:p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg transform group-hover:scale-110 transition-all duration-300 ${
                        darkmode ? "shadow-purple-500/25" : "shadow-pink-500/25"
                      }`}
                    >
                      <FaTag className="text-lg sm:text-xl lg:text-2xl text-white" />
                    </div>
                  </motion.div>

                  <motion.h3
                    className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    {coupon.type === "percent"
                      ? `${coupon.value}% OFF`
                      : `৳${coupon.value} OFF`}
                  </motion.h3>

                  <p
                    className={`${
                      darkmode ? "text-gray-300/90" : "text-gray-600/90"
                    } mb-4 leading-relaxed text-xs sm:text-sm lg:text-base line-clamp-2 group-hover:text-opacity-100 transition-all duration-300`}
                  >
                    {coupon.description}
                  </p>

                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 p-0.5 rounded-xl shadow-md">
                      <div
                        className={`${
                          darkmode
                            ? "bg-gray-800/95 text-purple-300 hover:bg-gray-700/95 hover:text-purple-200"
                            : "bg-white/95 text-pink-700 hover:bg-pink-50/95 hover:text-pink-800"
                        } font-mono font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm lg:text-base select-all transition-all duration-300 cursor-pointer backdrop-blur-sm`}
                        onClick={() =>
                          navigator.clipboard?.writeText(coupon.code)
                        }
                      >
                        {coupon.code}
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                      className={`text-xs ${
                        darkmode ? "text-gray-400" : "text-gray-500"
                      } mt-2 transition-opacity duration-300`}
                    >
                      Click to copy
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Beautiful Pagination Controls */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center items-center space-x-2 sm:space-x-4 mt-8"
            >
              {/* Previous Button */}
              <motion.button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-all duration-300 ${
                  currentPage === 1
                    ? darkmode
                      ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200/50 text-gray-400 cursor-not-allowed"
                    : darkmode
                    ? "bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-500/90 hover:to-pink-500/90 text-white shadow-lg hover:shadow-purple-500/25"
                    : "bg-gradient-to-r from-pink-500/80 to-purple-600/80 hover:from-pink-400/90 hover:to-purple-500/90 text-white shadow-lg hover:shadow-pink-500/25"
                } backdrop-blur-sm border ${
                  darkmode ? "border-white/10" : "border-white/20"
                }`}
              >
                <FaChevronLeft className="text-sm" />
              </motion.button>

              {/* Page Numbers */}
              <div className="flex space-x-1 sm:space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <motion.button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-all duration-300 font-bold text-sm sm:text-base ${
                        currentPage === page
                          ? darkmode
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                            : "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25"
                          : darkmode
                          ? "bg-gray-700/50 hover:bg-gray-600/70 text-gray-300 hover:text-white"
                          : "bg-gray-200/50 hover:bg-gray-300/70 text-gray-600 hover:text-gray-800"
                      } backdrop-blur-sm border ${
                        darkmode ? "border-white/10" : "border-white/20"
                      }`}
                    >
                      {page}
                    </motion.button>
                  )
                )}
              </div>

              {/* Next Button */}
              <motion.button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-all duration-300 ${
                  currentPage === totalPages
                    ? darkmode
                      ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200/50 text-gray-400 cursor-not-allowed"
                    : darkmode
                    ? "bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-500/90 hover:to-pink-500/90 text-white shadow-lg hover:shadow-purple-500/25"
                    : "bg-gradient-to-r from-pink-500/80 to-purple-600/80 hover:from-pink-400/90 hover:to-purple-500/90 text-white shadow-lg hover:shadow-pink-500/25"
                } backdrop-blur-sm border ${
                  darkmode ? "border-white/10" : "border-white/20"
                }`}
              >
                <FaChevronRight className="text-sm" />
              </motion.button>
            </motion.div>
          )}
        </>
      )}
    </section>
  );
};

export default PromotionsSection;
