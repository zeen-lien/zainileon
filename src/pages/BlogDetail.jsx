import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { getArtikelBySlug } from '../data/dataBlog';
import { formatTanggal } from '../utils/helper';
import Tombol from '../components/common/Tombol';

/**
 * Komponen BlogDetail - Halaman detail artikel blog
 * Menampilkan konten lengkap artikel
 */
export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const artikel = getArtikelBySlug(slug);

  // Jika artikel tidak ditemukan
  if (!artikel) {
    return (
      <div className="min-h-screen bg-latar-utama pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-judul font-bold text-teks-utama mb-4">
            Article Not Found
          </h1>
          <p className="text-teks-sekunder mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Tombol
            teks="Back to Blog"
            onClick={() => navigate('/blog')}
            varian="primer"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-latar-utama pt-32 pb-20">
      <article className="container mx-auto px-6 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/blog')}
            className="
              flex items-center gap-2
              text-teks-sekunder hover:text-aksen-primer
              transition-colors duration-300
              font-medium
            "
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </button>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Kategori & Tanggal */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {artikel.kategori.map((kat) => (
              <span 
                key={kat}
                className="text-sm px-4 py-1.5 rounded-full bg-aksen-primer/10 text-aksen-primer font-medium"
              >
                {kat}
              </span>
            ))}
            <span className="text-sm text-teks-sekunder">
              {formatTanggal(artikel.tanggal)}
            </span>
          </div>

          {/* Judul */}
          <h1 className="
            text-4xl md:text-5xl font-judul font-bold mb-6
            text-transparent bg-clip-text
            bg-gradient-to-r from-aksen-primer to-aksen-sekunder
          ">
            {artikel.judul}
          </h1>

          {/* Ringkasan */}
          <p className="text-xl text-teks-sekunder leading-relaxed">
            {artikel.ringkasan}
          </p>
        </motion.header>

        {/* Gambar Cover (jika ada) */}
        {artikel.gambar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 rounded-lg overflow-hidden border-2 border-latar-tersier"
          >
            <img 
              src={artikel.gambar} 
              alt={artikel.judul}
              className="w-full h-auto"
            />
          </motion.div>
        )}

        {/* Konten Artikel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="
            prose prose-invert prose-lg max-w-none
            prose-headings:font-judul prose-headings:text-teks-utama
            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8
            prose-h2:text-transparent prose-h2:bg-clip-text
            prose-h2:bg-gradient-to-r prose-h2:from-aksen-primer prose-h2:to-aksen-sekunder
            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-aksen-primer
            prose-p:text-teks-sekunder prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-aksen-primer prose-a:no-underline hover:prose-a:underline
            prose-strong:text-teks-utama prose-strong:font-semibold
            prose-ul:text-teks-sekunder prose-ul:list-disc prose-ul:ml-6
            prose-ol:text-teks-sekunder prose-ol:list-decimal prose-ol:ml-6
            prose-li:mb-2
            prose-blockquote:border-l-4 prose-blockquote:border-aksen-primer
            prose-blockquote:pl-6 prose-blockquote:italic
            prose-blockquote:text-teks-sekunder prose-blockquote:bg-latar-sekunder
            prose-blockquote:py-4 prose-blockquote:rounded-r-lg
            prose-code:text-aksen-primer prose-code:bg-latar-sekunder
            prose-code:px-2 prose-code:py-1 prose-code:rounded
          "
          dangerouslySetInnerHTML={{ __html: artikel.konten }}
        />

        {/* Divider */}
        <div className="my-16 border-t border-latar-tersier" />

        {/* Footer - Back to Blog */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Tombol
            teks="Back to All Articles"
            onClick={() => navigate('/blog')}
            varian="sekunder"
            ukuran="lg"
          />
        </motion.div>
      </article>
    </div>
  );
}
