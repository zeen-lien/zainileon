import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigasi from './components/layout/Navigasi';
import Footer from './components/layout/Footer';
import SeksiHero from './components/sections/SeksiHero';
import SeksiTentang from './components/sections/SeksiTentang';
import SeksiKontak from './components/sections/SeksiKontak';
import Portfolio from './pages/Portfolio';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import Laboratory from './pages/Laboratory';

/**
 * Komponen App - Main application component
 * Mengatur layout dan routing untuk landing page, portfolio, blog & laboratory
 */
function App() {
  return (
    <Router basename="/landing-page">
      <AppContent />
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
      <Routes>
        {/* Home Page (Landing) */}
        <Route path="/" element={
          <main>
            <SeksiHero />
            <SeksiTentang />
            <SeksiKontak />
          </main>
        } />

        {/* Portfolio Page */}
        <Route path="/portfolio" element={<Portfolio />} />

        {/* Blog Routes */}
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />

        {/* Laboratory (Private) */}
        <Route path="/laboratory" element={<Laboratory />} />
      </Routes>

      {/* Footer - Hidden di Laboratory */}
      {!isLaboratory && <Footer />}
    </div>
  );
}

export default App;
