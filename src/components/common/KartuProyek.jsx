import { motion } from 'framer-motion';

/**
 * Komponen KartuProyek untuk menampilkan preview project
 * Dengan hover effects, status badge, dan conditional buttons
 * 
 * @param {object} props - Props komponen
 * @param {string} props.namaProyek - Nama project
 * @param {string} props.deskripsi - Deskripsi singkat project
 * @param {string} props.linkDemo - URL demo project (null jika tidak ada)
 * @param {string} props.linkGithub - URL GitHub repository
 * @param {string} props.gambarPreview - URL gambar preview (optional)
 * @param {array} props.teknologi - Array teknologi yang digunakan
 * @param {string} props.status - Status project: 'live', 'development', 'source-only'
 * @param {number} props.delay - Delay animasi untuk stagger effect
 */
export default function KartuProyek({ 
  namaProyek, 
  deskripsi, 
  linkDemo,
  linkGithub,
  gambarPreview,
  teknologi = [],
  status = 'live',
  delay = 0
}) {
  // Status badge config
  const statusConfig = {
    'live': {
      label: 'Live',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/30',
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    'development': {
      label: 'In Development',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/30',
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      )
    },
    'source-only': {
      label: 'Source Code',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/30',
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )
    }
  };

  const currentStatus = statusConfig[status] || statusConfig['live'];

  // Varian animasi untuk card
  const varianCard = {
    tersembunyi: { 
      opacity: 0, 
      y: 50 
    },
    terlihat: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: 'easeOut'
      }
    }
  };

  // Varian hover untuk scale effect
  const varianHover = {
    scale: 1.05,
    transition: { duration: 0.3 }
  };

  /**
   * Handler untuk membuka link demo di tab baru
   */
  const bukaDemo = () => {
    if (linkDemo) {
      window.open(linkDemo, '_blank', 'noopener,noreferrer');
    }
  };

  /**
   * Handler untuk membuka link GitHub di tab baru
   */
  const bukaGithub = (e) => {
    e.stopPropagation(); // Prevent card click
    if (linkGithub) {
      window.open(linkGithub, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      variants={varianCard}
      initial="tersembunyi"
      whileInView="terlihat"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={varianHover}
      onClick={linkDemo ? bukaDemo : undefined}
      className={`
        bg-latar-sekunder border-2 border-latar-tersier rounded-xl overflow-hidden
        group relative
        hover:border-aksen-primer
        transition-all duration-300
        ${linkDemo ? 'cursor-pointer' : ''}
      `}
    >
      {/* Preview Image (jika ada) */}
      {gambarPreview && (
        <div className="w-full h-48 bg-latar-tersier overflow-hidden">
          <img 
            src={gambarPreview} 
            alt={namaProyek}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Header: Nama + Status Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-xl font-judul font-bold text-teks-utama group-hover:text-aksen-primer transition-colors flex-1">
            {namaProyek}
          </h3>
          
          {/* Status Badge */}
          <span className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${currentStatus.bgColor} ${currentStatus.color} ${currentStatus.borderColor}
            border flex items-center gap-1.5 whitespace-nowrap
          `}>
            {currentStatus.icon}
            {currentStatus.label}
          </span>
        </div>

        {/* Deskripsi */}
        <p className="text-teks-sekunder text-sm mb-4 line-clamp-2">
          {deskripsi}
        </p>

        {/* Tech Stack Tags */}
        {teknologi.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {teknologi.slice(0, 4).map((tech, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-latar-tersier text-aksen-primer text-xs rounded-full border border-aksen-primer/30"
              >
                {tech}
              </span>
            ))}
            {teknologi.length > 4 && (
              <span className="px-3 py-1 bg-latar-tersier text-teks-sekunder text-xs rounded-full border border-latar-tersier">
                +{teknologi.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons - Conditional */}
        <div className="flex gap-3">
          {linkDemo ? (
            <>
              <button 
                className="flex-1 px-4 py-2 border-2 border-aksen-primer text-aksen-primer rounded-lg font-semibold text-sm hover:bg-aksen-primer hover:text-latar-utama transition-all duration-300"
                onClick={bukaDemo}
              >
                Live Demo
              </button>
              {linkGithub && (
                <button 
                  className="px-4 py-2 border-2 border-aksen-sekunder text-aksen-sekunder rounded-lg font-semibold text-sm hover:bg-aksen-sekunder hover:text-teks-utama transition-all duration-300"
                  onClick={bukaGithub}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </>
          ) : (
            // Source code only - single GitHub button
            <button 
              className="flex-1 px-4 py-2 border-2 border-aksen-primer text-aksen-primer rounded-lg font-semibold text-sm hover:bg-aksen-primer hover:text-latar-utama transition-all duration-300 flex items-center justify-center gap-2"
              onClick={bukaGithub}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View Source
            </button>
          )}
        </div>
      </div>

      {/* Border glow effect overlay */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-aksen-primer/50 rounded-xl transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}
