/**
 * File helper berisi fungsi-fungsi utility yang digunakan di berbagai tempat
 */

/**
 * Fungsi untuk smooth scroll ke element tertentu
 * @param {string} targetId - ID element tujuan scroll
 * @param {number} offset - Offset dari top (default: 80px untuk navbar)
 */
export function scrollKeElement(targetId, offset = 80) {
  const element = document.querySelector(targetId);
  if (element) {
    const posisiElement = element.getBoundingClientRect().top + window.pageYOffset;
    const posisiScroll = posisiElement - offset;
    
    window.scrollTo({
      top: posisiScroll,
      behavior: 'smooth'
    });
  }
}

/**
 * Fungsi untuk check apakah element sedang terlihat di viewport
 * @param {HTMLElement} element - Element yang ingin dicek
 * @param {number} threshold - Persentase element yang harus terlihat (0-1)
 * @returns {boolean} - True jika element terlihat
 */
export function adalahElementTerlihat(element, threshold = 0.1) {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const tinggiViewport = window.innerHeight || document.documentElement.clientHeight;
  
  return (
    rect.top <= tinggiViewport * (1 - threshold) &&
    rect.bottom >= tinggiViewport * threshold
  );
}

/**
 * Fungsi untuk format tanggal ke format Indonesia
 * @param {string|Date} tanggal - Tanggal yang ingin diformat
 * @returns {string} - Tanggal terformat
 */
export function formatTanggal(tanggal) {
  const date = new Date(tanggal);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('id-ID', options);
}

/**
 * Fungsi untuk debounce (delay eksekusi function)
 * @param {Function} func - Function yang ingin di-debounce
 * @param {number} delay - Delay dalam milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Fungsi untuk copy text ke clipboard
 * @param {string} teks - Text yang ingin dicopy
 * @returns {Promise<boolean>} - Promise yang resolve true jika berhasil
 */
export async function copyKeClipboard(teks) {
  try {
    await navigator.clipboard.writeText(teks);
    return true;
  } catch (error) {
    console.error('Gagal copy ke clipboard:', error);
    return false;
  }
}
