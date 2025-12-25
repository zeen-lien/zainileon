/**
 * Komponen Footer - Footer section
 * Menampilkan copyright dan informasi tambahan
 */
export default function Footer() {
  const tahunSekarang = new Date().getFullYear();

  return (
    <footer className="bg-latar-utama border-t border-latar-tersier py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-teks-sekunder text-sm">
            © {tahunSekarang} Zaini Leon. All rights reserved.
          </p>

          {/* Additional Info */}
          <p className="text-teks-sekunder text-sm">
            Built with <span className="text-aksen-primer">React</span> & <span className="text-aksen-primer">Tailwind CSS</span>
          </p>

          {/* Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-aksen-primer hover:text-aksen-primer/80 transition-colors text-sm font-medium"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
