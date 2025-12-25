import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '../utils/konstanta';

/**
 * Hook untuk detect breakpoint responsive saat ini
 * Mengembalikan informasi tentang ukuran layar dan breakpoint aktif
 * 
 * @returns {object} - Object berisi informasi responsive
 * @returns {boolean} object.adalahMobile - True jika layar mobile
 * @returns {boolean} object.adalahTablet - True jika layar tablet
 * @returns {boolean} object.adalahDesktop - True jika layar desktop
 * @returns {number} object.lebarLayar - Lebar layar dalam pixel
 * 
 * @example
 * const { adalahMobile, adalahDesktop } = useResponsive();
 * return adalahMobile ? <MenuMobile /> : <MenuDesktop />;
 */
export function useResponsive() {
  const [lebarLayar, setLebarLayar] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    /**
     * Handler untuk update lebar layar saat window resize
     */
    const handleResize = () => {
      setLebarLayar(window.innerWidth);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    adalahMobile: lebarLayar < BREAKPOINTS.tablet,
    adalahTablet: lebarLayar >= BREAKPOINTS.tablet && lebarLayar < BREAKPOINTS.desktop,
    adalahDesktop: lebarLayar >= BREAKPOINTS.desktop,
    lebarLayar
  };
}
