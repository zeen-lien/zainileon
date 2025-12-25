/**
 * File konstanta untuk menyimpan nilai-nilai tetap yang digunakan di seluruh aplikasi
 * Termasuk warna, breakpoints, durasi animasi, dll
 */

// Warna tema gelap futuristik (matching logo gradient)
export const WARNA = {
  latar: {
    utama: '#000000',
    sekunder: '#0a0a0a',
    tersier: '#1a1a1a',
  },
  teks: {
    utama: '#ffffff',
    sekunder: '#a0a0a0',
    aksen: '#00d4ff',
  },
  aksen: {
    primer: '#00d4ff',      // Cyan (dari logo)
    sekunder: '#a855f7',    // Purple (dari logo)
    tersier: '#7dd3c0',     // Green mint (transisi logo)
    bahaya: '#dc2626',
    sukses: '#10b981',
  },
};

// Breakpoints untuk responsive design
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
};

// Durasi animasi
export const DURASI_ANIMASI = {
  cepat: 0.3,
  normal: 0.6,
  lambat: 1.0,
};

// Easing functions untuk animasi
export const EASING = {
  default: [0.4, 0.0, 0.2, 1],
  smooth: [0.4, 0.0, 0.6, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
};

// Menu navigasi
export const MENU_NAVIGASI = [
  { id: 'hero', label: 'Home', target: '/', type: 'route' },
  { id: 'tentang', label: 'About', target: '#tentang', type: 'scroll' },
  { id: 'portfolio', label: 'Portfolio', target: '/portfolio', type: 'route' },
  { id: 'blog', label: 'Blog', target: '/blog', type: 'route' },
  { id: 'laboratory', label: 'Laboratory', target: '/laboratory', type: 'route' },
  { id: 'kontak', label: 'Contact', target: '#kontak', type: 'scroll' },
];

// Tagline profesional
export const TAGLINE = 'Frontend Developer & Multi-Asset Trader';
export const SUB_TAGLINE = 'Crafting modern web experiences with dark futuristic aesthetics';
