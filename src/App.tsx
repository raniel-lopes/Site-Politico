import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import WhatsAppButton from './components/WhatsAppButton.js';

// Public Pages
import Home from './pages/Home.js';
import QuemSouEu from './pages/QuemSouEu.js';
import NossosProjetos from './pages/NossosProjetos.js';
import AtuacaoParlamentar from './pages/AtuacaoParlamentar.js';
import Noticias from './pages/Noticias.js';
import NoticiaDetalhe from './pages/NoticiaDetalhe.js';
import Videos from './pages/Videos.js';
import MateriaisCampanha from './pages/MateriaisCampanha.js';
import Contato from './pages/Contato.js';
import SugiraEmenda from './pages/SugiraEmenda.js';
import FacaDenuncia from './pages/FacaDenuncia.js';

// Admin Pages
import AdminLogin from './pages/AdminLogin.js';
import AdminDashboard from './pages/AdminDashboard.js';
import AdminNews from './pages/AdminNews.js';
import AdminProjects from './pages/AdminProjects.js';
import AdminInbox from './pages/AdminInbox.js';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  // Auto-scroll window to top on navigation/path change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-brand-gray-50">
      <ScrollToTop />
      
      {/* Hide public layout for CMS admin dashboard views */}
      {!isAdmin && <Header />}
      
      <main className="flex-grow">
        <Routes>
          {/* Public Views */}
          <Route path="/" element={<Home />} />
          <Route path="/quem-sou-eu" element={<QuemSouEu />} />
          <Route path="/nossos-projetos" element={<NossosProjetos />} />
          <Route path="/atuacao-parlamentar" element={<AtuacaoParlamentar />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/noticias/:slug" element={<NoticiaDetalhe />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/materiais-de-campanha" element={<MateriaisCampanha />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/sugira-um-projeto-de-lei" element={<SugiraEmenda />} />
          <Route path="/faca-uma-denuncia" element={<FacaDenuncia />} />

          {/* Admin Views */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/noticias" element={<AdminNews />} />
          <Route path="/admin/projetos" element={<AdminProjects />} />
          <Route path="/admin/mensagens" element={<AdminInbox />} />
          <Route path="/admin/sugestoes" element={<AdminInbox />} />
          <Route path="/admin/denuncias" element={<AdminInbox />} />

          {/* Fallback Catch-All */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
