import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaExpand,
  FaArrowLeft,
  FaDownload,
  FaShare,
  FaStar,
  FaUsers,
  FaTrophy,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  MdSportsBasketball,
  MdSportsTennis,
  MdFitnessCenter,
  MdSportsVolleyball,
} from "react-icons/md";

const Demo = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);

  const demoVideos = [
    {
      id: 1,
      title: "SportivoX Facility Tour",
      description: "Take a virtual tour of our world-class sports facilities",
      thumbnail:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "3:45",
      category: "Facility",
      icon: <MdSportsBasketball className="text-2xl" />,
    },
    {
      id: 2,
      title: "Training Programs Overview",
      description:
        "Discover our comprehensive training programs and coaching methods",
      thumbnail:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "5:20",
      category: "Training",
      icon: <MdFitnessCenter className="text-2xl" />,
    },
    {
      id: 3,
      title: "Member Success Stories",
      description: "Hear from our members about their journey to excellence",
      thumbnail:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "4:15",
      category: "Community",
      icon: <FaTrophy className="text-2xl" />,
    },
    {
      id: 4,
      title: "Equipment & Technology",
      description: "Explore our state-of-the-art equipment and technology",
      thumbnail:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "2:30",
      category: "Technology",
      icon: <MdSportsTennis className="text-2xl" />,
    },
  ];

  const features = [
    {
      icon: <FaUsers className="text-3xl text-blue-500" />,
      title: "Expert Coaching",
      description: "Professional coaches with international experience",
    },
    {
      icon: <MdSportsVolleyball className="text-3xl text-green-500" />,
      title: "Modern Equipment",
      description: "Latest sports equipment and training technology",
    },
    {
      icon: <FaTrophy className="text-3xl text-yellow-500" />,
      title: "Championship Training",
      description: "Programs designed to create champions",
    },
    {
      icon: <FaCalendarAlt className="text-3xl text-purple-500" />,
      title: "Flexible Scheduling",
      description: "Book courts and training sessions anytime",
    },
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVideoSelect = (index) => {
    setCurrentVideo(index);
    setIsPlaying(false);
  };

  const handleGetStarted = () => {
    navigate("/Register");
  };

  const handleBookCourt = () => {
    navigate("/Courts");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors duration-300"
            >
              <FaArrowLeft className="text-lg" />
              <span className="font-semibold">Back</span>
            </button>
            <h1 className="text-2xl font-bold text-white">SportivoX Demo</h1>
            <div className="flex items-center gap-4">
              <button className="text-white hover:text-blue-300 transition-colors">
                <FaShare className="text-lg" />
              </button>
              <button className="text-white hover:text-blue-300 transition-colors">
                <FaDownload className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              {/* Video Container */}
              <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <img
                  src={demoVideos[currentVideo].thumbnail}
                  alt={demoVideos[currentVideo].title}
                  className="w-full h-full object-cover"
                />

                {/* Play/Pause Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button
                    onClick={handlePlayPause}
                    className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                  >
                    {isPlaying ? (
                      <FaPause className="text-2xl" />
                    ) : (
                      <FaPlay className="text-2xl ml-1" />
                    )}
                  </button>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <button className="hover:text-blue-300 transition-colors">
                      <FaVolumeUp />
                    </button>
                    <span className="text-sm font-medium">
                      {demoVideos[currentVideo].duration}
                    </span>
                  </div>
                  <button className="hover:text-blue-300 transition-colors">
                    <FaExpand />
                  </button>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                    {demoVideos[currentVideo].icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {demoVideos[currentVideo].title}
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                      {demoVideos[currentVideo].description}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleGetStarted}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started
                  </button>
                  <button
                    onClick={handleBookCourt}
                    className="flex-1 bg-white/10 backdrop-blur-xl text-white font-bold py-3 px-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    Book a Court
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Video Playlist */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Demo Videos</h3>
              <div className="space-y-3">
                {demoVideos.map((video, index) => (
                  <button
                    key={video.id}
                    onClick={() => handleVideoSelect(index)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                      currentVideo === index
                        ? "bg-blue-500/20 border border-blue-400/40"
                        : "bg-white/5 hover:bg-white/10 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white text-sm truncate">
                          {video.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">
                            {video.duration}
                          </span>
                          <span className="text-xs text-blue-400">
                            {video.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">
                Why Choose Us
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold text-white text-sm mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Our Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    2.5K+
                  </div>
                  <div className="text-xs text-gray-400">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    15+
                  </div>
                  <div className="text-xs text-gray-400">Courts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">
                    500+
                  </div>
                  <div className="text-xs text-gray-400">Champions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    4.9
                  </div>
                  <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                    <FaStar className="text-yellow-400" />
                    Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
