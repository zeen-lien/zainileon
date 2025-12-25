import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Komponen LaboratoryLogin - Login form untuk Laboratory
 * Simple password protection (frontend only)
 * 
 * Password default: "zeenlien2024" (bisa diganti di CORRECT_PASSWORD_HASH)
 */
export default function LaboratoryLogin({ onLoginSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Password hash (SHA-256 of "felina201225")
  // Ganti password: https://emn178.github.io/online-tools/sha256.html
  const CORRECT_PASSWORD_HASH = 'ac2ce74ae9d3ef06c12d28f57d0f823a047ba54c7d7d05511f30b3312f98e969';

  /**
   * Simple SHA-256 hash function
   */
  const sha256 = async (message) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  /**
   * Handler untuk submit password
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const hashedPassword = await sha256(password);
      
      if (hashedPassword === CORRECT_PASSWORD_HASH) {
        // Password correct
        onLoginSuccess();
      } else {
        // Password wrong
        setError('Invalid password. Access denied.');
        setPassword('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <svg className="w-20 h-20 text-aksen-primer mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </motion.div>
          
          <h1 className="
            text-4xl md:text-5xl font-judul font-bold mb-3
            text-transparent bg-clip-text
            bg-gradient-to-r from-aksen-primer to-aksen-sekunder
          ">
            Laboratory
          </h1>
          <p className="text-teks-sekunder text-lg">
            Private Area - Authentication Required
          </p>
        </div>

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="
            bg-latar-sekunder border-2 border-latar-tersier
            rounded-xl p-8
            hover:border-aksen-primer/30
            transition-all duration-300
          "
        >
          {/* Password Input */}
          <div className="mb-6">
            <label 
              htmlFor="password" 
              className="block text-teks-utama font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="
                w-full px-4 py-3 rounded-lg
                bg-latar-utama border-2 border-latar-tersier
                text-teks-utama placeholder-teks-sekunder
                focus:border-aksen-primer focus:outline-none
                transition-colors duration-300
              "
              disabled={isLoading}
              autoFocus
            />
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                mb-6 p-4 rounded-lg
                bg-red-500/10 border border-red-500/30
                text-red-400 text-sm
              "
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !password}
            className="
              w-full px-6 py-3 rounded-lg
              bg-aksen-primer text-latar-utama
              font-judul font-semibold
              hover:bg-aksen-primer/80
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300
              flex items-center justify-center gap-2
            "
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Verifying...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                Access Laboratory
              </>
            )}
          </button>

          {/* Info */}
          <p className="mt-6 text-center text-teks-sekunder text-sm">
            This area is password protected. Contact admin for access.
          </p>
        </motion.form>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-teks-sekunder text-xs flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Session expires after 24 hours
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
