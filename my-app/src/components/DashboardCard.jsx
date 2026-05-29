import React from 'react';
import { motion } from 'framer-motion';

const DashboardCard = () => {
  // Floating animation for the card
  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Pulse animation for the center blob
  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Rotating radar layers
  const rotateVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  const rotateVariantsReverse = {
    animate: {
      rotate: -360,
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  // Spider swinging animation
  const swingVariants = {
    animate: {
      rotate: [-8, 8, -8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Floating particles animation
  const particleVariants = {
    animate: (i) => ({
      y: [0, -20, 0],
      x: [0, Math.cos(i) * 10, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: i * 0.3,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Main Card Container */}
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 w-full max-w-md"
      >
        <div className="relative">
          {/* Card Background with Glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 via-blue-200/10 to-purple-300/20 rounded-[32px] blur-xl opacity-60" />

          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-blue-200/40 to-blue-300/20 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-shadow duration-500 group">
            
            {/* Spider Mascot */}
            <motion.div
              variants={swingVariants}
              animate="animate"
              className="absolute -top-6 right-8 origin-top-right"
            >
              <div className="text-3xl select-none">🕷️</div>
              <div className="absolute top-0 right-1/2 w-1 h-6 bg-gradient-to-b from-blue-400 to-transparent" />
            </motion.div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px]">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={particleVariants}
                  animate="animate"
                  className="absolute w-2 h-2 bg-white rounded-full opacity-60"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: '20%',
                  }}
                />
              ))}
            </div>

            {/* Top Section - Title Area */}
            <div className="relative z-10 mb-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-2">
                Activity Hub
              </h2>
              <p className="text-blue-600/70 text-sm">Your wellness dashboard</p>
            </div>

            {/* Center Visualization - Radar Blobs */}
            <div className="relative h-64 flex items-center justify-center mb-8">
              {/* Outer Glow Layer */}
              <motion.div
                className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* First Rotating Radar Layer */}
              <motion.div
                variants={rotateVariants}
                animate="animate"
                className="absolute w-40 h-40"
              >
                <div className="w-full h-full rounded-full border-2 border-blue-300/40 shadow-lg" />
              </motion.div>

              {/* Second Rotating Radar Layer (Reverse) */}
              <motion.div
                variants={rotateVariantsReverse}
                animate="animate"
                className="absolute w-32 h-32"
              >
                <div className="w-full h-full rounded-full border-2 border-blue-400/50" />
              </motion.div>

              {/* Center Pulsing Blob */}
              <motion.div
                variants={pulseVariants}
                animate="animate"
                className="absolute w-24 h-24 z-20"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-white via-blue-200 to-blue-300 shadow-2xl filter blur-sm opacity-90" />
              </motion.div>

              {/* Inner Blob - Asymmetric */}
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute w-20 h-20 z-30"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <radialGradient id="blobGradient">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#93c5fd" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
                    </radialGradient>
                  </defs>
                  <path
                    d="M 50,15 C 80,20 85,50 75,75 C 65,85 45,90 35,80 C 20,70 15,40 25,25 C 35,10 30,10 50,15 Z"
                    fill="url(#blobGradient)"
                    filter="drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))"
                  />
                </svg>
              </motion.div>

              {/* Radar scan line effect */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute w-40 h-40 z-10"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent transform -skew-y-12" />
              </motion.div>
            </div>

            {/* Bottom Section - Stats */}
            <div className="relative z-10 grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              {[
                { label: 'Status', value: 'Active' },
                { label: 'Level', value: '7' },
                { label: 'Streak', value: '12d' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="text-center mt-4 cursor-pointer"
                >
                  <div className="text-xs text-blue-500/70 font-medium uppercase tracking-wider mb-1">
                    {stat.label}
                  </div>
                  <div className="text-lg font-bold text-blue-600">{stat.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Interactive Hover Glow */}
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-blue-400/0 via-white/0 to-purple-400/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Bottom floating elements */}
      <motion.div
        className="fixed bottom-8 left-8 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl pointer-events-none"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="fixed top-1/4 right-8 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl pointer-events-none"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  );
};

export default DashboardCard;
