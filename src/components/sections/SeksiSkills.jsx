import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Data skills dengan kategori dan level
 */
const SKILLS_DATA = {
  frontend: [
    { 
      nama: 'React', 
      level: 90, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9z"/>
        </svg>
      )
    },
    { 
      nama: 'JavaScript', 
      level: 95, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3h18v18H3V3m4.73 15.04c.4.85 1.19 1.55 2.54 1.55 1.5 0 2.53-.8 2.53-2.55v-5.78h-1.7V17c0 .86-.35 1.08-.9 1.08-.58 0-.82-.4-1.09-.87l-1.38.83m5.98-.18c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03l-1.38.8z"/>
        </svg>
      )
    },
    { 
      nama: 'TypeScript', 
      level: 80, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3h18v18H3V3m10.71 14.86c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03l-1.38.8M13 11.25H8v1.5h1.5V20h1.75v-7.25H13v-1.5z"/>
        </svg>
      )
    },
    { 
      nama: 'Tailwind CSS', 
      level: 90, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6m-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.5 12 7 12z"/>
        </svg>
      )
    },
    { 
      nama: 'HTML/CSS', 
      level: 95, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.56l4.07-1.13.55-6.1H9.38L9.2 8.3h7.6l.2-1.99H7l.56 6.01h6.89l-.23 2.58-2.22.6-2.22-.6-.14-1.66h-2l.29 3.19L12 17.56M4.07 3h15.86L18.5 19.2 12 21l-6.5-1.8L4.07 3z"/>
        </svg>
      )
    },
    { 
      nama: 'Framer Motion', 
      level: 85, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 0h16v8h-8zm0 8h8l8 8H4zm0 8h8v8z"/>
        </svg>
      )
    },
  ],
  backend: [
    { 
      nama: 'Node.js', 
      level: 75, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.71.47 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5a.26.26 0 0 1-.11-.21V7.71c0-.09.04-.17.11-.21l7.44-4.29c.06-.04.16-.04.22 0l7.44 4.29c.07.04.11.12.11.21v8.58c0 .08-.04.16-.11.21l-7.44 4.29c-.06.04-.16.04-.23 0L10 19.65c-.08-.03-.16-.04-.21-.01-.53.3-.63.36-1.12.51-.12.04-.31.11.07.32l2.48 1.47c.24.14.5.21.78.21s.54-.07.78-.21l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2M14 8c-2.12 0-3.39.89-3.39 2.39 0 1.61 1.26 2.08 3.3 2.28 2.43.24 2.62.6 2.62 1.08 0 .83-.67 1.18-2.23 1.18-1.98 0-2.4-.49-2.55-1.47a.226.226 0 0 0-.22-.18h-.96c-.12 0-.21.09-.21.22 0 1.24.68 2.74 3.94 2.74 2.35 0 3.7-.93 3.7-2.55 0-1.61-1.08-2.03-3.37-2.34-2.31-.3-2.54-.46-2.54-1 0-.45.2-1.05 1.91-1.05 1.5 0 2.09.33 2.32 1.36.02.1.11.17.21.17h.97c.05 0 .11-.02.15-.07.04-.04.07-.1.05-.16C17.56 8.82 16.38 8 14 8z"/>
        </svg>
      )
    },
    { 
      nama: 'PHP', 
      level: 70, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.01 10.49c-.53 0-.97.18-1.31.54-.33.36-.5.85-.5 1.48 0 .64.18 1.13.53 1.48.35.35.79.53 1.32.53.53 0 .97-.18 1.31-.53.34-.35.51-.84.51-1.48 0-.63-.17-1.12-.51-1.48-.34-.36-.78-.54-1.35-.54m-.01-1.32c.98 0 1.76.28 2.35.84.58.56.87 1.33.87 2.3 0 .98-.29 1.75-.87 2.31-.59.56-1.37.84-2.35.84-.98 0-1.76-.28-2.35-.84-.58-.56-.87-1.33-.87-2.31 0-.97.29-1.74.87-2.3.59-.56 1.37-.84 2.35-.84M23.5 11.5c0 .63-.17 1.12-.51 1.48-.34.35-.78.53-1.31.53-.53 0-.97-.18-1.31-.53-.34-.36-.51-.85-.51-1.48 0-.64.17-1.13.51-1.48.34-.36.78-.54 1.31-.54.53 0 .97.18 1.31.54.34.35.51.84.51 1.48m-4.96-2.16c.59-.56 1.37-.84 2.35-.84.98 0 1.76.28 2.35.84.58.56.87 1.33.87 2.3 0 .98-.29 1.75-.87 2.31-.59.56-1.37.84-2.35.84-.98 0-1.76-.28-2.35-.84-.58-.56-.87-1.33-.87-2.31 0-.97.29-1.74.87-2.3M12 5.5c3.78 0 7.2 1.09 9.67 2.87C19.45 6.59 15.96 5.5 12 5.5c-3.96 0-7.45 1.09-9.67 2.87C4.8 6.59 8.22 5.5 12 5.5M12 18.5c-3.78 0-7.2-1.09-9.67-2.87C4.55 17.41 8.04 18.5 12 18.5c3.96 0 7.45-1.09 9.67-2.87-2.22 1.78-5.71 2.87-9.67 2.87M12 3C6.48 3 2 6.58 2 11s4.48 8 10 8 10-3.58 10-8-4.48-8-10-8z"/>
        </svg>
      )
    },
    { 
      nama: 'Python', 
      level: 80, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.585 11.692h4.328s2.432.039 2.432-2.35V5.391S16.714 3 11.936 3C7.362 3 7.647 4.983 7.647 4.983l.006 2.055h4.363v.617H5.92s-2.927-.332-2.927 4.282 2.555 4.45 2.555 4.45h1.524v-2.141s-.083-2.554 2.513-2.554zm-.056-5.74a.784.784 0 1 1 0-1.57.784.784 0 1 1 0 1.57z"/>
          <path d="M18.452 7.532h-1.524v2.141s.083 2.554-2.513 2.554h-4.328s-2.432-.04-2.432 2.35v3.951s-.369 2.391 4.409 2.391c4.573 0 4.288-1.983 4.288-1.983l-.006-2.054h-4.363v-.617h6.097s2.927.332 2.927-4.282-2.555-4.451-2.555-4.451zm-3.981 10.436a.784.784 0 1 1 0 1.57.784.784 0 1 1 0-1.57z"/>
        </svg>
      )
    },
    { 
      nama: 'REST API', 
      level: 85, 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
  ],
  tools: [
    { 
      nama: 'Git/GitHub', 
      level: 90, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      )
    },
    { 
      nama: 'VS Code', 
      level: 95, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
        </svg>
      )
    },
    { 
      nama: 'Vite', 
      level: 85, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55a.306.306 0 0 1-.593-.111l.83-7.014a.306.306 0 0 0-.407-.329l-3.483 1.119a.306.306 0 0 1-.36-.45l4.67-9.4a.306.306 0 0 0-.354-.442l-4.635.924a.306.306 0 0 1-.348-.457l1.558-3.403a.306.306 0 0 0-.352-.442l-8.296 2.117a.306.306 0 0 0-.17.525l7.914 7.126a.306.306 0 0 1-.12.525l-3.483 1.119a.306.306 0 0 0 .12.588z"/>
        </svg>
      )
    },
    { 
      nama: 'npm/yarn', 
      level: 90, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"/>
        </svg>
      )
    },
  ],
  trading: [
    { 
      nama: 'Technical Analysis', 
      level: 90, 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      nama: 'Risk Management', 
      level: 85, 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    { 
      nama: 'Multi-Asset Trading', 
      level: 88, 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    { 
      nama: 'Market Psychology', 
      level: 82, 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
  ],
};

const KATEGORI_LABELS = {
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  tools: 'Tools & Workflow',
  trading: 'Trading & Analysis',
};

/**
 * SeksiSkills - Section untuk showcase skills dan expertise
 */
function SeksiSkills() {
  const [kategoriAktif, setKategoriAktif] = useState('frontend');

  return (
    <section id="skills" className="py-20 px-6 bg-hitam relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-ungu rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cyan">Skills</span> & <span className="text-ungu">Expertise</span>
          </h2>
          <p className="text-abu-terang text-lg">
            Teknologi dan tools yang gw kuasai untuk craft digital experiences
          </p>
        </motion.div>

        {/* Kategori Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(SKILLS_DATA).map((kategori) => (
            <motion.button
              key={kategori}
              onClick={() => setKategoriAktif(kategori)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                kategoriAktif === kategori
                  ? 'bg-gradient-to-r from-cyan to-ungu text-hitam'
                  : 'bg-abu-gelap text-abu-terang hover:bg-abu-sedang'
              }`}
            >
              {KATEGORI_LABELS[kategori]}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          key={kategoriAktif}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {SKILLS_DATA[kategoriAktif].map((skill, index) => (
            <SkillCard key={skill.nama} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * SkillCard - Card untuk setiap skill dengan progress bar
 */
function SkillCard({ skill, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Warna khas untuk setiap skill
  const skillColors = {
    'React': '#61DAFB',
    'JavaScript': '#F7DF1E',
    'TypeScript': '#3178C6',
    'Tailwind CSS': '#06B6D4',
    'HTML/CSS': '#E34F26',
    'Framer Motion': '#FF0055',
    'Node.js': '#339933',
    'PHP': '#777BB4',
    'Python': '#3776AB',
    'REST API': '#00D4FF',
    'Git/GitHub': '#F05032',
    'VS Code': '#007ACC',
    'Vite': '#646CFF',
    'npm/yarn': '#CB3837',
    'Technical Analysis': '#10B981',
    'Risk Management': '#F59E0B',
    'Multi-Asset Trading': '#00D4FF',
    'Market Psychology': '#A855F7',
  };

  const iconColor = skillColors[skill.nama] || '#00D4FF';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-abu-gelap p-6 rounded-xl border border-abu-sedang hover:border-cyan transition-all"
      style={{
        borderColor: isHovered ? iconColor : undefined,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div style={{ color: iconColor }}>{skill.icon}</div>
          <h3 className="text-xl font-semibold text-putih">{skill.nama}</h3>
        </div>
        <span className="font-bold text-lg" style={{ color: iconColor }}>{skill.level}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-abu-sedang rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : `${skill.level}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(to right, ${iconColor}, ${iconColor}dd)`,
            boxShadow: isHovered ? `0 0 20px ${iconColor}80` : 'none',
          }}
        />
      </div>
    </motion.div>
  );
}

export default SeksiSkills;
