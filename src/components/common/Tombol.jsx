import { motion } from 'framer-motion';

/**
 * Komponen Tombol (Button) dengan animasi dan styling futuristik
 * 
 * @param {object} props - Props komponen
 * @param {string} props.teks - Text yang ditampilkan di tombol
 * @param {Function} props.onClick - Handler saat tombol diklik
 * @param {string} props.varian - Varian style tombol ('primer', 'sekunder', 'outline')
 * @param {string} props.ukuran - Ukuran tombol ('sm', 'md', 'lg')
 * @param {string} props.className - Class CSS tambahan
 * @param {boolean} props.disabled - Status disabled tombol
 * @param {string} props.type - Type tombol HTML ('button', 'submit', 'reset')
 */
export default function Tombol({ 
  teks, 
  onClick, 
  varian = 'primer',
  ukuran = 'md',
  className = '',
  disabled = false,
  type = 'button'
}) {
  // Definisi style berdasarkan varian
  const varianStyle = {
    primer: 'bg-transparent border-2 border-aksen-primer text-aksen-primer hover:bg-aksen-primer hover:text-latar-utama transition-all duration-300',
    sekunder: 'bg-transparent border-2 border-aksen-sekunder text-aksen-sekunder hover:bg-aksen-sekunder hover:text-teks-utama transition-all duration-300',
    outline: 'border-2 border-teks-sekunder text-teks-sekunder hover:border-aksen-primer hover:text-aksen-primer transition-all duration-300'
  };

  // Definisi ukuran tombol
  const ukuranStyle = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Varian animasi hover
  const varianHover = {
    scale: 1.05,
    transition: { duration: 0.3, ease: 'easeInOut' }
  };

  // Varian animasi tap
  const varianTap = {
    scale: 0.95
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${varianStyle[varian]}
        ${ukuranStyle[ukuran]}
        ${className}
        font-judul font-semibold rounded-lg
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-aksen-primer focus:ring-offset-2 focus:ring-offset-latar-utama
      `}
      whileHover={!disabled ? varianHover : {}}
      whileTap={!disabled ? varianTap : {}}
    >
      {teks}
    </motion.button>
  );
}
