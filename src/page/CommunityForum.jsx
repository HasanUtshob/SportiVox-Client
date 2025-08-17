import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaComments,
  FaThumbsUp,
  FaReply,
  FaSearch,
  FaFire,
  FaClock,
  FaEye,
  FaUserCircle,
  FaTags,
  FaFilter,
  FaStar,
  FaTrophy,
  FaMedal,
  FaHeart,
  FaShare,
  FaBookmark,
} from "react-icons/fa";
import { Themecontext } from "../Context/ThemeContext";

const CommunityForum = () => {
  const { darkmode } = useContext(Themecontext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const categories = [
    { id: "all", name: "All Topics", icon: <FaComments />, count: 156 },
    { id: "general", name: "General Discussion", icon: <FaUsers />, count: 45 },
    { id: "training", name: "Training Tips", icon: <FaTrophy />, count: 32 },
    { id: "equipment", name: "Equipment Reviews", icon: <FaStar />, count: 28 },
    {
      id: "events",
      name: "Events & Tournaments",
      icon: <FaMedal />,
      count: 25,
    },
    {
      id: "nutrition",
      name: "Nutrition & Health",
      icon: <FaHeart />,
      count: 26,
    },
  ];

  const forumPosts = [
    {
      id: 1,
      title: "Best training routine for beginners?",
      content:
        "I'm new to sports and looking for advice on starting a training routine. What would you recommend for someone just getting started?",
      author: {
        name: "Sarah Johnson",
        avatar:
          "https://ix-marketing.imgix.net/benefits_unleashed-creativity.png?auto=format,compress&w=150",
        level: "Beginner",
        posts: 12,
        reputation: 45,
      },
      category: "training",
      replies: 8,
      likes: 15,
      views: 124,
      timeAgo: "2 hours ago",
      isPinned: false,
      tags: ["beginner", "training", "advice"],
    },
    {
      id: 2,
      title: "Equipment recommendations for tennis players",
      content:
        "Looking for recommendations on tennis rackets and shoes. Budget is around $300. Any suggestions from experienced players?",
      author: {
        name: "Mike Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        level: "Intermediate",
        posts: 34,
        reputation: 128,
      },
      category: "equipment",
      replies: 12,
      likes: 23,
      views: 89,
      timeAgo: "4 hours ago",
      isPinned: true,
      tags: ["tennis", "equipment", "recommendations"],
    },
    {
      id: 3,
      title: "Upcoming basketball tournament - who's joining?",
      content:
        "We're organizing a community basketball tournament next month. Registration is open! Who's interested in participating?",
      author: {
        name: "Alex Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        level: "Expert",
        posts: 67,
        reputation: 245,
      },
      category: "events",
      replies: 25,
      likes: 42,
      views: 203,
      timeAgo: "6 hours ago",
      isPinned: false,
      tags: ["basketball", "tournament", "community"],
    },
    {
      id: 4,
      title: "Nutrition tips for endurance training",
      content:
        "What are your go-to meals and snacks for long training sessions? Looking for healthy options that provide sustained energy.",
      author: {
        name: "Emma Wilson",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        level: "Advanced",
        posts: 45,
        reputation: 189,
      },
      category: "nutrition",
      replies: 18,
      likes: 31,
      views: 156,
      timeAgo: "1 day ago",
      isPinned: false,
      tags: ["nutrition", "endurance", "health"],
    },
    {
      id: 5,
      title: "Court booking system feedback",
      content:
        "What do you think about the new court booking system? Any features you'd like to see added or improved?",
      author: {
        name: "David Park",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        level: "Pro",
        posts: 89,
        reputation: 312,
      },
      category: "general",
      replies: 15,
      likes: 28,
      views: 178,
      timeAgo: "2 days ago",
      isPinned: false,
      tags: ["feedback", "booking", "system"],
    },
  ];

  const topContributors = [
    {
      name: "David Park",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      posts: 89,
      reputation: 312,
      badge: "Pro",
    },
    {
      name: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      posts: 45,
      reputation: 189,
      badge: "Advanced",
    },
    {
      name: "Alex Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      posts: 67,
      reputation: 245,
      badge: "Expert",
    },
  ];

  const filteredPosts = forumPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.likes - a.likes;
      case "replies":
        return b.replies - a.replies;
      case "views":
        return b.views - a.views;
      default:
        return 0; // Keep original order for "recent"
    }
  });

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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`inline-flex items-center justify-center w-20 h-20 ${
              darkmode ? "bg-gray-600/30" : "bg-white/20"
            } rounded-full mb-6`}
          >
            <FaUsers className="text-4xl" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Community Forum
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`text-xl md:text-2xl ${
              darkmode ? "text-gray-300" : "text-blue-100"
            } max-w-3xl mx-auto`}
          >
            Connect with fellow athletes, share experiences, and learn from the
            community.
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className={`${
                  darkmode ? "bg-gray-800 shadow-2xl" : "bg-white shadow-xl"
                } rounded-3xl p-6`}
              >
                <h3
                  className={`text-xl font-bold ${
                    darkmode ? "text-gray-100" : "text-gray-800"
                  } mb-4`}
                >
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                        selectedCategory === category.id
                          ? "bg-blue-500 text-white"
                          : darkmode
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-gray-50 text-gray-700 hover:bg-blue-50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {category.icon}
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm">{category.count}</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Top Contributors */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className={`${
                  darkmode ? "bg-gray-800 shadow-2xl" : "bg-white shadow-xl"
                } rounded-3xl p-6`}
              >
                <h3
                  className={`text-xl font-bold ${
                    darkmode ? "text-gray-100" : "text-gray-800"
                  } mb-4`}
                >
                  Top Contributors
                </h3>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <img
                        src={contributor.avatar}
                        alt={contributor.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p
                          className={`font-semibold ${
                            darkmode ? "text-gray-100" : "text-gray-800"
                          } text-sm`}
                        >
                          {contributor.name}
                        </p>
                        <div
                          className={`flex items-center space-x-2 text-xs ${
                            darkmode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <span>{contributor.posts} posts</span>
                          <span>•</span>
                          <span>{contributor.reputation} rep</span>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          contributor.badge === "Pro"
                            ? "bg-purple-100 text-purple-800"
                            : contributor.badge === "Expert"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {contributor.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Main Forum Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and Controls */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className={`${
                  darkmode ? "bg-gray-800 shadow-2xl" : "bg-white shadow-xl"
                } rounded-3xl p-6`}
              >
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex-1 relative">
                    <FaSearch
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                        darkmode ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Search discussions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border ${
                        darkmode
                          ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400"
                          : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                      } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className={`px-4 py-3 border ${
                        darkmode
                          ? "border-gray-600 bg-gray-700 text-gray-200"
                          : "border-gray-300 bg-white text-gray-900"
                      } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="recent">Most Recent</option>
                      <option value="popular">Most Popular</option>
                      <option value="replies">Most Replies</option>
                      <option value="views">Most Views</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Forum Posts */}
              <div className="space-y-4">
                {sortedPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                    className={`${
                      darkmode
                        ? "bg-gray-800 shadow-2xl hover:shadow-gray-900/50"
                        : "bg-white shadow-xl hover:shadow-2xl"
                    } rounded-3xl p-6 transition-all duration-300`}
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {post.isPinned && (
                            <FaFire className="text-orange-500" />
                          )}
                          <h3
                            className={`text-xl font-bold ${
                              darkmode
                                ? "text-gray-100 hover:text-blue-400"
                                : "text-gray-800 hover:text-blue-600"
                            } cursor-pointer`}
                          >
                            {post.title}
                          </h3>
                        </div>
                        <p
                          className={`${
                            darkmode ? "text-gray-300" : "text-gray-600"
                          } mb-4 line-clamp-2`}
                        >
                          {post.content}
                        </p>

                        <div className="flex items-center space-x-4 mb-4">
                          <span
                            className={`text-sm font-semibold ${
                              darkmode ? "text-gray-200" : "text-gray-700"
                            }`}
                          >
                            {post.author.name}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              post.author.level === "Pro"
                                ? "bg-purple-100 text-purple-800"
                                : post.author.level === "Expert"
                                ? "bg-yellow-100 text-yellow-800"
                                : post.author.level === "Advanced"
                                ? "bg-green-100 text-green-800"
                                : post.author.level === "Intermediate"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {post.author.level}
                          </span>
                          <span
                            className={`text-sm ${
                              darkmode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {post.timeAgo}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <div
                              className={`flex items-center space-x-2 ${
                                darkmode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              <FaThumbsUp className="text-sm" />
                              <span className="text-sm">{post.likes}</span>
                            </div>
                            <div
                              className={`flex items-center space-x-2 ${
                                darkmode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              <FaReply className="text-sm" />
                              <span className="text-sm">{post.replies}</span>
                            </div>
                            <div
                              className={`flex items-center space-x-2 ${
                                darkmode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              <FaEye className="text-sm" />
                              <span className="text-sm">{post.views}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {post.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityForum;
