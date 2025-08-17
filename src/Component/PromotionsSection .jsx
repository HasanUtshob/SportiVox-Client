import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaTag } from "react-icons/fa";
import useAxios from "../hooks/useAxios";
import { Themecontext } from "../Context/ThemeContext";

const PromotionsSection = () => {
  const { darkmode } = useContext(Themecontext);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <section className="w-11/12 md:w-10/12 mx-auto my-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent mb-6">
          🎁 Special Promotions
        </h2>
        <p
          className={`text-center ${
            darkmode ? "text-gray-300" : "text-gray-600"
          } mb-4 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto`}
        >
          Unlock amazing savings with our exclusive promo codes and special
          offers!
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coupons.map((coupon, index) => (
            <motion.div
              key={coupon._id || index}
              className={`group relative ${
                darkmode
                  ? "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 border-gray-600 hover:border-gray-500 hover:shadow-2xl hover:shadow-purple-500/20"
                  : "bg-gradient-to-br from-white via-pink-50 to-purple-50 border-pink-200 hover:border-pink-300 hover:shadow-2xl hover:shadow-pink-500/20"
              } shadow-xl p-8 rounded-3xl text-center border transition-all duration-500 transform hover:-translate-y-2 overflow-hidden`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Background Decoration */}
              <div
                className={`absolute top-0 right-0 w-20 h-20 ${
                  darkmode
                    ? "bg-gradient-to-br from-gray-600 to-gray-500"
                    : "bg-gradient-to-br from-pink-200 to-purple-200"
                } rounded-full -translate-y-10 translate-x-10 opacity-50`}
              ></div>
              <div
                className={`absolute bottom-0 left-0 w-16 h-16 ${
                  darkmode
                    ? "bg-gradient-to-tr from-gray-500 to-gray-600"
                    : "bg-gradient-to-tr from-orange-200 to-pink-200"
                } rounded-full translate-y-8 -translate-x-8 opacity-50`}
              ></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <FaTag className="text-3xl text-white" />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  {coupon.type === "percent"
                    ? `${coupon.value}% OFF`
                    : `৳${coupon.value} OFF`}
                </h3>

                <p
                  className={`${
                    darkmode ? "text-gray-300" : "text-gray-600"
                  } mb-6 leading-relaxed text-sm md:text-base`}
                >
                  {coupon.description}
                </p>

                <div className="relative">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-0.5 rounded-2xl">
                    <div
                      className={`${
                        darkmode
                          ? "bg-gray-800 text-purple-300 hover:bg-gray-700"
                          : "bg-white text-pink-700 hover:bg-pink-50"
                      } font-mono font-bold py-3 px-6 rounded-2xl text-lg select-all transition-colors duration-300 cursor-pointer`}
                    >
                      {coupon.code}
                    </div>
                  </div>
                  <div
                    className={`text-xs ${
                      darkmode ? "text-gray-400" : "text-gray-500"
                    } mt-2`}
                  >
                    Click to copy
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PromotionsSection;
