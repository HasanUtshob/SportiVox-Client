import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loading = ({ message = "Loading...", variant = "default" }) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [progress, setProgress] = useState(0);

  // Sports-related loading tips
  const sportsTips = [
    "🏸 Preparing your courts...",
    "⚽ Setting up your game...",
    "🏀 Loading player stats...",
    "🎾 Organizing tournaments...",
    "🏐 Checking availability...",
    "🏓 Syncing schedules...",
    "🏆 Loading achievements...",
    "🎯 Optimizing performance...",
  ];

  // Rotate tips every 2 seconds
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % sportsTips.length);
    }, 2000);

    return () => clearInterval(tipInterval);
  }, [sportsTips.length]);

  // Simulate progress for certain variants
  useEffect(() => {
    if (variant === "progress") {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(progressInterval);
    }
  }, [variant]);

  // Different loading variants
  const renderLoadingContent = () => {
    switch (variant) {
      case "minimal":
        return <MinimalLoader message={message} />;
      case "sports":
        return (
          <SportsLoader
            message={message}
            currentTip={currentTip}
            sportsTips={sportsTips}
          />
        );
      case "progress":
        return <ProgressLoader message={message} progress={progress} />;
      case "dashboard":
        return <DashboardLoader message={message} />;
      default:
        return (
          <DefaultLoader
            message={message}
            currentTip={currentTip}
            sportsTips={sportsTips}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-500/10 rounded-full blur-lg"
          animate={{
            y: [-20, 20, -20],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {renderLoadingContent()}
    </div>
  );
};

// Default Sports-themed Loader
const DefaultLoader = ({ message, currentTip, sportsTips }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="flex flex-col items-center space-y-8 relative z-10"
  >
    {/* SportiVox Logo Animation */}
    <motion.div
      className="relative"
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
        <motion.div
          className="text-4xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🏟️
        </motion.div>
      </div>

      {/* Orbiting Elements */}
      <motion.div
        className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>

    {/* Brand Name */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
        SportiVox
      </h1>
      <p className="text-gray-300 text-sm">Sports Management System</p>
    </motion.div>

    {/* Loading Animation */}
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>

    {/* Dynamic Message */}
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTip}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-xl font-semibold text-white mb-2">{message}</p>
        <p className="text-blue-300 text-sm">{sportsTips[currentTip]}</p>
      </motion.div>
    </AnimatePresence>
  </motion.div>
);

// Minimal Loader for quick loads
const MinimalLoader = ({ message }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center space-x-3"
  >
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-white font-medium">{message}</p>
  </motion.div>
);

// Sports-themed Loader with bouncing ball
const SportsLoader = ({ message, currentTip, sportsTips }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center space-y-8"
  >
    {/* Bouncing Sports Ball */}
    <div className="relative w-32 h-32">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-2xl"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-2 border-2 border-white/30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-white/50 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-white/50 rounded-full"></div>
      </motion.div>

      {/* Shadow */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black/20 rounded-full blur-sm"
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>

    <AnimatePresence mode="wait">
      <motion.div
        key={currentTip}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-center"
      >
        <p className="text-xl font-semibold text-white mb-2">{message}</p>
        <p className="text-blue-300">{sportsTips[currentTip]}</p>
      </motion.div>
    </AnimatePresence>
  </motion.div>
);

// Progress Loader
const ProgressLoader = ({ message, progress }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center space-y-6 w-80"
  >
    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
      <span className="text-2xl">🏆</span>
    </div>

    <div className="text-center">
      <p className="text-xl font-semibold text-white mb-4">{message}</p>
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="text-blue-300 text-sm mt-2">
        {Math.round(progress)}% Complete
      </p>
    </div>
  </motion.div>
);

// Dashboard Loader
const DashboardLoader = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center space-y-6"
  >
    <div className="relative">
      <motion.div
        className="w-16 h-16 border-4 border-blue-500/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl">📊</span>
      </div>
    </div>

    <div className="text-center">
      <p className="text-lg font-semibold text-white">{message}</p>
      <p className="text-gray-400 text-sm mt-1">Preparing your workspace...</p>
    </div>
  </motion.div>
);

export default Loading;
