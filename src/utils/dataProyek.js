/**
 * Data proyek-proyek yang pernah dibuat
 * Berisi informasi lengkap tentang setiap project untuk ditampilkan di portfolio
 * 
 * Status:
 * - 'live': Project deployed dan bisa diakses
 * - 'development': Masih dalam pengembangan
 * - 'source-only': Source code tersedia, belum/tidak deploy
 */

export const DAFTAR_PROYEK = [
  // === LIVE PROJECTS ===
  {
    id: 'nonton-film',
    namaProyek: 'Nonton Film',
    deskripsi: 'Aplikasi web untuk mencari dan melihat informasi film dengan integrasi API',
    deskripsiPanjang: 'Platform web interaktif yang memungkinkan pengguna mencari informasi film, melihat rating, dan detail lengkap menggunakan API eksternal.',
    linkDemo: 'https://zeen-lien.github.io/nontonfilm/',
    linkGithub: 'https://github.com/zeen-lien/nontonfilm',
    teknologi: ['React', 'API Integration', 'Responsive Design'],
    kategori: 'web-app',
    status: 'live'
  },
  {
    id: 'fsa-ecommerce',
    namaProyek: 'FSA E-commerce Simulator',
    deskripsi: 'Simulasi e-commerce dengan fitur lengkap termasuk cart dan checkout',
    deskripsiPanjang: 'Aplikasi simulasi e-commerce yang menampilkan fitur-fitur lengkap seperti product listing, shopping cart, dan checkout flow.',
    linkDemo: 'https://zeen-lien.github.io/fsa-ecommerce-simulator/',
    linkGithub: 'https://github.com/zeen-lien/fsa-ecommerce-simulator',
    teknologi: ['JavaScript', 'CSS', 'Local Storage'],
    kategori: 'web-app',
    status: 'live'
  },
  {
    id: 'jawa-tengah-maps',
    namaProyek: 'Jawa Tengah Maps',
    deskripsi: 'Peta interaktif Jawa Tengah dengan informasi lokasi dan navigasi',
    deskripsiPanjang: 'Aplikasi peta interaktif yang menampilkan berbagai lokasi menarik di Jawa Tengah dengan fitur navigasi dan informasi detail.',
    linkDemo: 'https://zeen-lien.github.io/jawa-tengah-maps/',
    linkGithub: 'https://github.com/zeen-lien/jawa-tengah-maps',
    teknologi: ['Maps API', 'JavaScript', 'UI/UX'],
    kategori: 'web-app',
    status: 'live'
  },
  {
    id: 'felina',
    namaProyek: 'Felina',
    deskripsi: 'Project web application dengan desain modern dan interaktif',
    deskripsiPanjang: 'Aplikasi web dengan fokus pada user experience dan desain visual yang menarik.',
    linkDemo: 'https://zeen-lien.github.io/felina/',
    linkGithub: 'https://github.com/zeen-lien/felina',
    teknologi: ['HTML', 'CSS', 'JavaScript'],
    kategori: 'web-app',
    status: 'live'
  },

  // === SOURCE CODE ONLY ===
  {
    id: 'zenmazip',
    namaProyek: 'ZenmaZip',
    deskripsi: 'Aplikasi kompresi dan ekstraksi file dengan PHP backend',
    deskripsiPanjang: 'Tool untuk compress dan extract file dengan berbagai format. Built dengan PHP untuk server-side processing.',
    linkDemo: null,
    linkGithub: 'https://github.com/zeen-lien/zenmazip',
    teknologi: ['PHP', 'JavaScript', 'File System'],
    kategori: 'utility',
    status: 'source-only'
  },
  {
    id: 'leonix',
    namaProyek: 'Leonix',
    deskripsi: 'Custom web framework atau library untuk development',
    deskripsiPanjang: 'Personal framework/library yang gw develop untuk mempercepat workflow development.',
    linkDemo: null,
    linkGithub: 'https://github.com/zeen-lien/leonix',
    teknologi: ['JavaScript', 'Framework', 'Tools'],
    kategori: 'library',
    status: 'source-only'
  },
  {
    id: 'leon-liquidity-engine',
    namaProyek: 'Leon Liquidity Engine',
    deskripsi: 'Trading liquidity analysis engine untuk market analysis',
    deskripsiPanjang: 'Engine untuk analisa liquidity di market trading. Membantu identify liquidity zones dan potential entry points.',
    linkDemo: null,
    linkGithub: 'https://github.com/zeen-lien/Leon-Liquidity-Engine',
    teknologi: ['Python', 'Data Analysis', 'Trading'],
    kategori: 'trading-tool',
    status: 'source-only'
  },
  {
    id: 'love',
    namaProyek: 'Love',
    deskripsi: 'Personal project dengan tema creative dan experimental',
    deskripsiPanjang: 'Experimental project untuk explore creative coding dan interactive design.',
    linkDemo: 'https://love-sage-nu.vercel.app/',
    linkGithub: 'https://github.com/zeen-lien/love',
    teknologi: ['JavaScript', 'Creative Coding', 'Animation'],
    kategori: 'experimental',
    status: 'live'
  },
  {
    id: 'project-arduino',
    namaProyek: 'Arduino Projects',
    deskripsi: 'Collection of Arduino hardware projects dan IoT experiments',
    deskripsiPanjang: 'Berbagai project Arduino untuk IoT, automation, dan hardware prototyping.',
    linkDemo: null,
    linkGithub: 'https://github.com/zeen-lien/project_arduino',
    teknologi: ['Arduino', 'C++', 'IoT', 'Hardware'],
    kategori: 'hardware',
    status: 'source-only'
  },
];

/**
 * Fungsi untuk mendapatkan project berdasarkan ID
 * @param {string} id - ID project yang dicari
 * @returns {object|null} - Object project atau null jika tidak ditemukan
 */
export function dapatkanProyekById(id) {
  return DAFTAR_PROYEK.find(proyek => proyek.id === id) || null;
}

/**
 * Fungsi untuk mendapatkan semua project berdasarkan kategori
 * @param {string} kategori - Kategori project yang dicari
 * @returns {array} - Array of projects dengan kategori tersebut
 */
export function dapatkanProyekByKategori(kategori) {
  return DAFTAR_PROYEK.filter(proyek => proyek.kategori === kategori);
}

/**
 * Export dengan nama DATA_PROYEK untuk konsistensi
 */
export const DATA_PROYEK = DAFTAR_PROYEK;

/**
 * Helper function untuk get semua teknologi unik
 */
export const getAllTeknologi = () => {
  const teknologiSet = new Set();
  DAFTAR_PROYEK.forEach(proyek => {
    proyek.teknologi.forEach(tek => teknologiSet.add(tek));
  });
  return Array.from(teknologiSet);
};
