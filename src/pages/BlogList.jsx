import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ARTIKEL_BLOG, getAllKategori } from '../data/dataBlog';
import { formatTanggal } from '../utils/helper';

/**
 * Komponen BlogList - Halaman daftar artikel blog
 * Menampilkan semua artikel dengan filter kategori
 */
export default function BlogList() {
  const navigate = useNavigate();
  const [kategoriAktif, setKategoriAktif] = useState('All');
  
  const semuaKategori = ['All', ...getAllKategori()];
  
  // Filter artikel berdasarkan kategori
  const artikelTerfilter = kategoriAktif === 'All' 
    ? ARTIKEL_BLOG 
    : ARTIKEL_BLOG.filter(artikel => artikel.kategori.includes(kategoriAktif));

  /**
   * Handler untuk navigasi ke detail artikel
   */
  const handleArtikelClick = (slug) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="min-h-screen bg-latar-utama pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="
            text-5xl md:text-6xl font-judul font-bold mb-4
            text-transparent bg-clip-text
            bg-gradient-to-r from-aksen-primer to-aksen-sekunder
          ">
            Blog
          </h1>
          <p className="text-lg text-teks-sekunder max-w-2xl mx-auto">
            Thoughts, experiences, and learnings about tech, trading, and life.
          </p>
        </motion.div>

        {/* Filter Kategori */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {semuaKategori.map((kategori) => (
            <button
              key={kategori}
              onClick={() => setKategoriAktif(kategori)}
              className={`
                px-6 py-2 rounded-full font-judul font-medium
                transition-all duration-300
                ${kategoriAktif === kategori
                  ? 'bg-aksen-primer text-latar-utama'
                  : 'border-2 border-aksen-primer/30 text-teks-sekunder hover:border-aksen-primer hover:text-aksen-primer'
                }
              `}
            >
              {kategori}
            </button>
          ))}
        </motion.div>

        {/* Grid Artikel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artikelTerfilter.map((artikel, index) => (
            <motion.article
              key={artikel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              onClick={() => handleArtikelClick(artikel.slug)}
              className="
                group cursor-pointer
                border-2 border-latar-tersier
                rounded-lg overflow-hidden
                hover:border-aksen-primer
                transition-all duration-300
                bg-latar-sekunder
              "
            >
              {/* Gambar Cover (jika ada) */}
              {artikel.gambar && (
                <div className="aspect-video bg-latar-tersier overflow-hidden">
                  <img 
                    src={artikel.gambar} 
                    alt={artikel.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Kategori & Tanggal */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-2">
                    {artikel.kategori.map((kat) => (
                      <span 
                        key={kat}
                        className="text-xs px-3 py-1 rounded-full bg-aksen-primer/10 text-aksen-primer font-medium"
                      >
                        {kat}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-teks-sekunder">
                    {formatTanggal(artikel.tanggal)}
                  </span>
                </div>

                {/* Judul */}
                <h2 className="
                  text-xl font-judul font-bold mb-3
                  text-teks-utama
                  group-hover:text-aksen-primer
                  transition-colors duration-300
                ">
                  {artikel.judul}
                </h2>

                {/* Ringkasan */}
                <p className="text-teks-sekunder text-sm leading-relaxed mb-4">
                  {artikel.ringkasan}
                </p>

                {/* Read More */}
                <div className="flex items-center gap-2 text-aksen-primer font-medium text-sm">
                  <span>Read More</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {artikelTerfilter.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-teks-sekunder text-lg">
              No articles found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
