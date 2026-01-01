import { motion } from 'framer-motion';
import { useAnimasiScroll } from '../../hooks/useAnimasiScroll';

/**
 * Komponen SeksiTentang - About section
 * Menampilkan bio dan informasi tentang owner
 */
export default function SeksiTentang() {
  const [ref, adalahTerlihat] = useAnimasiScroll({ threshold: 0.3 });

  // Varian animasi untuk content
  const varianContent = {
    tersembunyi: { opacity: 0, y: 50 },
    terlihat: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section 
      id="tentang"
      ref={ref}
      data-section="about"
      className="min-h-screen flex items-center py-20 bg-latar-sekunder relative overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-ungu rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-ungu rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={varianContent}
          initial="tersembunyi"
          animate={adalahTerlihat ? "terlihat" : "tersembunyi"}
          className="max-w-4xl mx-auto"
        >
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-judul font-bold section-title mb-8 text-center"
              style={{ color: '#a855f7', textShadow: '0 0 20px rgba(168, 85, 247, 0.6)' }}>
            About Me
          </h2>

          {/* Bio Content */}
          <div className="space-y-6 text-teks-sekunder text-lg leading-relaxed">
            <p>
              Saya adalah seorang <span className="section-accent font-semibold" style={{ color: '#a855f7' }}>Frontend Developer</span> yang passionate dalam menciptakan pengalaman web yang modern, interaktif, dan futuristik. Dengan fokus pada detail dan estetika, saya selalu berusaha menghadirkan interface yang tidak hanya indah dipandang, tetapi juga intuitif dan performant.
            </p>

            <p>
              Selain coding, saya juga aktif sebagai <span className="section-accent font-semibold" style={{ color: '#a855f7' }}>Multi-Asset Trader</span> yang berfokus pada analisis teknikal dan fundamental di berbagai instrumen trading termasuk <span className="text-teks-utama">Forex, Cryptocurrency, Index, dan Commodities</span>. Pengalaman trading ini mengajarkan saya tentang disiplin, risk management, dan pengambilan keputusan yang terukur.
            </p>

            <p>
              Kombinasi antara skill teknis di frontend development dan mindset analitis dari trading membentuk pendekatan unik saya dalam problem-solving dan product development. Saya percaya bahwa teknologi dan data-driven decision making adalah kunci untuk menciptakan solusi yang impactful.
            </p>
          </div>

          {/* Skills/Expertise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {/* Frontend Development */}
            <div className="bg-transparent border-2 rounded-xl p-6 transition-all duration-300 group"
                 style={{ 
                   borderColor: 'rgba(168, 85, 247, 0.3)',
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.borderColor = '#a855f7';
                   e.currentTarget.style.boxShadow = '0 0 25px rgba(168, 85, 247, 0.4)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
                   e.currentTarget.style.boxShadow = 'none';
                 }}>
              <h3 className="text-xl font-judul font-bold text-aksen-primer mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-aksen-primer rounded-full group-hover:animate-pulse"></span>
                Frontend Development
              </h3>
              <ul className="space-y-2 text-teks-sekunder">
                <li className="flex items-center gap-2">
                  <span className="text-aksen-primer">▹</span> React & Modern JavaScript
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-aksen-primer">▹</span> Responsive & Mobile-First Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-aksen-primer">▹</span> UI/UX Implementation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-aksen-primer">▹</span> Performance Optimization
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-aksen-primer">▹</span> Animation & Interactions
                </li>
              </ul>
            </div>

            {/* Trading */}
            <div className="bg-transparent border-2 border-latar-tersier rounded-xl p-6 hover:border-aksen-sekunder transition-all duration-300 group">
              <h3 className="text-xl font-judul font-bold text-aksen-sekunder mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-aksen-sekunder rounded-full group-hover:animate-pulse"></span>
                Multi-Asset Trading
              </h3>
              <ul className="space-y-2 text-teks-sekunder">
                <li className="flex items-center gap-2">
                  <span className="text-aksen-sekunder">▹</span> Forex Trading
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-aksen-sekunder">▹</span> Cryptocurrency Markets
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-aksen-sekunder">▹</span> Index & Commodities
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-aksen-sekunder">▹</span> Technical Analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-aksen-sekunder">▹</span> Risk Management
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
