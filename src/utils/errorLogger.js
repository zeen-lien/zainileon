/**
 * Utility untuk logging error dengan format yang konsisten
 * Membantu debugging dan monitoring error di aplikasi
 */

/**
 * Fungsi untuk mencatat error ke console dengan format yang konsisten
 * @param {string} jenisError - Tipe error (network, auth, navigation, dll)
 * @param {Error} error - Object error yang terjadi
 * @param {object} konteksError - Informasi tambahan tentang konteks error
 */
export function catatError(jenisError, error, konteksError = {}) {
  console.error(`[${jenisError}]`, {
    pesan: error.message,
    stack: error.stack,
    konteks: konteksError,
    waktu: new Date().toISOString()
  });
}

/**
 * Fungsi untuk mencatat warning
 * @param {string} pesan - Pesan warning
 * @param {object} konteks - Konteks tambahan
 */
export function catatWarning(pesan, konteks = {}) {
  console.warn(`[WARNING]`, {
    pesan,
    konteks,
    waktu: new Date().toISOString()
  });
}

/**
 * Fungsi untuk mencatat info
 * @param {string} pesan - Pesan info
 * @param {object} konteks - Konteks tambahan
 */
export function catatInfo(pesan, konteks = {}) {
  console.info(`[INFO]`, {
    pesan,
    konteks,
    waktu: new Date().toISOString()
  });
}
