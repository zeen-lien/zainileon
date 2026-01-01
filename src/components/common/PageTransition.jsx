import { motion } from 'framer-motion';

/**
 * PageTransition - Wrapper untuk smooth page transitions
 * Digunakan untuk wrap setiap page/section
 */
function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
