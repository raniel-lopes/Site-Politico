import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, PhoneCall } from 'lucide-react';
import { candidateConfig } from '../config/candidate.js';
import logoImg from '../assets/logo.png';


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  const toggleSubmenu = (menuName: string) => {
    if (activeSubmenu === menuName) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(menuName);
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-brand-blue-dark/95 backdrop-blur-md shadow-lg border-b border-brand-blue/10 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src={logoImg} 
            alt={candidateConfig.name} 
            className="h-10 md:h-12 w-auto object-contain block" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 font-sans font-medium text-sm text-white/90">
          <Link to="/" className="hover:text-brand-pink-vibrant transition-colors">Início</Link>
          <Link to="/quem-sou-eu" className="hover:text-brand-pink-vibrant transition-colors">Quem Sou Eu</Link>
          
          {/* Submenu "Nosso Mandato" */}
          <div className="relative group/menu">
            <button className="flex items-center gap-1 hover:text-brand-pink-vibrant transition-colors focus:outline-none py-2">
              Nosso Mandato <ChevronDown size={14} className="group-hover/menu:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-0 w-52 bg-brand-blue-dark border border-brand-blue/10 rounded-lg shadow-xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 mt-2 py-2 flex flex-col z-50">
              <Link to="/nossos-projetos" className="px-4 py-2 hover:bg-brand-pink/10 hover:text-brand-pink-vibrant transition-colors">Projetos</Link>
              <Link to="/atuacao-parlamentar" className="px-4 py-2 hover:bg-brand-pink/10 hover:text-brand-pink-vibrant transition-colors">Atuação Parlamentar</Link>
              <Link to="/nossos-projetos?categoria=Tecnologia+Ativa" className="px-4 py-2 hover:bg-brand-pink/10 hover:text-brand-pink-vibrant transition-colors">Tecnologia Ativa</Link>
            </div>
          </div>

          <Link to="/noticias" className="hover:text-brand-pink-vibrant transition-colors">Notícias</Link>

          {/* Submenu "Multimídia" */}
          <div className="relative group/menu">
            <button className="flex items-center gap-1 hover:text-brand-pink-vibrant transition-colors focus:outline-none py-2">
              Multimídia <ChevronDown size={14} className="group-hover/menu:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-0 w-52 bg-brand-blue-dark border border-brand-blue/10 rounded-lg shadow-xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 mt-2 py-2 flex flex-col z-50">
              <Link to="/videos" className="px-4 py-2 hover:bg-brand-pink/10 hover:text-brand-pink-vibrant transition-colors">Vídeos</Link>
              <Link to="/materiais-de-campanha" className="px-4 py-2 hover:bg-brand-pink/10 hover:text-brand-pink-vibrant transition-colors">Materiais de Campanha</Link>
            </div>
          </div>

          <Link to="/contato" className="hover:text-brand-pink-vibrant transition-colors">Contato</Link>
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Search Button */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-brand-blue-dark/80 border border-brand-blue/20 rounded-full px-3 py-1">
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (window.location.href = `/noticias?busca=${searchQuery}`)}
                  className="bg-transparent border-none text-white text-xs outline-none w-36"
                  autoFocus
                />
                <button onClick={() => setSearchOpen(false)}><X size={14} className="text-white/60 hover:text-white" /></button>
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="p-2 text-white/80 hover:text-brand-pink-vibrant transition-colors">
                <Search size={18} />
              </button>
            )}
          </div>

          <a
            href={candidateConfig.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-pink to-brand-pink-vibrant hover:scale-105 text-white font-semibold rounded-full text-xs shadow-md transition-all duration-300"
          >
            <PhoneCall size={14} /> Falar no WhatsApp
          </a>
        </div>

        {/* Mobile Hamburger & Search Controls */}
        <div className="flex lg:hidden items-center gap-3">
          <button 
            onClick={() => setSearchOpen(!searchOpen)} 
            className="p-2 text-white/80 hover:text-brand-pink-vibrant transition-colors"
          >
            <Search size={20} />
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white/80 hover:text-brand-pink-vibrant transition-colors focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="lg:hidden w-full bg-brand-blue-dark px-4 py-3 border-t border-brand-blue/10">
          <div className="flex items-center bg-white/10 rounded-full px-3 py-1.5">
            <input
              type="text"
              placeholder="Digite sua busca..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (window.location.href = `/noticias?busca=${searchQuery}`)}
              className="bg-transparent border-none text-white text-sm outline-none w-full"
            />
            <button onClick={() => {
              if (searchQuery) window.location.href = `/noticias?busca=${searchQuery}`;
            }} className="p-1"><Search size={16} className="text-white" /></button>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-brand-blue-dark/95 backdrop-blur-lg border-l border-brand-blue/10 shadow-2xl z-40 transform transition-transform duration-300 lg:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full pt-20 px-6 pb-6 overflow-y-auto">
          <div className="flex flex-col gap-5 text-lg font-medium text-white/95">
            <Link to="/">Início</Link>
            <Link to="/quem-sou-eu">Quem Sou Eu</Link>

            {/* Nosso Mandato Dropdown Accordion */}
            <div>
              <button 
                onClick={() => toggleSubmenu('mandato')} 
                className="flex items-center justify-between w-full text-left focus:outline-none"
              >
                Nosso Mandato <ChevronDown size={18} className={`transform transition-transform ${activeSubmenu === 'mandato' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`pl-4 mt-2 flex flex-col gap-3 text-sm text-white/70 overflow-hidden transition-all duration-300 ${
                activeSubmenu === 'mandato' ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <Link to="/nossos-projetos" className="hover:text-brand-pink-vibrant">Projetos</Link>
                <Link to="/atuacao-parlamentar" className="hover:text-brand-pink-vibrant">Atuação Parlamentar</Link>
                <Link to="/nossos-projetos?categoria=Tecnologia+Ativa" className="hover:text-brand-pink-vibrant font-semibold text-brand-pink-vibrant">Tecnologia Ativa</Link>
              </div>
            </div>

            <Link to="/noticias">Notícias</Link>

            {/* Multimídia Dropdown Accordion */}
            <div>
              <button 
                onClick={() => toggleSubmenu('midia')} 
                className="flex items-center justify-between w-full text-left focus:outline-none"
              >
                Multimídia <ChevronDown size={18} className={`transform transition-transform ${activeSubmenu === 'midia' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`pl-4 mt-2 flex flex-col gap-3 text-sm text-white/70 overflow-hidden transition-all duration-300 ${
                activeSubmenu === 'midia' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <Link to="/videos" className="hover:text-brand-pink-vibrant">Vídeos</Link>
                <Link to="/materiais-de-campanha" className="hover:text-brand-pink-vibrant">Materiais de Campanha</Link>
              </div>
            </div>

            <Link to="/contato">Contato</Link>
          </div>

          {/* Mobile WhatsApp Button */}
          <div className="mt-auto pt-8">
            <a
              href={candidateConfig.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-brand-pink to-brand-pink-vibrant text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-opacity"
            >
              <PhoneCall size={16} /> Falar com Assessoria
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
