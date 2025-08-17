import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaThumbsUp,
  FaQuoteLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaHeart,
  FaStarHalfAlt,
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Themecontext } from "../Context/ThemeContext";

const Reviews = () => {
  const { darkmode } = useContext(Themecontext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedReviews, setLikedReviews] = useState({});

  const reviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar:
          "https://ix-marketing.imgix.net/benefits_unleashed-creativity.png?auto=format,compress&w=50",
        verified: true,
        memberSince: "2023",
      },
      rating: 5,
      title: "Excellent facilities and service!",
      comment:
        "I've been a member for over a year now and I'm absolutely thrilled with SportivoX. The courts are always well-maintained, the booking system is super easy to use, and the staff is incredibly friendly and helpful.",
      date: "2024-01-15",
      helpful: 24,
      notHelpful: 2,
      verified: true,
      recommend: true,
      facility: "Tennis Courts",
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        verified: true,
        memberSince: "2022",
      },
      rating: 4,
      title: "Great courts, minor booking issues",
      comment:
        "The facilities are top-notch and I love playing here. The courts are in excellent condition and the equipment is modern. However, I've had a few issues with the booking system during peak hours.",
      date: "2024-01-10",
      helpful: 18,
      notHelpful: 1,
      verified: true,
      recommend: true,
      facility: "Basketball Courts",
    },
    {
      id: 3,
      user: {
        name: "Emma Wilson",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        verified: true,
        memberSince: "2023",
      },
      rating: 5,
      title: "Best sports facility in the city!",
      comment:
        "I've tried several sports facilities in the area, but SportivoX is by far the best. The variety of courts, the cleanliness, the professional coaching staff, and the community atmosphere make it worth every penny.",
      date: "2024-01-08",
      helpful: 31,
      notHelpful: 0,
      verified: true,
      recommend: true,
      facility: "Multi-Sport",
    },
    {
      id: 4,
      user: {
        name: "David Park",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        verified: true,
        memberSince: "2021",
      },
      rating: 4,
      title: "Good value for money",
      comment:
        "Been a member for 3 years now. The facilities are consistently good and the membership rates are reasonable compared to other places. The new equipment they added last year is fantastic.",
      date: "2024-01-05",
      helpful: 15,
      notHelpful: 3,
      verified: true,
      recommend: true,
      facility: "Fitness Center",
    },
    {
      id: 5,
      user: {
        name: "Lisa Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
        verified: false,
        memberSince: "2024",
      },
      rating: 3,
      title: "Decent facilities, room for improvement",
      comment:
        "The courts are okay and the location is convenient. However, I feel like the customer service could be better. Sometimes the staff seems overwhelmed and response times for issues can be slow.",
      date: "2024-01-02",
      helpful: 8,
      notHelpful: 12,
      verified: false,
      recommend: false,
      facility: "Badminton Courts",
    },
    {
      id: 6,
      user: {
        name: "Alex Thompson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        verified: true,
        memberSince: "2022",
      },
      rating: 5,
      title: "Outstanding coaching programs!",
      comment:
        "The coaching here is absolutely phenomenal. Coach Martinez helped me improve my tennis game tremendously in just 3 months. The personalized training plans and attention to detail are impressive.",
      date: "2023-12-28",
      helpful: 22,
      notHelpful: 1,
      verified: true,
      recommend: true,
      facility: "Tennis Courts",
    },
  ];

  const overallStats = {
    averageRating: 4.3,
    totalReviews: 156,
    ratingDistribution: {
      5: 68,
      4: 45,
      3: 28,
      2: 12,
      1: 3,
    },
    recommendationRate: 89,
  };

  const handleLike = (reviewId) => {
    setLikedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(reviews.length / 3)) %
        Math.ceil(reviews.length / 3)
    );
  };

  const renderStars = (rating, size = "text-lg") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className={`${size} text-yellow-400`} />);
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className={`${size} text-yellow-400`} />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <FaRegStar
          key={`empty-${i}`}
          className={`${size} ${darkmode ? "text-gray-600" : "text-gray-300"}`}
        />
      );
    }

    return stars;
  };

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
            : "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
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
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6"
          >
            <FaStar className="text-4xl" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Reviews & Ratings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`text-xl md:text-2xl ${
              darkmode ? "text-gray-300" : "text-orange-100"
            } max-w-3xl mx-auto`}
          >
            See what our members are saying about their SportivoX experience.
          </motion.p>
        </div>
      </motion.section>

      {/* Overall Stats */}
      <section className="py-16 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={`${
              darkmode ? "bg-gray-800 shadow-2xl" : "bg-white shadow-xl"
            } rounded-3xl p-8`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Average Rating */}
              <div className="text-center">
                <div
                  className={`text-5xl font-bold ${
                    darkmode ? "text-gray-100" : "text-gray-800"
                  } mb-2`}
                >
                  {overallStats.averageRating}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(overallStats.averageRating, "text-2xl")}
                </div>
                <p
                  className={`${darkmode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Based on {overallStats.totalReviews} reviews
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <span
                      className={`text-sm font-medium w-8 ${
                        darkmode ? "text-gray-300" : "text-gray-800"
                      }`}
                    >
                      {rating}
                    </span>
                    <FaStar className="text-yellow-400" />
                    <div
                      className={`flex-1 ${
                        darkmode ? "bg-gray-600" : "bg-gray-200"
                      } rounded-full h-2`}
                    >
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{
                          width: `${
                            (overallStats.ratingDistribution[rating] /
                              overallStats.totalReviews) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span
                      className={`text-sm ${
                        darkmode ? "text-gray-400" : "text-gray-600"
                      } w-8`}
                    >
                      {overallStats.ratingDistribution[rating]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Recommendation Rate */}
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">
                  {overallStats.recommendationRate}%
                </div>
                <p
                  className={`${darkmode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Would recommend SportivoX
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Slider */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Slider Container */}
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(reviews.length / 3) }).map(
                  (_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews
                          .slice(slideIndex * 3, slideIndex * 3 + 3)
                          .map((review, index) => (
                            <motion.div
                              key={review.id}
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: index * 0.1 + 0.8,
                                duration: 0.6,
                              }}
                              className={`${
                                darkmode
                                  ? "bg-gray-800 shadow-2xl hover:shadow-gray-900/50"
                                  : "bg-white shadow-xl hover:shadow-2xl"
                              } rounded-3xl p-8 transition-all duration-300 transform hover:-translate-y-2 h-[500px] flex flex-col`}
                            >
                              {/* Quote Icon */}
                              <div className="relative mb-6">
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                                  <FaQuoteLeft className="text-white text-lg" />
                                </div>
                              </div>

                              {/* User Info */}
                              <div className="flex items-center mb-6">
                                <div className="relative">
                                  <img
                                    src={review.user.avatar}
                                    alt={review.user.name}
                                    className={`w-16 h-16 rounded-full object-cover ring-4 ${
                                      darkmode
                                        ? "ring-orange-900/50"
                                        : "ring-orange-100"
                                    }`}
                                  />
                                  {review.user.verified && (
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                      <FaCheckCircle className="text-white text-sm" />
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4 flex-1">
                                  <h3
                                    className={`text-lg font-bold ${
                                      darkmode
                                        ? "text-gray-100"
                                        : "text-gray-800"
                                    } mb-1`}
                                  >
                                    {review.user.name}
                                  </h3>
                                  <div className="flex items-center mb-1">
                                    {renderStars(review.rating, "text-sm")}
                                  </div>
                                  <p
                                    className={`text-sm ${
                                      darkmode
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    {review.facility} • Member since{" "}
                                    {review.user.memberSince}
                                  </p>
                                </div>
                              </div>

                              {/* Review Content */}
                              <div className="flex-1 mb-6">
                                <h4
                                  className={`text-xl font-semibold ${
                                    darkmode ? "text-gray-100" : "text-gray-800"
                                  } mb-3 line-clamp-2`}
                                >
                                  {review.title}
                                </h4>
                                <p
                                  className={`${
                                    darkmode ? "text-gray-300" : "text-gray-600"
                                  } leading-relaxed line-clamp-4`}
                                >
                                  {review.comment}
                                </p>
                              </div>

                              {/* Review Footer */}
                              <div
                                className={`border-t ${
                                  darkmode
                                    ? "border-gray-700"
                                    : "border-gray-100"
                                } pt-4 mt-auto`}
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-4">
                                    <button
                                      onClick={() => handleLike(review.id)}
                                      className={`flex items-center space-x-1 transition-colors ${
                                        likedReviews[review.id]
                                          ? "text-green-600"
                                          : `${
                                              darkmode
                                                ? "text-gray-400 hover:text-green-400"
                                                : "text-gray-500 hover:text-green-600"
                                            }`
                                      }`}
                                    >
                                      <FaThumbsUp className="text-sm" />
                                      <span className="text-sm font-medium">
                                        {review.helpful +
                                          (likedReviews[review.id] ? 1 : 0)}
                                      </span>
                                    </button>
                                    {review.recommend && (
                                      <span
                                        className={`flex items-center space-x-1 ${
                                          darkmode
                                            ? "text-red-400"
                                            : "text-red-500"
                                        } text-sm`}
                                      >
                                        <FaHeart className="text-sm" />
                                        <span className="font-medium">
                                          Recommends
                                        </span>
                                      </span>
                                    )}
                                  </div>
                                  {review.verified && (
                                    <span
                                      className={`${
                                        darkmode
                                          ? "bg-gradient-to-r from-green-900/50 to-green-800/50 text-green-300"
                                          : "bg-gradient-to-r from-green-100 to-green-200 text-green-800"
                                      } text-xs px-3 py-1 rounded-full font-medium`}
                                    >
                                      Verified
                                    </span>
                                  )}
                                </div>
                                <div
                                  className={`flex items-center text-sm ${
                                    darkmode ? "text-gray-400" : "text-gray-500"
                                  }`}
                                >
                                  <FaCalendarAlt className="mr-2" />
                                  <span>
                                    {new Date(review.date).toLocaleDateString(
                                      "en-US",
                                      {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      }
                                    )}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  )
                )}
              </motion.div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(reviews.length / 3) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "bg-orange-500 w-8"
                        : `${
                            darkmode
                              ? "bg-gray-600 hover:bg-gray-500"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`
                    }`}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
