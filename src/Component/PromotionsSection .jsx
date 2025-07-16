import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTag } from "react-icons/fa";
import axios from "axios";

const PromotionsSection = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get("http://localhost:5000/all_coupons");
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
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-pink-600 mb-4">
        🎁 Special Promotions
      </h2>
      <p className="text-center text-gray-600 mb-10 text-lg">
        Use the promo codes below to save on your favorite activities!
      </p>

      {loading ? (
        <p className="text-center text-gray-400">Loading coupons...</p>
      ) : coupons.length === 0 ? (
        <p className="text-center text-gray-500">
          No coupons available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coupons.map((coupon, index) => (
            <motion.div
              key={coupon._id || index}
              className="bg-gradient-to-br from-pink-100 to-purple-200 shadow-lg p-6 rounded-xl text-center border-2 border-pink-300 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex justify-center mb-2">
                <FaTag className="text-3xl text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-pink-800">
                {coupon.type === "percent"
                  ? `${coupon.value}% OFF`
                  : `৳${coupon.value} OFF`}
              </h3>
              <p className="text-gray-700 my-2">{coupon.description}</p>
              <div className="bg-white border-2 border-pink-400 text-pink-700 font-mono py-2 px-4 mt-4 rounded-lg inline-block select-all hover:bg-pink-50">
                {coupon.code}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PromotionsSection;
