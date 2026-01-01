import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

/**
 * Komponen IkonSosial - Ultra Modern 3D Card dengan Holographic Effects
 * Premium design dengan particle effects dan neon glow
 */
export default function IkonSosial({ platform, username, link }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  // Mouse position untuk 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-100, 100], [15, -15]);
  const rotateY = useTransform(mouseX, [-100, 100], [-15, 15]);

  const bukaLink = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Platform colors dengan neon glow
  const platformColors = {
    'Instagram': { 
      primary: '#E4405F', 
      secondary: '#C13584',
      gradient: 'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCAF45 100%)',
      glow: 'rgba(228, 64, 95, 0.6)',
      particles: '#FCAF45'
    },
    'Telegram': { 
      primary: '#0088cc', 
      secondary: '#229ED9',
      gradient: 'linear-gradient(135deg, #0088cc 0%, #229ED9 100%)',
      glow: 'rgba(0, 136, 204, 0.6)',
      particles: '#229ED9'
    },
    'GitHub': { 
      primary: '#ffffff', 
      secondary: '#c9d1d9',
      gradient: 'linear-gradient(135deg, #ffffff 0%, #8b949e 100%)',
      glow: 'rgba(255, 255, 255, 0.6)',
      particles: '#ffffff'
    },
    'WhatsApp': { 
      primary: '#25D366', 
      secondary: '#128C7E',
      gradient: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
      glow: 'rgba(37, 211, 102, 0.6)',
      particles: '#25D366'
    }
  };

  const colors = platformColors[platform] || platformColors['Instagram'];

  const renderIcon = () => {
    const iconClass = "w-7 h-7";
    
    switch (platform) {
      case 'Instagram':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case 'Telegram':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        );
      case 'GitHub':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case 'WhatsApp':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={bukaLink}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer perspective-1000 no-outline"
      style={{
        perspective: '1000px',
        outline: 'none',
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer Glow - Subtle Effect */}
      <motion.div
        className="absolute -inset-8 rounded-[3rem] blur-3xl opacity-0"
        style={{
          background: colors.gradient,
        }}
        animate={{
          opacity: isHovered ? 0.2 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* 3D Card Container - Clean & Simple */}
      <motion.div
        className="relative w-36 h-48 rounded-3xl overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 255, 255, 0.5)',
          outline: 'none',
        }}
        animate={{
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
          boxShadow: isHovered 
            ? `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px ${colors.glow}` 
            : '0 10px 30px rgba(0, 0, 0, 0.3)',
        }}
        transition={{ duration: 0.4 }}
      >

        {/* Gradient Mesh Overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: colors.gradient,
            mixBlendMode: 'overlay',
            opacity: 0,
          }}
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Animated Scan Lines */}
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? [0, 20, 0] : 0,
          }}
          transition={{
            opacity: { duration: 0.3 },
            y: { duration: 2, repeat: Infinity, ease: 'linear' }
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-8 gap-6">
          {/* Icon Container dengan Depth */}
          <motion.div
            className="relative"
            style={{
              transformStyle: 'preserve-3d',
            }}
            animate={{
              z: isHovered ? 50 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Icon Glow Background - Subtle */}
            <motion.div
              className="absolute inset-0 rounded-3xl blur-2xl"
              style={{
                background: colors.gradient,
              }}
              animate={{
                opacity: isHovered ? 0.3 : 0,
                scale: isHovered ? 1.3 : 1,
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Icon Circle - Outline Only */}
            <motion.div
              className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: 'transparent',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                outline: 'none',
              }}
              animate={{
                borderColor: isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
                boxShadow: isHovered ? `0 0 15px ${colors.glow}` : 'none',
                rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ 
                borderColor: { duration: 0.4 },
                boxShadow: { duration: 0.4 },
                rotate: { duration: 0.8, ease: 'easeInOut' },
                scale: { duration: 0.3 }
              }}
            >
              <motion.div
                animate={{
                  color: isHovered ? colors.primary : '#a0a0a0',
                  scale: isHovered ? 1.15 : 1,
                  filter: isHovered ? `drop-shadow(0 0 8px ${colors.glow})` : 'none',
                }}
                transition={{ duration: 0.3 }}
              >
                {renderIcon()}
              </motion.div>
            </motion.div>

            {/* Orbiting Particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: colors.particles,
                  boxShadow: `0 0 10px ${colors.glow}`,
                  top: '50%',
                  left: '50%',
                }}
                animate={isHovered ? {
                  x: [0, Math.cos((i * 120 * Math.PI) / 180) * 50],
                  y: [0, Math.sin((i * 120 * Math.PI) / 180) * 50],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                } : {
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 1.5,
                  repeat: isHovered ? Infinity : 0,
                  delay: i * 0.2,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>

          {/* Platform Info */}
          <motion.div 
            className="text-center space-y-2"
            style={{
              transformStyle: 'preserve-3d',
            }}
            animate={{
              z: isHovered ? 30 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Platform Name dengan Neon - Subtle */}
            <motion.h3
              className="text-base font-bold tracking-wide"
              animate={{
                color: isHovered ? colors.primary : '#ffffff',
                textShadow: isHovered ? `0 0 10px ${colors.glow}` : 'none',
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {platform}
            </motion.h3>
            
            {/* Username dengan Glitch Effect */}
            <motion.p
              className="text-xs font-mono"
              animate={{
                color: isHovered ? colors.secondary : '#a0a0a0',
                opacity: isHovered ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
            >
              {username}
            </motion.p>
          </motion.div>

          {/* Connect Button - Slide Up */}
          <motion.div
            className="absolute bottom-6 left-6 right-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <motion.div
              className="relative w-full py-2 rounded-xl text-xs font-bold text-center overflow-hidden"
              style={{
                background: colors.gradient,
                color: '#ffffff',
                boxShadow: `0 5px 15px ${colors.glow}`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button Shine Effect */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                }}
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <span className="relative z-10">Connect</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Corner Accents */}
        {[
          { top: '1rem', left: '1rem', rotate: 0 },
          { top: '1rem', right: '1rem', rotate: 90 },
          { bottom: '1rem', left: '1rem', rotate: -90 },
          { bottom: '1rem', right: '1rem', rotate: 180 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4"
            style={{
              ...pos,
              borderTop: `2px solid ${colors.primary}`,
              borderLeft: `2px solid ${colors.primary}`,
              transform: `rotate(${pos.rotate}deg)`,
              opacity: 0,
            }}
            animate={{
              opacity: isHovered ? 0.6 : 0,
            }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
