import { motion } from 'framer-motion';
import { useAnimasiScroll } from '../../hooks/useAnimasiScroll';
import KartuProyek from '../common/KartuProyek';
import { DAFTAR_PROYEK } from '../../utils/dataProyek';

/**
 * Komponen SeksiPortfolio - Portfolio section
 * Menampilkan grid projects dengan staggered animation
 */
export default function SeksiPortfolio() {
  const [ref, adalahTerlihat] = useAnimasiScroll({ threshold: 0.2 });

  // Varian animasi untuk title
  const varianTitle = {
    tersembunyi: { opacity: 0, y: 30 },
    terlihat: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  // Varian container untuk stagger children
  const varianContainer = {
    tersembunyi: { opacity: 0 },
    terlihat: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section 
      id="portfolio"
      ref={ref}
      className="min-h-screen py-20 bg-latar-utama"
    >
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.div
          variants={varianTitle}
          initial="tersembunyi"
          animate={adalahTerlihat ? "terlihat" : "tersembunyi"}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-judul font-bold text-gradient mb-4">
            My Projects
          </h2>
          <p className="text-teks-sekunder text-lg max-w-2xl mx-auto">
            Berikut adalah beberapa project yang pernah saya kerjakan. 
            Setiap project mencerminkan dedikasi saya dalam menciptakan web experience yang berkualitas.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={varianContainer}
          initial="tersembunyi"
          animate={adalahTerlihat ? "terlihat" : "tersembunyi"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {DAFTAR_PROYEK.map((proyek, index) => (
            <KartuProyek
              key={proyek.id}
              namaProyek={proyek.namaProyek}
              deskripsi={proyek.deskripsi}
              linkDemo={proyek.linkDemo}
              linkGithub={proyek.linkGithub}
              gambarPreview={proyek.gambarPreview}
              teknologi={proyek.teknologi}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={adalahTerlihat ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-teks-sekunder">
            More projects coming soon... 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
}
