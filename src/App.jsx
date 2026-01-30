import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Navigasi from './components/layout/Navigasi';
import Footer from './components/layout/Footer';
import SeksiHero from './components/sections/SeksiHero';
import SeksiTentang from './components/sections/SeksiTentang';
import SeksiKontak from './components/sections/SeksiKontak';
import SeksiSkills from './components/sections/SeksiSkills';
import SeksiTimeline from './components/sections/SeksiTimeline';
import SeksiKontakForm from './components/sections/SeksiKontakForm';
import Portfolio from './pages/Portfolio';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import Laboratory from './pages/Laboratory';
import NotFound from './pages/NotFound';
import LoadingScreen from './components/common/LoadingScreen';
import CustomCursor from './components/common/CustomCursor';
import ScrollProgress from './components/common/ScrollProgress';
import PageTransition from './components/common/PageTransition';

/**
 * Komponen App - Main application component
 * Mengatur layout dan routing untuk landing page, portfolio, blog & laboratory
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router basename="/">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        ) : (
          <>
            <ScrollProgress />
            <CustomCursor />
            <AppContent />
          </>
        )}
      </AnimatePresence>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLaboratory = location.pathname === '/laboratory';

  return (
    <div className="min-h-screen bg-latar-utama text-teks-utama">
      {/* Navigation - Hidden di Laboratory */}
      {!isLaboratory && <Navigasi />}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Home Page (Landing) */}
          <Route path="/" element={
            <PageTransition>
              <main>
                <SeksiHero />
                <SeksiTentang />
                <SeksiSkills />
                <SeksiTimeline />
                <SeksiKontakForm />
                <SeksiKontak />
              </main>
            </PageTransition>
          } />

          {/* Portfolio Page */}
          <Route path="/portfolio" element={
            <PageTransition>
              <Portfolio />
            </PageTransition>
          } />

          {/* Blog Routes */}
          <Route path="/blog" element={
            <PageTransition>
              <BlogList />
            </PageTransition>
          } />
          <Route path="/blog/:slug" element={
            <PageTransition>
              <BlogDetail />
            </PageTransition>
          } />

          {/* Laboratory (Private) */}
          <Route path="/laboratory" element={<Laboratory />} />

          {/* 404 Not Found */}
          <Route path="*" element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          } />
        </Routes>
      </AnimatePresence>

      {/* Footer - Hidden di Laboratory */}
      {!isLaboratory && <Footer />}
    </div>
  );
}

export default App;
