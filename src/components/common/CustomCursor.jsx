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
      {/* Particle Trail */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: '#ff00eaff',
            boxShadow: '0 0 12px rgba(0, 255, 255, 1), 0 0 24px rgba(0, 255, 255, 0.6)',
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
        {/* Center Dot */}
        <motion.div
          animate={{
            scale: isClicking ? 0.5 : isHovering ? 1.5 : 1,
            rotate: isHovering ? 45 : 0,
          }}
          transition={{ duration: 0.15 }}
          className="absolute -ml-1 -mt-1"
        >
          <div className="w-2.5 h-2.5 rounded-full"
               style={{ 
                 backgroundColor: '#ff0000ff',
                 boxShadow: '0 0 15px rgba(255, 0, 0, 1), 0 0 30px rgba(255, 0, 0, 0.8)' 
               }} />
        </motion.div>

        {/* Crosshair Lines */}
        <motion.div
          animate={{
            scale: isClicking ? 0.7 : isHovering ? 1.3 : 1,
            rotate: isHovering ? 45 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          {/* Horizontal Line */}
          <div className="absolute -ml-6 -mt-[1.5px] w-12 h-[3px]"
               style={{ 
                 background: 'linear-gradient(to right, transparent, #ffffffff, transparent)',
                 boxShadow: '0 0 10px rgba(255, 255, 255, 1)' 
               }} />
          
          {/* Vertical Line */}
          <div className="absolute -ml-[1.5px] -mt-6 w-[3px] h-12"
               style={{ 
                 background: 'linear-gradient(to bottom, transparent, #ffffffff, transparent)',
                 boxShadow: '0 0 10px rgba(255, 255, 255, 1)' 
               }} />
        </motion.div>

        {/* Corner Brackets */}
        <motion.div
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            opacity: isHovering ? 1 : 0.9,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          {/* Top-Left */}
          <div className="absolute -ml-4 -mt-4 w-3 h-3 border-t-[2.5px] border-l-[2.5px]"
               style={{ 
                 borderColor: '#44ff00ff',
                 boxShadow: '0 0 8px rgba(9, 255, 0, 1)' 
               }} />
          
          {/* Top-Right */}
          <div className="absolute ml-1 -mt-4 w-3 h-3 border-t-[2.5px] border-r-[2.5px]"
               style={{ 
                 borderColor: '#00FFFF',
                 boxShadow: '0 0 8px rgba(0, 255, 255, 1)' 
               }} />
          
          {/* Bottom-Left */}
          <div className="absolute -ml-4 mt-1 w-3 h-3 border-b-[2.5px] border-l-[2.5px]"
               style={{ 
                 borderColor: '#e100ffff',
                 boxShadow: '0 0 8px rgba(255, 0, 234, 1)' 
               }} />
          
          {/* Bottom-Right */}
          <div className="absolute ml-1 mt-1 w-3 h-3 border-b-[2.5px] border-r-[2.5px]"
               style={{ 
                 borderColor: '#eeff00ff',
                 boxShadow: '0 0 8px rgba(255, 255, 0, 1)' 
               }} />
        </motion.div>

        {/* Outer Ring (on hover) */}
        {isHovering && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -ml-8 -mt-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-full border-[2.5px]"
              style={{
                borderColor: '#00FFFF',
                borderStyle: 'dashed',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
              }}
            />
          </motion.div>
        )}

        {/* Click Ripple Effect */}
        {isClicking && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute -ml-4 -mt-4 w-8 h-8 rounded-full border-[2.5px]"
            style={{
              borderColor: '#00FFFF',
              boxShadow: '0 0 20px rgba(0, 255, 255, 1)',
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

export default CustomCursor;
