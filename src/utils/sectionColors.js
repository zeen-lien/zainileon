/**
 * Color theming untuk setiap section
 * Setiap section punya warna khas sendiri untuk UI/UX yang lebih menarik
 */

export const SECTION_COLORS = {
  hero: {
    primary: '#00d4ff',      // Cyan - Main brand
    secondary: '#00b8e6',
    glow: 'rgba(0, 212, 255, 0.5)',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
  },
  about: {
    primary: '#a855f7',      // Purple - Creative/Personal
    secondary: '#9333ea',
    glow: 'rgba(168, 85, 247, 0.5)',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
  },
  skills: {
    primary: '#00d4ff',      // Cyan - Multi-color per skill
    secondary: '#a855f7',
    glow: 'rgba(0, 212, 255, 0.5)',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)',
  },
  timeline: {
    primary: '#7dd3c0',      // Mint Green - Journey/Growth
    secondary: '#5fb8a8',
    glow: 'rgba(125, 211, 192, 0.5)',
    gradient: 'linear-gradient(135deg, #7dd3c0 0%, #4ade80 100%)',
  },
  portfolio: {
    primary: '#7dd3c0',      // Mint Green - Projects/Work
    secondary: '#5fb8a8',
    glow: 'rgba(125, 211, 192, 0.5)',
    gradient: 'linear-gradient(135deg, #7dd3c0 0%, #10b981 100%)',
  },
  blog: {
    primary: '#f59e0b',      // Amber/Orange - Content/Knowledge
    secondary: '#d97706',
    glow: 'rgba(245, 158, 11, 0.5)',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
  },
  contact: {
    primary: '#00d4ff',      // Cyan + Purple gradient
    secondary: '#a855f7',
    glow: 'rgba(0, 212, 255, 0.5)',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)',
  },
  laboratory: {
    primary: '#ef4444',      // Red/Pink - Exclusive/Private
    secondary: '#dc2626',
    glow: 'rgba(239, 68, 68, 0.5)',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #be123c 100%)',
  },
};

/**
 * Helper function untuk generate CSS variables dari color scheme
 */
export const getSectionColorVars = (sectionName) => {
  const colors = SECTION_COLORS[sectionName] || SECTION_COLORS.hero;
  return {
    '--section-primary': colors.primary,
    '--section-secondary': colors.secondary,
    '--section-glow': colors.glow,
    '--section-gradient': colors.gradient,
  };
};

/**
 * Helper untuk get inline styles dengan section colors
 */
export const getSectionStyles = (sectionName) => {
  const colors = SECTION_COLORS[sectionName] || SECTION_COLORS.hero;
  return {
    '--color-primary': colors.primary,
    '--color-secondary': colors.secondary,
    '--color-glow': colors.glow,
  };
};
