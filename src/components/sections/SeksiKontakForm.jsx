import { motion } from 'framer-motion';
import { useState } from 'react';
import Swal from 'sweetalert2';

/**
 * SeksiKontakForm - Contact form dengan Formspree integration
 * Langsung kirim email ke zeenlien12@gmail.com
 */
function SeksiKontakForm() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    subjek: '',
    pesan: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validasi
    if (!formData.nama || !formData.email || !formData.pesan) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mohon isi semua field yang required!',
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#00FFFF',
      });
      setIsLoading(false);
      return;
    }

    try {
      // Formspree endpoint - GANTI dengan Form ID lo setelah daftar
      // Daftar di: https://formspree.io/
      // Atau pake endpoint test ini dulu
      const response = await fetch('https://formspree.io/f/xanyqbqe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nama,
          email: formData.email,
          subject: formData.subjek || 'Pesan dari Website',
          message: formData.pesan,
          _replyto: formData.email,
          _subject: `Pesan dari ${formData.nama} - ${formData.subjek || 'Website Contact'}`,
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Pesan Terkirim!',
          text: 'Terima kasih! Gw akan segera merespon pesan lo.',
          background: '#1a1a1a',
          color: '#ffffff',
          confirmButtonColor: '#00FFFF',
        });

        // Reset form
        setFormData({
          nama: '',
          email: '',
          subjek: '',
          pesan: '',
        });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Form Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengirim',
        text: 'Terjadi kesalahan. Coba lagi nanti atau hubungi via email langsung: zeenlien12@gmail.com',
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#00FFFF',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="kontak-form" className="py-20 px-6 bg-hitam">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cyan">Get In</span> <span className="text-ungu">Touch</span>
          </h2>
          <p className="text-abu-terang text-lg">
            Punya project atau kolaborasi? Drop pesan di sini!
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-abu-gelap p-8 rounded-2xl border border-abu-sedang"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Nama */}
            <div>
              <label htmlFor="nama" className="block text-putih font-medium mb-2">
                Nama <span className="text-merah">*</span>
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-abu-sedang text-putih rounded-lg border border-abu-sedang focus:border-cyan focus:outline-none transition-colors"
                placeholder="Nama lo"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-putih font-medium mb-2">
                Email <span className="text-merah">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-abu-sedang text-putih rounded-lg border border-abu-sedang focus:border-cyan focus:outline-none transition-colors"
                placeholder="email@example.com"
              />
            </div>
          </div>

          {/* Subjek */}
          <div className="mb-6">
            <label htmlFor="subjek" className="block text-putih font-medium mb-2">
              Subjek
            </label>
            <input
              type="text"
              id="subjek"
              name="subjek"
              value={formData.subjek}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-abu-sedang text-putih rounded-lg border border-abu-sedang focus:border-cyan focus:outline-none transition-colors"
              placeholder="Tentang apa?"
            />
          </div>

          {/* Pesan */}
          <div className="mb-6">
            <label htmlFor="pesan" className="block text-putih font-medium mb-2">
              Pesan <span className="text-merah">*</span>
            </label>
            <textarea
              id="pesan"
              name="pesan"
              value={formData.pesan}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-4 py-3 bg-abu-sedang text-putih rounded-lg border border-abu-sedang focus:border-cyan focus:outline-none transition-colors resize-none"
              placeholder="Tulis pesan lo di sini..."
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-cyan to-ungu text-hitam font-bold rounded-lg hover:shadow-lg hover:shadow-cyan/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Mengirim...' : 'Kirim Pesan'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

export default SeksiKontakForm;
