import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import AnimatedBackground from '../common/AnimatedBackground';

/**
 * Komponen SeksiHero - Hero section dengan typing animation dan parallax
 * Menampilkan nama, tagline dengan typing effect
 * 
 * @param {object} props - Props komponen
 * @param {string} props.nama - Nama yang ditampilkan (default: "Zeen-Lien Laboratory")
 */
export default function SeksiHero({ nama = "Zeen-Lien Laboratory" }) {
  const [textTyping, setTextTyping] = useState('');
  const [indexKalimat, setIndexKalimat] = useState(0);
  const [sedangMengetik, setSedangMengetik] = useState(true);

  // Array kalimat untuk typing animation
  const kalimatTyping = [
    "Building Digital Experiences",
    "Trading Multiple Markets",
    "Crafting Modern Interfaces",
    "Analyzing Market Trends"
  ];

  // Parallax scroll effect
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityParallax = useTransform(scrollY, [0, 300], [1, 0]);

  /**
   * Effect untuk typing animation
   */
  useEffect(() => {
    const kalimatSaatIni = kalimatTyping[indexKalimat];
    
    if (sedangMengetik) {
      if (textTyping.length < kalimatSaatIni.length) {
        const timeout = setTimeout(() => {
          setTextTyping(kalimatSaatIni.slice(0, textTyping.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        // Selesai mengetik, tunggu sebentar lalu hapus
        const timeout = setTimeout(() => {
          setSedangMengetik(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (textTyping.length > 0) {
        const timeout = setTimeout(() => {
          setTextTyping(textTyping.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        // Selesai menghapus, pindah ke kalimat berikutnya
        setIndexKalimat((prev) => (prev + 1) % kalimatTyping.length);
        setSedangMengetik(true);
      }
    }
  }, [textTyping, sedangMengetik, indexKalimat]);

  // Varian animasi untuk nama
  const varianNama = {
    tersembunyi: { opacity: 0, y: 50 },
    terlihat: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: 'easeOut'
      }
    }
  };

  // Varian animasi untuk tagline
  const varianTagline = {
    tersembunyi: { opacity: 0, y: 30 },
    terlihat: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section 
      id="hero"
      className="
        min-h-screen flex items-center justify-center
        bg-latar-utama
        relative overflow-hidden
      "
    >
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Parallax background glow effects */}
      <motion.div 
        style={{ y: yParallax, opacity: opacityParallax }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-aksen-primer/10 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: yParallax, opacity: opacityParallax }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aksen-sekunder/10 rounded-full blur-3xl"
      />

      {/* Content Container */}
      <motion.div 
        style={{ y: yParallax }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="flex flex-col items-center text-center">
          {/* Nama dengan border outline effect */}
          <motion.div
            variants={varianNama}
            initial="tersembunyi"
            animate="terlihat"
            className="relative mb-6"
          >
            <h1 className="
              text-6xl md:text-8xl font-judul font-bold
              text-transparent
              bg-clip-text bg-gradient-to-r from-aksen-primer via-teks-utama to-aksen-sekunder
              relative
            ">
              {nama}
            </h1>
            {/* Outline effect */}
            <h1 className="
              text-6xl md:text-8xl font-judul font-bold
              absolute top-0 left-0 w-full
              text-transparent
              [-webkit-text-stroke:2px_var(--color-aksen-primer)]
              opacity-30
              blur-sm
            " aria-hidden="true">
              {nama}
            </h1>
          </motion.div>

          {/* Badge dengan icon proper - kembali ke atas */}
          <motion.div
            variants={varianTagline}
            initial="tersembunyi"
            animate="terlihat"
            className="mb-8 flex flex-wrap items-center justify-center gap-4"
          >
            {/* Badge Frontend */}
            <div className="
              px-6 py-3 rounded-full
              border-2 border-aksen-primer/50
              bg-aksen-primer/5
              backdrop-blur-sm
              flex items-center gap-3
              hover:border-aksen-primer hover:bg-aksen-primer/10
              transition-all duration-300
              group
            ">
              <svg className="w-5 h-5 text-aksen-primer group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-base md:text-lg font-judul font-medium text-teks-utama">
                Frontend Developer
              </span>
            </div>

            {/* Badge Trading */}
            <div className="
              px-6 py-3 rounded-full
              border-2 border-aksen-sekunder/50
              bg-aksen-sekunder/5
              backdrop-blur-sm
              flex items-center gap-3
              hover:border-aksen-sekunder hover:bg-aksen-sekunder/10
              transition-all duration-300
              group
            ">
              <svg className="w-5 h-5 text-aksen-sekunder group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              <span className="text-base md:text-lg font-judul font-medium text-teks-utama">
                Multi-Asset Trader
              </span>
            </div>
          </motion.div>

          {/* Typing animation text - lebih prominent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="h-16 flex items-center justify-center"
          >
            <p className="
              text-2xl md:text-4xl font-judul font-bold
              text-transparent
              bg-clip-text bg-gradient-to-r from-aksen-primer to-aksen-sekunder
              min-h-[1.5em]
            ">
              {textTyping}
              <span className="animate-pulse text-aksen-primer">|</span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
