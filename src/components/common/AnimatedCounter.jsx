import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { useAnimasiScroll } from '../../hooks/useAnimasiScroll';

/**
 * AnimatedCounter - Animated number counter dengan easing
 * Animasi dimulai saat element terlihat di viewport
 */
export default function AnimatedCounter({ from = 0, to, duration = 2, suffix = '', prefix = '' }) {
  const [ref, adalahTerlihat] = useAnimasiScroll({ threshold: 0.5 });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (adalahTerlihat) {
      const controls = animate(count, to, {
        duration,
        ease: 'easeOut',
      });

      return controls.stop;
    }
  }, [adalahTerlihat, count, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
