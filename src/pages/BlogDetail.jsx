import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { getArtikelBySlug } from '../data/dataBlog';
import { formatTanggal, hitungWaktuBaca, copyKeClipboard } from '../utils/helper';
import Tombol from '../components/common/Tombol';
import { useState } from 'react';

/**
 * Komponen BlogDetail - Halaman detail artikel blog
 * Menampilkan konten lengkap artikel
 */
export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const artikel = getArtikelBySlug(slug);
  const [copied, setCopied] = useState(false);

  // Handler untuk share
  const handleShare = async (platform) => {
    const url = window.location.href;
    const title = artikel?.judul || '';
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    };

    if (platform === 'copy') {
      const success = await copyKeClipboard(url);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

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
            <span className="text-sm text-teks-sekunder flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {hitungWaktuBaca(artikel.konten)} min read
            </span>
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

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-lg font-judul font-bold text-teks-utama mb-4">Share this article</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleShare('twitter')}
              className="px-6 py-3 bg-[#1DA1F2]/10 border-2 border-[#1DA1F2]/30 text-[#1DA1F2] rounded-lg font-medium hover:bg-[#1DA1F2]/20 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="px-6 py-3 bg-[#1877F2]/10 border-2 border-[#1877F2]/30 text-[#1877F2] rounded-lg font-medium hover:bg-[#1877F2]/20 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="px-6 py-3 bg-[#0A66C2]/10 border-2 border-[#0A66C2]/30 text-[#0A66C2] rounded-lg font-medium hover:bg-[#0A66C2]/20 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </button>
            <button
              onClick={() => handleShare('whatsapp')}
              className="px-6 py-3 bg-[#25D366]/10 border-2 border-[#25D366]/30 text-[#25D366] rounded-lg font-medium hover:bg-[#25D366]/20 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </button>
            <button
              onClick={() => handleShare('copy')}
              className={`px-6 py-3 border-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                copied 
                  ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                  : 'bg-latar-sekunder border-latar-tersier text-teks-sekunder hover:border-aksen-primer hover:text-aksen-primer'
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Link
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="my-12 border-t border-latar-tersier" />

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
