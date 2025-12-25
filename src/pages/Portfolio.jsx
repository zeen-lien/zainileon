import { motion } from 'framer-motion';
import { useState } from 'react';
import KartuProyek from '../components/common/KartuProyek';
import { DATA_PROYEK, getAllTeknologi } from '../utils/dataProyek';

/**
 * Komponen Portfolio - Halaman portfolio projects
 * Menampilkan semua project dengan filter teknologi
 */
export default function Portfolio() {
  const [teknologiAktif, setTeknologiAktif] = useState('All');
  
  const semuaTeknologi = ['All', ...getAllTeknologi()];
  
  // Filter project berdasarkan teknologi
  const proyekTerfilter = teknologiAktif === 'All' 
    ? DATA_PROYEK 
    : DATA_PROYEK.filter(proyek => proyek.teknologi.includes(teknologiAktif));

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
            Portfolio
          </h1>
          <p className="text-lg text-teks-sekunder max-w-2xl mx-auto">
            A collection of projects I've built. From web apps to interactive experiences.
          </p>
        </motion.div>

        {/* Filter Teknologi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {semuaTeknologi.map((teknologi) => (
            <button
              key={teknologi}
              onClick={() => setTeknologiAktif(teknologi)}
              className={`
                px-6 py-2 rounded-full font-judul font-medium
                transition-all duration-300
                ${teknologiAktif === teknologi
                  ? 'bg-aksen-primer text-latar-utama'
                  : 'border-2 border-aksen-primer/30 text-teks-sekunder hover:border-aksen-primer hover:text-aksen-primer'
                }
              `}
            >
              {teknologi}
            </button>
          ))}
        </motion.div>

        {/* Grid Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyekTerfilter.map((proyek, index) => (
            <motion.div
              key={proyek.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <KartuProyek 
                namaProyek={proyek.namaProyek}
                deskripsi={proyek.deskripsi}
                linkDemo={proyek.linkDemo}
                linkGithub={proyek.linkGithub}
                teknologi={proyek.teknologi}
                status={proyek.status}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {proyekTerfilter.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-teks-sekunder text-lg">
              No projects found with this technology.
            </p>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 border-2 border-aksen-primer/30 rounded-lg hover:border-aksen-primer transition-colors">
            <div className="text-4xl font-bold text-aksen-primer mb-2">
              {DATA_PROYEK.length}+
            </div>
            <div className="text-teks-sekunder">Projects Completed</div>
          </div>
          <div className="text-center p-6 border-2 border-aksen-sekunder/30 rounded-lg hover:border-aksen-sekunder transition-colors">
            <div className="text-4xl font-bold text-aksen-sekunder mb-2">
              {getAllTeknologi().length}+
            </div>
            <div className="text-teks-sekunder">Technologies Used</div>
          </div>
          <div className="text-center p-6 border-2 border-aksen-primer/30 rounded-lg hover:border-aksen-primer transition-colors">
            <div className="text-4xl font-bold text-aksen-primer mb-2">
              100%
            </div>
            <div className="text-teks-sekunder">Deployed & Live</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
