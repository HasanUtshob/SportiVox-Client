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
} from "react-icons/fa";
import { Themecontext } from "../Context/ThemeContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Custom pagination styles
const customPaginationStyles = `
  .custom-pagination-bullet {
    position: relative !important;
    width: 60px !important;
    height: 60px !important;
    margin: 0 8px !important;
    border-radius: 50% !important;
    background: transparent !important;
    opacity: 1 !important;
    cursor: pointer !important;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
    transform: scale(0.8) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: hidden !important;
  }

  .custom-pagination-bullet.light-mode {
    border: 2px solid rgba(255, 255, 255, 0.3) !important;
    backdrop-filter: blur(10px) !important;
    background: rgba(255, 255, 255, 0.1) !important;
  }

  .custom-pagination-bullet.dark-mode {
    border: 2px solid rgba(156, 163, 175, 0.3) !important;
    backdrop-filter: blur(10px) !important;
    background: rgba(75, 85, 99, 0.2) !important;
  }

  .custom-pagination-bullet:hover {
    transform: scale(1) !important;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;
  }

  .custom-pagination-bullet.light-mode:hover {
    border-color: rgba(255, 255, 255, 0.6) !important;
    background: rgba(255, 255, 255, 0.2) !important;
  }

  .custom-pagination-bullet.dark-mode:hover {
    border-color: rgba(156, 163, 175, 0.6) !important;
    background: rgba(75, 85, 99, 0.4) !important;
  }

  .custom-pagination-bullet.swiper-pagination-bullet-active {
    transform: scale(1.2) !important;
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4) !important;
  }

  .custom-pagination-bullet.swiper-pagination-bullet-active.light-mode {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8)) !important;
    border-color: rgba(255, 255, 255, 0.8) !important;
  }

  .custom-pagination-bullet.swiper-pagination-bullet-active.dark-mode {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.6)) !important;
    border-color: rgba(156, 163, 175, 0.8) !important;
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(from 0deg, transparent 0deg, rgba(59, 130, 246, 0.3) 360deg);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .custom-pagination-bullet.swiper-pagination-bullet-active .bullet-progress {
    opacity: 1;
    animation: rotate 6s linear infinite;
  }

  .bullet-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
  }

  .custom-pagination-bullet.light-mode .bullet-glow {
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  }

  .custom-pagination-bullet.dark-mode .bullet-glow {
    background: rgba(156, 163, 175, 0.4);
    box-shadow: 0 0 15px rgba(156, 163, 175, 0.3);
  }

  .custom-pagination-bullet.swiper-pagination-bullet-active .bullet-glow {
    width: 30px;
    height: 30px;
    background: rgba(59, 130, 246, 0.6);
    box-shadow: 0 0 25px rgba(59, 130, 246, 0.5);
  }

  .bullet-number {
    position: relative;
    z-index: 2;
    font-size: 14px;
    font-weight: 700;
    transition: all 0.4s ease;
  }

  .custom-pagination-bullet.light-mode .bullet-number {
    color: rgba(255, 255, 255, 0.8);
  }

  .custom-pagination-bullet.dark-mode .bullet-number {
    color: rgba(156, 163, 175, 0.8);
  }

  .custom-pagination-bullet.swiper-pagination-bullet-active .bullet-number {
    color: white;
    font-size: 16px;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .swiper-pagination {
    bottom: 30px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 10px !important;
  }

  @media (max-width: 768px) {
    .custom-pagination-bullet {
      width: 45px !important;
      height: 45px !important;
      margin: 0 4px !important;
    }
    
    .bullet-number {
      font-size: 12px !important;
    }
    
    .custom-pagination-bullet.swiper-pagination-bullet-active .bullet-number {
      font-size: 14px !important;
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

  // Professional slides data with high-quality images
  const slides = [
    {
      id: 1,
      image:
        "https://i.ibb.co.com/JRbZ2Kmv/mr-lee-f4-RBYs-Y2hx-A-unsplash-1.jpg",
      fallbackImage:
        "https://i.ibb.co.com/JRbZ2Kmv/mr-lee-f4-RBYs-Y2hx-A-unsplash-1.jpg",
      category: "SPORTS EXCELLENCE",
      title: "Welcome to SportivoX",
      subtitle: "Your Premier Sports Management Platform",
      description:
        "Experience world-class facilities and professional sports management with cutting-edge technology and personalized service that elevates your athletic journey.",
      primaryBtn: "Book a Court",
      secondaryBtn: "Watch Demo",
      stats: { icon: <FaUsers />, value: "500+", label: "Active Members" },
      features: [
        { icon: <FaClock />, text: "24/7 Online Booking" },
        { icon: <FaTrophy />, text: "Professional Coaching" },
        { icon: <FaShieldAlt />, text: "Premium Facilities" },
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
      category: "ELITE FACILITIES",
      title: "State-of-the-Art Courts",
      subtitle: "Premium Sports Infrastructure",
      description:
        "Train like a champion with our world-class facilities, professional-grade equipment, and cutting-edge technology designed for peak performance.",
      primaryBtn: "Explore Courts",
      secondaryBtn: "Virtual Tour",
      stats: { icon: <FaTrophy />, value: "50+", label: "Championships" },
      features: [
        { icon: <FaStar />, text: "Olympic Standards" },
        { icon: <FaPlay />, text: "Latest Equipment" },
        { icon: <FaMapMarkerAlt />, text: "Climate Controlled" },
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
      category: "PROFESSIONAL TRAINING",
      title: "Expert Coaching Programs",
      subtitle: "Personalized Training Excellence",
      description:
        "Elevate your game with certified coaches, customized training programs, and advanced performance analytics that unlock your true potential.",
      primaryBtn: "Find Coach",
      secondaryBtn: "Training Plans",
      stats: { icon: <FaStar />, value: "4.9", label: "Rating" },
      features: [
        { icon: <FaCheckCircle />, text: "Certified Coaches" },
        { icon: <FaUsers />, text: "Custom Programs" },
        { icon: <FaTrophy />, text: "Performance Analytics" },
      ],
      gradient: "from-orange-900/90 via-red-900/85 to-pink-900/90",
      accentColor: "orange-500",
    },
    {
      id: 4,
      image: "https://i.ibb.co.com/1JJgk43H/pexels-timmossholder-1080882-1.jpg",
      fallbackImage:
        "https://i.ibb.co.com/1JJgk43H/pexels-timmossholder-1080882-1.jpg",
      category: "PROFESSIONAL TRAINING",
      title: "Expert Coaching Programs",
      subtitle: "Personalized Training Excellence",
      description:
        "Elevate your game with certified coaches, customized training programs, and advanced performance analytics that unlock your true potential.",
      primaryBtn: "Find Coach",
      secondaryBtn: "Training Plans",
      stats: { icon: <FaStar />, value: "4.9", label: "Rating" },
      features: [
        { icon: <FaCheckCircle />, text: "Certified Coaches" },
        { icon: <FaUsers />, text: "Custom Programs" },
        { icon: <FaTrophy />, text: "Performance Analytics" },
      ],
      gradient: "from-orange-900/90 via-red-900/85 to-pink-900/90",
      accentColor: "orange-500",
    },
    {
      id: 5,
      image:
        "https://i.ibb.co.com/fVb2xcPQ/pexels-coco-championship-191448.jpg",
      fallbackImage:
        "https://i.ibb.co.com/fVb2xcPQ/pexels-coco-championship-191448.jpg",
      category: "PROFESSIONAL TRAINING",
      title: "Expert Coaching Programs",
      subtitle: "Personalized Training Excellence",
      description:
        "Elevate your game with certified coaches, customized training programs, and advanced performance analytics that unlock your true potential.",
      primaryBtn: "Find Coach",
      secondaryBtn: "Training Plans",
      stats: { icon: <FaStar />, value: "4.9", label: "Rating" },
      features: [
        { icon: <FaCheckCircle />, text: "Certified Coaches" },
        { icon: <FaUsers />, text: "Custom Programs" },
        { icon: <FaTrophy />, text: "Performance Analytics" },
      ],
      gradient: "from-orange-900/90 via-red-900/85 to-pink-900/90",
      accentColor: "orange-500",
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

              {/* Content Container - Fully Responsive */}
              <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12">
                <div className="max-w-7xl mx-auto w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]">
                    {/* Main Content - Responsive Layout */}
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-8 lg:space-y-10"
                    >
                      {/* Category Badge */}
                      <motion.div variants={itemVariants}>
                        <span
                          className={`inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm lg:text-base font-bold tracking-wider ${
                            darkmode
                              ? "bg-gray-800/40 border-gray-600/30 text-gray-200"
                              : "bg-white/20 border-white/30 text-white"
                          } backdrop-blur-sm border shadow-lg`}
                        >
                          <span
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-${slide.accentColor} mr-2 sm:mr-3 animate-pulse`}
                          ></span>
                          {slide.category}
                        </span>
                      </motion.div>

                      {/* Main Title - Highly Responsive Typography */}
                      <motion.div
                        variants={itemVariants}
                        className="space-y-4 sm:space-y-6"
                      >
                        <h1
                          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black ${
                            darkmode ? "text-gray-100" : "text-white"
                          } leading-tight sm:leading-tight`}
                        >
                          <span className="block">
                            {slide.title.split(" ").slice(0, 2).join(" ")}
                          </span>
                          <span
                            className={`block bg-gradient-to-r from-${
                              slide.accentColor
                            } to-${slide.accentColor.replace(
                              "500",
                              "600"
                            )} bg-clip-text text-transparent`}
                          >
                            {slide.title.split(" ").slice(2).join(" ")}
                          </span>
                        </h1>
                        <h2
                          className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold ${
                            darkmode ? "text-gray-200/90" : "text-white/90"
                          } leading-relaxed max-w-4xl mx-auto lg:mx-0`}
                        >
                          {slide.subtitle}
                        </h2>
                      </motion.div>

                      {/* Description - Responsive Text */}
                      <motion.p
                        variants={itemVariants}
                        className={`text-base sm:text-lg md:text-xl lg:text-2xl ${
                          darkmode ? "text-gray-300/80" : "text-white/80"
                        } leading-relaxed max-w-3xl mx-auto lg:mx-0 font-medium`}
                      >
                        {slide.description}
                      </motion.p>

                      {/* Features List - Responsive Grid */}
                      <motion.div variants={itemVariants} className="block">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-2xl mx-auto lg:mx-0">
                          {slide.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className={`flex items-center justify-center lg:justify-start space-x-2 sm:space-x-3 ${
                                darkmode
                                  ? "bg-gray-800/20 border-gray-600/20 hover:bg-gray-700/30"
                                  : "bg-white/10 border-white/20 hover:bg-white/20"
                              } backdrop-blur-sm rounded-full px-3 py-2 sm:px-4 sm:py-3 border transition-all duration-300`}
                            >
                              <span
                                className={`text-${slide.accentColor} text-sm sm:text-base`}
                              >
                                {feature.icon}
                              </span>
                              <span
                                className={`${
                                  darkmode
                                    ? "text-gray-200/90"
                                    : "text-white/90"
                                } text-xs sm:text-sm lg:text-base font-medium`}
                              >
                                {feature.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Stats Card - Responsive Positioning */}
                    <motion.div
                      variants={slideVariants}
                      initial="hidden"
                      animate="visible"
                      className="lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0"
                    >
                      <div
                        className={`${
                          darkmode
                            ? "bg-gray-800/20 border-gray-600/20 hover:bg-gray-700/25"
                            : "bg-white/10 border-white/20 hover:bg-white/15"
                        } backdrop-blur-lg rounded-3xl p-6 sm:p-8 lg:p-10 border shadow-2xl max-w-sm w-full transition-all duration-300`}
                      >
                        <div className="text-center space-y-6 sm:space-y-8">
                          <div
                            className={`text-4xl sm:text-5xl lg:text-6xl text-${slide.accentColor} flex justify-center`}
                          >
                            {slide.stats.icon}
                          </div>
                          <div>
                            <div
                              className={`text-3xl sm:text-4xl lg:text-5xl font-black ${
                                darkmode ? "text-gray-100" : "text-white"
                              } mb-2 sm:mb-4`}
                            >
                              {slide.stats.value}
                            </div>
                            <div
                              className={`${
                                darkmode ? "text-gray-300/80" : "text-white/80"
                              } font-semibold text-base sm:text-lg lg:text-xl`}
                            >
                              {slide.stats.label}
                            </div>
                          </div>
                          <div className="space-y-3 sm:space-y-4">
                            {slide.features.map((feature, idx) => (
                              <div
                                key={idx}
                                className={`flex items-center space-x-3 sm:space-x-4 ${
                                  darkmode
                                    ? "text-gray-200/90"
                                    : "text-white/90"
                                } justify-center`}
                              >
                                <span
                                  className={`text-${slide.accentColor} text-base sm:text-lg`}
                                >
                                  {feature.icon}
                                </span>
                                <span
                                  className={`font-medium text-sm sm:text-base lg:text-lg ${
                                    darkmode ? "text-gray-200" : "text-white"
                                  }`}
                                >
                                  {feature.text}
                                </span>
                              </div>
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
