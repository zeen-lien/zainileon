import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * LoadingScreen - Futuristic loading screen dengan particle effects
 * Tampil pertama kali saat website dibuka
 */
function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulasi loading progress dengan timing yang lebih natural
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 800);
          return 100;
        }
        // Random increment untuk efek lebih natural
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-hitam overflow-hidden"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Main Logo Container */}
      <div className="relative z-10">
        {/* Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 -m-12"
        >
          <div className="w-48 h-48 rounded-full border-2 border-cyan opacity-20" 
               style={{ borderStyle: 'dashed' }} />
        </motion.div>

        {/* Logo dengan Glitch Effect */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
          className="relative"
        >
          {/* Glow Layers */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 -m-8 bg-cyan rounded-full blur-3xl opacity-50"
          />
          
          {/* Main Logo */}
          <div className="relative text-8xl font-bold">
            <span className="absolute inset-0 text-cyan blur-sm">ZL</span>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan via-ungu to-hijau-mint">
              ZL
            </span>
          </div>
        </motion.div>
      </div>

      {/* Progress Section */}
      <div className="relative z-10 mt-16 w-80">
        {/* Progress Bar Container */}
        <div className="relative h-2 bg-abu-gelap rounded-full overflow-hidden border border-cyan/30">
          {/* Animated Background */}
          <motion.div
            animate={{ x: ['0%', '100%'] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/20 to-transparent"
            style={{ width: '50%' }}
          />
          
          {/* Progress Fill */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="relative h-full bg-gradient-to-r from-cyan via-ungu to-hijau-mint"
            style={{
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)',
            }}
          >
            {/* Shine Effect */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              style={{ width: '50%' }}
            />
          </motion.div>
        </div>

        {/* Progress Text */}
        <div className="flex justify-between items-center mt-4">
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-cyan font-mono text-sm tracking-wider"
          >
            INITIALIZING LABORATORY
          </motion.p>
          <span className="text-hijau-mint font-mono font-bold">
            {Math.floor(progress)}%
          </span>
        </div>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-12 flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{
              height: ['8px', '24px', '8px'],
              backgroundColor: ['#00d4ff', '#a855f7', '#00d4ff'],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
            }}
            className="w-1 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}

export default LoadingScreen;
