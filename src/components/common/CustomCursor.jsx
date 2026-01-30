import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * CustomCursor - Futuristic crosshair cursor dengan particle trail
 * Hanya aktif di desktop (hidden di mobile)
 */
function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState([]);

  // Motion values untuk smooth cursor movement
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring animation untuk smooth trailing
  const springConfig = { damping: 30, stiffness: 500 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    let particleId = 0;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Create particle trail
      if (Math.random() > 0.7) {
        const newParticle = {
          id: particleId++,
          x: e.clientX,
          y: e.clientY,
        };
        setParticles(prev => [...prev.slice(-10), newParticle]);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      {/* Particle Trail - Smaller */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: '#00FFFF',
            boxShadow: '0 0 6px rgba(0, 255, 255, 0.8)',
          }}
        />
      ))}

      {/* Main Crosshair Cursor */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        className="absolute top-0 left-0"
      >
        {/* Center Dot - Smaller */}
        <motion.div
          animate={{
            scale: isClicking ? 0.5 : isHovering ? 1.3 : 1,
            rotate: isHovering ? 45 : 0,
          }}
          transition={{ duration: 0.15 }}
          className="absolute -ml-0.5 -mt-0.5"
        >
          <div className="w-1.5 h-1.5 rounded-full"
               style={{ 
                 backgroundColor: '#00FFFF',
                 boxShadow: '0 0 8px rgba(0, 255, 255, 0.8), 0 0 15px rgba(0, 255, 255, 0.5)' 
               }} />
        </motion.div>

        {/* Crosshair Lines - Smaller */}
        <motion.div
          animate={{
            scale: isClicking ? 0.7 : isHovering ? 1.2 : 1,
            rotate: isHovering ? 45 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          {/* Horizontal Line */}
          <div className="absolute -ml-4 -mt-[1px] w-8 h-[2px]"
               style={{ 
                 background: 'linear-gradient(to right, transparent, #00FFFF, transparent)',
                 boxShadow: '0 0 6px rgba(0, 255, 255, 0.8)' 
               }} />
          
          {/* Vertical Line */}
          <div className="absolute -ml-[1px] -mt-4 w-[2px] h-8"
               style={{ 
                 background: 'linear-gradient(to bottom, transparent, #00FFFF, transparent)',
                 boxShadow: '0 0 6px rgba(0, 255, 255, 0.8)' 
               }} />
        </motion.div>

        {/* Corner Brackets - Smaller */}
        <motion.div
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.3 : 1,
            opacity: isHovering ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          {/* Top-Left */}
          <div className="absolute -ml-3 -mt-3 w-2 h-2 border-t-[2px] border-l-[2px]"
               style={{ 
                 borderColor: '#00FFFF',
                 boxShadow: '0 0 6px rgba(0, 255, 255, 0.6)' 
               }} />
          
          {/* Top-Right */}
          <div className="absolute ml-1 -mt-3 w-2 h-2 border-t-[2px] border-r-[2px]"
               style={{ 
                 borderColor: '#00FFFF',
                 boxShadow: '0 0 6px rgba(0, 255, 255, 0.6)' 
               }} />
          
          {/* Bottom-Left */}
          <div className="absolute -ml-3 mt-1 w-2 h-2 border-b-[2px] border-l-[2px]"
               style={{ 
                 borderColor: '#00FFFF',
                 boxShadow: '0 0 6px rgba(0, 255, 255, 0.6)' 
               }} />
          
          {/* Bottom-Right */}
          <div className="absolute ml-1 mt-1 w-2 h-2 border-b-[2px] border-r-[2px]"
               style={{ 
                 borderColor: '#00FFFF',
                 boxShadow: '0 0 6px rgba(0, 255, 255, 0.6)' 
               }} />
        </motion.div>

        {/* Outer Ring (on hover) - Smaller */}
        {isHovering && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -ml-5 -mt-5"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 rounded-full border-[2px]"
              style={{
                borderColor: '#00FFFF',
                borderStyle: 'dashed',
                boxShadow: '0 0 12px rgba(0, 255, 255, 0.6)',
              }}
            />
          </motion.div>
        )}

        {/* Click Ripple Effect - Smaller */}
        {isClicking && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute -ml-3 -mt-3 w-6 h-6 rounded-full border-[2px]"
            style={{
              borderColor: '#00FFFF',
              boxShadow: '0 0 15px rgba(0, 255, 255, 0.8)',
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

export default CustomCursor;
