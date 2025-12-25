import { useEffect, useRef, useState } from 'react';

/**
 * Hook untuk trigger animasi saat element masuk viewport
 * Menggunakan Intersection Observer API untuk detect visibility
 * 
 * @param {object} opsi - Opsi untuk Intersection Observer
 * @param {number} opsi.threshold - Persentase element yang harus terlihat (0-1)
 * @param {string} opsi.rootMargin - Margin dari viewport
 * @returns {[ref, boolean]} - Ref untuk element dan status visibility
 * 
 * @example
 * const [ref, adalahTerlihat] = useAnimasiScroll({ threshold: 0.1 });
 * <div ref={ref} className={adalahTerlihat ? 'animate-fade-in' : 'opacity-0'}>
 *   Content
 * </div>
 */
export function useAnimasiScroll(opsi = {}) {
  const refElement = useRef(null);
  const [adalahTerlihat, setAdalahTerlihat] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set terlihat jika element masuk viewport
        if (entry.isIntersecting) {
          setAdalahTerlihat(true);
        }
      },
      {
        threshold: 0.1, // Trigger saat 10% element terlihat
        rootMargin: '0px',
        ...opsi
      }
    );

    const elementSaatIni = refElement.current;
    
    if (elementSaatIni) {
      observer.observe(elementSaatIni);
    }

    // Cleanup function
    return () => {
      if (elementSaatIni) {
        observer.unobserve(elementSaatIni);
      }
    };
  }, [opsi]);

  return [refElement, adalahTerlihat];
}
