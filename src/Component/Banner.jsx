import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion, useReducedMotion } from "framer-motion";
import { useState, useCallback, useContext, useEffect } from "react";
import {
  FaPlay,
  FaTrophy,
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaSpinner,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
  FaArrowRight,
  FaChevronDown,
} from "react-icons/fa";
import { Themecontext } from "../Context/ThemeContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router";

// Enhanced custom pagination styles with modern design
const customPaginationStyles = `
  .custom-pagination-bullet {
    position: relative !important;
    width: 50px !important;
    height: 50px !important;
    margin: 0 6px !important;
    border-radius: 50% !important;
    background: transparent !important;
    opacity: 1 !important;
    cursor: pointer !important;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
    transform: scale(0.85) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: hidden !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
  }

  .custom-pagination-bullet.light-mode {
    border: 2px solid rgba(255, 255, 255, 0.25) !important;
    background: rgba(255, 255, 255, 0.08) !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
  }

  .custom-pagination-bullet.dark-mode {
    border: 2px solid rgba(255, 255, 255, 0.15) !important;
    background: rgba(255, 255, 255, 0.05) !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
  }

  .custom-pagination-bullet:hover {
    transform: scale(1.05) !important;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2) !important;
  }

  .custom-pagination-bullet.light-mode:hover {
    border-color: rgba(255, 255, 255, 0.4) !important;
    background: rgba(255, 255, 255, 0.15) !important;
  }

  .custom-pagination-bullet.dark-mode:hover {
    border-color: rgba(255, 255, 255, 0.25) !important;
    background: rgba(255, 255, 255, 0.1) !important;
  }

  .custom-pagination-bullet.swiper-pagination-bullet-active {
    transform: scale(1.15) !important;
    box-shadow: 0 16px 50px rgba(59, 130, 246, 0.4) !important;
  }

  .custom-pagination-bullet.swiper-pagination-bullet-active.light-mode {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.9)) !important;
    border-color: rgba(255, 255, 255, 0.6) !important;
  }

  .custom-pagination-bullet.swiper-pagination-bullet-active.dark-mode {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8)) !important;
    border-color: rgba(255, 255, 255, 0.4) !important;
  }

  .bullet-inner {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bullet-progress {
    position: absolute;
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    border-radius: 50%;
    background: conic-gradient(from 0deg, transparent 0deg, rgba(59, 130, 246, 0.6) 360deg);
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .custom-pagination-bullet.swiper-pagination-bullet-active .bullet-progress {
    opacity: 1;
    animation: rotate 8s linear infinite;
  }

  .bullet-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .custom-pagination-bullet.light-mode .bullet-glow {
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  }

  .custom-pagination-bullet.dark-mode .bullet-glow {
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  }

  .custom-pagination-bullet.swiper-pagination-bullet-active .bullet-glow {
    width: 24px;
    height: 24px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
  }

  .bullet-number {
    position: relative;
    z-index: 2;
    font-size: 13px;
    font-weight: 800;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: 'Inter', system-ui, sans-serif;
  }

  .custom-pagination-bullet.light-mode .bullet-number {
    color: rgba(255, 255, 255, 0.9);
  }

  .custom-pagination-bullet.dark-mode .bullet-number {
    color: rgba(255, 255, 255, 0.7);
  }

  .custom-pagination-bullet.swiper-pagination-bullet-active .bullet-number {
    color: white;
    font-size: 15px;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .swiper-pagination {
    bottom: 40px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 8px !important;
    z-index: 20 !important;
  }

  @media (max-width: 1024px) {
    .swiper-pagination {
      bottom: 30px !important;
      gap: 6px !important;
    }
  }

  @media (max-width: 768px) {
    .swiper-pagination {
      display: none !important;
    }
  }
`;

const Banner = () => {
  const { darkmode } = useContext(Themecontext);
  const [imageLoadingStates, setImageLoadingStates] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [, setActiveSlide] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Inject custom pagination styles
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = customPaginationStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Professional slides data with reduced text content
  const slides = [
    {
      id: 1,
      image:
        "https://i.ibb.co.com/JRbZ2Kmv/mr-lee-f4-RBYs-Y2hx-A-unsplash-1.jpg",
      fallbackImage:
        "https://i.ibb.co.com/JRbZ2Kmv/mr-lee-f4-RBYs-Y2hx-A-unsplash-1.jpg",
      category: "SPORTS HUB",
      title: "Welcome to SportivoX",
      subtitle: "Premier Sports Management",
      description:
        "World-class facilities with cutting-edge technology for your athletic journey.",
      stats: { icon: <FaUsers />, value: "500+", label: "Members" },
      features: [
        { icon: <FaClock />, text: "24/7 Booking" },
        { icon: <FaTrophy />, text: "Pro Coaching" },
        { icon: <FaShieldAlt />, text: "Premium Courts" },
      ],
      gradient: "from-blue-900/90 via-purple-900/85 to-indigo-900/90",
      accentColor: "blue-500",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      fallbackImage:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "ELITE COURTS",
      title: "Modern Facilities",
      subtitle: "Premium Infrastructure",
      description:
        "Train with professional-grade equipment and cutting-edge technology.",

      stats: { icon: <FaTrophy />, value: "50+", label: "Championships" },
      features: [
        { icon: <FaStar />, text: "Olympic Grade" },
        { icon: <FaPlay />, text: "Latest Tech" },
        { icon: <FaMapMarkerAlt />, text: "Climate Control" },
      ],
      gradient: "from-emerald-900/90 via-teal-900/85 to-cyan-900/90",
      accentColor: "emerald-500",
    },
    {
      id: 3,
      image:
        "https://i.ibb.co.com/Jjp0CGYG/bruce-mars-g-Jt-Dg6-Wf-Ml-Q-unsplash-1.jpg",
      fallbackImage:
        "https://i.ibb.co.com/Jjp0CGYG/bruce-mars-g-Jt-Dg6-Wf-Ml-Q-unsplash-1.jpg",
      category: "PRO TRAINING",
      title: "Expert Coaching",
      subtitle: "Personalized Programs",
      description:
        "Certified coaches with custom training and performance analytics.",
      stats: { icon: <FaStar />, value: "4.9", label: "Rating" },
      features: [
        { icon: <FaCheckCircle />, text: "Certified Staff" },
        { icon: <FaUsers />, text: "Custom Plans" },
        { icon: <FaTrophy />, text: "Analytics" },
      ],
      gradient: "from-orange-900/90 via-red-900/85 to-pink-900/90",
      accentColor: "orange-500",
    },
    {
      id: 4,
      image: "https://i.ibb.co.com/1JJgk43H/pexels-timmossholder-1080882-1.jpg",
      fallbackImage:
        "https://i.ibb.co.com/1JJgk43H/pexels-timmossholder-1080882-1.jpg",
      category: "COMMUNITY",
      title: "Sports Community",
      subtitle: "Connect & Compete",
      description:
        "Join tournaments, meet players, and build lasting sports connections.",
      stats: { icon: <FaUsers />, value: "1K+", label: "Community" },
      features: [
        { icon: <FaUsers />, text: "Tournaments" },
        { icon: <FaTrophy />, text: "Competitions" },
        { icon: <FaStar />, text: "Rankings" },
      ],
      gradient: "from-purple-900/90 via-pink-900/85 to-red-900/90",
      accentColor: "purple-500",
    },
  ];

  // Image loading handlers
  const handleImageLoad = useCallback((slideId) => {
    setImageLoadingStates((prev) => ({ ...prev, [slideId]: false }));
  }, []);

  const handleImageError = useCallback((slideId) => {
    setImageErrors((prev) => ({ ...prev, [slideId]: true }));
    setImageLoadingStates((prev) => ({ ...prev, [slideId]: false }));
  }, []);

  const handleImageLoadStart = useCallback((slideId) => {
    setImageLoadingStates((prev) => ({ ...prev, [slideId]: true }));
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.8, ease: "easeOut" },
    },
  };

  const slideVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.7, ease: "easeOut" },
    },
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div
      className={`absolute inset-0 ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 to-black"
          : "bg-gradient-to-br from-slate-800 to-slate-900"
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent ${
          darkmode ? "via-gray-300/5" : "via-white/5"
        } to-transparent animate-pulse`}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`${darkmode ? "text-gray-400/60" : "text-white/60"}`}>
          <FaSpinner className="text-4xl animate-spin" />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`relative w-full min-h-screen ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"
      } overflow-hidden`}
    >
      {/* Enhanced Background Pattern */}
      <div
        className={`absolute inset-0 ${darkmode ? "opacity-10" : "opacity-20"}`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: darkmode
              ? `
              radial-gradient(circle at 20% 20%, rgba(75, 85, 99, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(55, 65, 81, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(31, 41, 55, 0.3) 0%, transparent 50%),
              linear-gradient(45deg, transparent 30%, rgba(156, 163, 175, 0.05) 50%, transparent 70%)
            `
              : `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 50%),
              linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.03) 50%, transparent 70%)
            `,
          }}
        />
      </div>

      {/* Professional Floating Elements */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`absolute top-16 right-16 w-32 h-32 lg:w-48 lg:h-48 border-2 ${
              darkmode ? "border-gray-400/10" : "border-white/10"
            } rounded-full backdrop-blur-[1px]`}
          />
          <motion.div
            animate={{
              rotate: -360,
              y: [0, -25, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute bottom-32 left-16 w-24 h-24 lg:w-36 lg:h-36 ${
              darkmode
                ? "bg-gradient-to-r from-gray-600/10 to-gray-700/10 border-gray-400/5"
                : "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-white/5"
            } rounded-2xl backdrop-blur-[1px] shadow-lg border`}
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute top-1/2 left-8 w-20 h-20 lg:w-28 lg:h-28 ${
              darkmode
                ? "bg-gradient-to-r from-gray-500/25 to-gray-600/25"
                : "bg-gradient-to-r from-emerald-400/25 to-cyan-400/25"
            } rounded-full shadow-xl`}
          />
        </div>
      )}

      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
          renderBullet: function (index, className) {
            return `
              <div class="${className} custom-pagination-bullet ${
              darkmode ? "dark-mode" : "light-mode"
            }">
                <div class="bullet-inner">
                  <div class="bullet-progress"></div>
                  <div class="bullet-glow"></div>
                </div>
                <span class="bullet-number">${index + 1}</span>
              </div>
            `;
          },
        }}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        className="h-screen w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden">
                {imageLoadingStates[slide.id] && <LoadingSkeleton />}
                <img
                  src={
                    imageErrors[slide.id] ? slide.fallbackImage : slide.image
                  }
                  alt={slide.title}
                  className="w-full h-full object-cover object-center transition-transform duration-[10000ms] ease-out hover:scale-105"
                  style={{
                    width: "100%",
                    height: "100vh",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  onLoadStart={() => handleImageLoadStart(slide.id)}
                  onLoad={() => handleImageLoad(slide.id)}
                  onError={() => handleImageError(slide.id)}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>

              {/* Professional Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

              {/* Enhanced Content Container with Modern Layout */}
              <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12 z-20">
                <div className="max-w-7xl mx-auto w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[85vh]">
                    {/* Main Content - Optimized Compact Layout */}
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="lg:col-span-8 text-center lg:text-left space-y-4 sm:space-y-5 lg:space-y-6"
                    >
                      {/* Compact Category Badge */}
                      <motion.div variants={itemVariants}>
                        <div className="flex justify-center lg:justify-start">
                          <span
                            className={`inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wider ${
                              darkmode
                                ? "bg-white/5 border border-white/10 text-white/90 shadow-xl"
                                : "bg-white/10 border border-white/20 text-white shadow-xl"
                            } backdrop-blur-xl hover:scale-105 transition-all duration-500 cursor-default`}
                            style={{
                              background: darkmode
                                ? "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))"
                                : "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))",
                            }}
                          >
                            <span
                              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-${
                                slide.accentColor
                              } to-${slide.accentColor.replace(
                                "500",
                                "400"
                              )} mr-2 sm:mr-3 animate-pulse shadow-lg`}
                            ></span>
                            {slide.category}
                          </span>
                        </div>
                      </motion.div>

                      {/* Compact Main Title with Better Typography */}
                      <motion.div
                        variants={itemVariants}
                        className="space-y-2 sm:space-y-3"
                      >
                        <h1
                          className={`font-black ${
                            darkmode ? "text-white" : "text-white"
                          } leading-tight tracking-tight`}
                          style={{
                            fontSize: "clamp(4.25rem, 3.5vw, 2.75rem)",
                            lineHeight: "clamp(1.1, 1.15, 1.2)",
                            textShadow: darkmode
                              ? "0 3px 15px rgba(0, 0, 0, 0.5), 0 6px 30px rgba(0, 0, 0, 0.3)"
                              : "0 3px 15px rgba(0, 0, 0, 0.4), 0 6px 30px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          <span className="block mb-1">
                            {slide.title.split(" ").slice(0, 2).join(" ")}
                          </span>
                          <span
                            className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                            style={{
                              backgroundImage: `linear-gradient(135deg, 
                                ${
                                  slide.accentColor === "blue-500"
                                    ? "#60A5FA, #A855F7, #EC4899"
                                    : slide.accentColor === "emerald-500"
                                    ? "#34D399, #06B6D4, #8B5CF6"
                                    : slide.accentColor === "purple-500"
                                    ? "#A855F7, #EC4899, #F59E0B"
                                    : slide.accentColor === "teal-500"
                                    ? "#14B8A6, #06B6D4, #8B5CF6"
                                    : "#FB7185, #F59E0B, #EF4444"
                                })`,
                            }}
                          >
                            {slide.title.split(" ").slice(2).join(" ")}
                          </span>
                        </h1>
                        <h2
                          className={`font-semibold ${
                            darkmode ? "text-gray-100/90" : "text-white/90"
                          } leading-snug max-w-2xl mx-auto lg:mx-0`}
                          style={{
                            fontSize: "clamp(0.75rem, 2vw, 1.125rem)",
                            textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          {slide.subtitle}
                        </h2>
                      </motion.div>

                      {/* Compact Description */}
                      <motion.p
                        variants={itemVariants}
                        className={`${
                          darkmode ? "text-gray-200/85" : "text-white/85"
                        } leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium`}
                        style={{
                          fontSize: "clamp(0.875rem, 1.75vw, 1rem)",
                          lineHeight: "clamp(1.4, 1.5, 1.6)",
                          textShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        {slide.description}
                      </motion.p>
                      {/* Compact Features List */}
                      <motion.div variants={itemVariants} className="pt-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto lg:mx-0">
                          {slide.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              whileHover={{ scale: 1.03, y: -3 }}
                              transition={{ duration: 0.3 }}
                              className={`group relative flex items-center justify-center lg:justify-start space-x-2 sm:space-x-3 ${
                                darkmode
                                  ? "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
                                  : "bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30"
                              } backdrop-blur-xl rounded-xl px-3 py-3 sm:px-4 sm:py-3 transition-all duration-500 shadow-lg hover:shadow-xl cursor-default`}
                            >
                              <div
                                className={`p-1.5 rounded-lg bg-gradient-to-r from-${
                                  slide.accentColor
                                } to-${slide.accentColor.replace(
                                  "500",
                                  "400"
                                )} shadow-md group-hover:scale-110 transition-transform duration-300`}
                              >
                                <span className="text-white text-sm sm:text-base">
                                  {feature.icon}
                                </span>
                              </div>
                              <span
                                className={`${
                                  darkmode ? "text-white/90" : "text-white/90"
                                } text-xs sm:text-sm font-semibold`}
                              >
                                {feature.text}
                              </span>
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Compact Beautiful Stats Card */}
                    <motion.div
                      variants={slideVariants}
                      initial="hidden"
                      animate="visible"
                      className="lg:col-span-4 flex justify-center lg:justify-end mt-2 lg:mt-0"
                    >
                      <div
                        className={`group relative ${
                          darkmode
                            ? "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
                            : "bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30"
                        } backdrop-blur-2xl rounded-2xl p-5 sm:p-6 lg:p-7 shadow-2xl hover:shadow-3xl max-w-xs w-full transition-all duration-700 transform hover:scale-105 hover:-translate-y-2`}
                        style={{
                          background: darkmode
                            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))"
                            : "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))",
                        }}
                      >
                        {/* Animated Background Glow */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <div className="relative z-10 text-center space-y-5 sm:space-y-6">
                          {/* Compact Icon with Animation */}
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                            className={`text-4xl sm:text-5xl text-${slide.accentColor} flex justify-center drop-shadow-xl`}
                          >
                            <div
                              className={`p-3 rounded-xl bg-gradient-to-r from-${
                                slide.accentColor
                              }/20 to-${slide.accentColor.replace(
                                "500",
                                "400"
                              )}/20 backdrop-blur-sm`}
                            >
                              {slide.stats.icon}
                            </div>
                          </motion.div>

                          {/* Compact Stats Display */}
                          <div className="space-y-2">
                            <div
                              className={`text-3xl sm:text-4xl font-black ${
                                darkmode ? "text-white" : "text-white"
                              }`}
                              style={{
                                textShadow: "0 3px 15px rgba(0, 0, 0, 0.3)",
                              }}
                            >
                              {slide.stats.value}
                            </div>
                            <div
                              className={`${
                                darkmode ? "text-gray-200/90" : "text-white/90"
                              } font-bold text-sm sm:text-base tracking-wide`}
                            >
                              {slide.stats.label}
                            </div>
                          </div>

                          {/* Compact Feature List */}
                          <div className="space-y-2">
                            {slide.features.map((feature, idx) => (
                              <motion.div
                                key={idx}
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                                className={`flex items-center justify-center space-x-3 ${
                                  darkmode ? "text-white/90" : "text-white/90"
                                } justify-center group/item`}
                              >
                                <div
                                  className={`p-1.5 rounded-lg bg-gradient-to-r from-${
                                    slide.accentColor
                                  }/30 to-${slide.accentColor.replace(
                                    "500",
                                    "400"
                                  )}/30 backdrop-blur-sm group-hover/item:scale-110 transition-transform duration-300`}
                                >
                                  <span
                                    className={`text-${slide.accentColor} text-sm`}
                                  >
                                    {feature.icon}
                                  </span>
                                </div>
                                <span
                                  className={`font-semibold text-xs sm:text-sm ${
                                    darkmode ? "text-white" : "text-white"
                                  }`}
                                >
                                  {feature.text}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
