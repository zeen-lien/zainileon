import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResponsive } from '../../hooks/useResponsive';
import { MENU_NAVIGASI } from '../../utils/konstanta';
import { scrollKeElement } from '../../utils/helper';

/**
 * Komponen Navigasi - Navigation menu dengan sticky positioning
 * Support responsive dengan hamburger menu untuk mobile
 */
export default function Navigasi() {
  const { adalahMobile } = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();
  const [adalahMenuTerbuka, setAdalahMenuTerbuka] = useState(false);
  const [sectionAktif, setSectionAktif] = useState('hero');
  const [adalahScrolled, setAdalahScrolled] = useState(false);

  /**
   * Effect untuk detect scroll position dan update active section
   */
  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state untuk navbar background
      setAdalahScrolled(window.scrollY > 50);

      // Detect active section (hanya di landing page)
      if (location.pathname === '/') {
        const sections = MENU_NAVIGASI.filter(item => item.type === 'scroll').map(item => item.id);
        const posisiScroll = window.scrollY + 100;

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const offsetTop = element.offsetTop;
            const tinggi = element.offsetHeight;
            
            if (posisiScroll >= offsetTop && posisiScroll < offsetTop + tinggi) {
              setSectionAktif(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  /**
   * Handler untuk klik menu item
   */
  const handleMenuClick = (item) => {
    if (item.type === 'route') {
      // Navigate ke route
      navigate(item.target);
    } else {
      // Scroll ke section (hanya jika di landing page)
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollKeElement(item.target), 100);
      } else {
        scrollKeElement(item.target);
      }
    }
    setAdalahMenuTerbuka(false);
  };

  /**
   * Check apakah menu item aktif
   */
  const isMenuAktif = (item) => {
    if (item.type === 'route') {
      return location.pathname.startsWith(item.target);
    }
    return sectionAktif === item.id && location.pathname === '/';
  };

  /**
   * Toggle hamburger menu
   */
  const toggleMenu = () => {
    setAdalahMenuTerbuka(!adalahMenuTerbuka);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${adalahScrolled 
          ? 'bg-latar-utama/90 backdrop-blur-lg border-b border-latar-tersier' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <img 
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Zeen-Lien Laboratory Logo" 
              className="h-12 w-auto object-contain"
              onError={(e) => {
                console.error('Logo failed to load');
                e.target.style.display = 'none';
              }}
            />
          </motion.div>

          {/* Desktop Menu */}
          {!adalahMobile && (
            <div className="flex items-center gap-8">
              {MENU_NAVIGASI.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item)}
                  className={`
                    font-judul font-medium transition-colors duration-300
                    hover:text-aksen-primer
                    ${isMenuAktif(item)
                      ? 'text-aksen-primer' 
                      : 'text-teks-sekunder'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Hamburger Button (Mobile) */}
          {adalahMobile && (
            <button
              onClick={toggleMenu}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={adalahMenuTerbuka ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-aksen-primer transition-all"
              />
              <motion.span
                animate={adalahMenuTerbuka ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-aksen-primer transition-all"
              />
              <motion.span
                animate={adalahMenuTerbuka ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-aksen-primer transition-all"
              />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {adalahMobile && adalahMenuTerbuka && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-latar-sekunder border-t border-latar-tersier overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6">
              <div className="flex flex-col gap-4">
                {MENU_NAVIGASI.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleMenuClick(item)}
                    className={`
                      text-left py-3 px-4 rounded-lg
                      font-judul font-medium transition-all duration-300
                      hover:bg-latar-tersier hover:text-aksen-primer
                      ${isMenuAktif(item)
                        ? 'text-aksen-primer bg-latar-tersier' 
                        : 'text-teks-sekunder'
                      }
                    `}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
