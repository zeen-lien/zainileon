/**
 * Data social media dan kontak
 * Berisi informasi lengkap untuk menghubungi owner melalui berbagai platform
 */

export const DAFTAR_SOSIAL_MEDIA = [
  {
    platform: 'Instagram',
    username: '@zien_lien',
    link: 'https://www.instagram.com/zien_lien',
    ikon: 'Instagram',
    warna: '#E4405F'
  },
  {
    platform: 'Telegram',
    username: '@zeenlien',
    link: 'https://t.me/zeenlien',
    ikon: 'Telegram',
    warna: '#0088cc'
  },
  {
    platform: 'GitHub',
    username: 'zeen-lien',
    link: 'https://github.com/zeen-lien',
    ikon: 'GitHub',
    warna: '#ffffff'
  },
  {
    platform: 'WhatsApp',
    username: '083866608315',
    link: 'https://wa.me/6283866608315',
    ikon: 'WhatsApp',
    warna: '#25D366'
  }
];

/**
 * Fungsi untuk mendapatkan social media berdasarkan platform
 * @param {string} platform - Nama platform yang dicari
 * @returns {object|null} - Object social media atau null jika tidak ditemukan
 */
export function dapatkanSosialMediaByPlatform(platform) {
  return DAFTAR_SOSIAL_MEDIA.find(sosmed => sosmed.platform === platform) || null;
}
