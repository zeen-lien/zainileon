import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LaboratoryLogin from '../components/laboratory/LaboratoryLogin';
import LaboratoryDashboard from '../components/laboratory/LaboratoryDashboard';

/**
 * Komponen Laboratory - Private area dengan password protection
 * Hanya bisa diakses dengan password yang benar
 */
export default function Laboratory() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Check authentication status dari localStorage
   */
  useEffect(() => {
    const authStatus = localStorage.getItem('lab_auth');
    const authTime = localStorage.getItem('lab_auth_time');
    
    if (authStatus === 'true' && authTime) {
      // Check if auth is still valid (24 hours)
      const currentTime = new Date().getTime();
      const authTimestamp = parseInt(authTime);
      const hoursPassed = (currentTime - authTimestamp) / (1000 * 60 * 60);
      
      if (hoursPassed < 24) {
        setIsAuthenticated(true);
      } else {
        // Auth expired
        localStorage.removeItem('lab_auth');
        localStorage.removeItem('lab_auth_time');
      }
    }
    
    setIsLoading(false);
  }, []);

  /**
   * Handler untuk successful login
   */
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('lab_auth', 'true');
    localStorage.setItem('lab_auth_time', new Date().getTime().toString());
  };

  /**
   * Handler untuk logout
   */
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('lab_auth');
    localStorage.removeItem('lab_auth_time');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-latar-utama flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-aksen-primer text-xl font-judul"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-latar-utama">
      {!isAuthenticated ? (
        <LaboratoryLogin onLoginSuccess={handleLoginSuccess} />
      ) : (
        <LaboratoryDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}
