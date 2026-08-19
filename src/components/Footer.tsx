import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Send } from 'lucide-react';
import { candidateConfig } from '../config/candidate.js';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue-dark text-white pt-16 pb-8 border-t border-brand-blue/20">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Candidate Intro */}
          <div className="flex flex-col gap-4">
            <span className="font-display font-extrabold text-2xl tracking-tight text-white flex items-center gap-1.5">
              {candidateConfig.name}
            </span>
            <p className="text-white/70 text-sm leading-relaxed">
              Trabalho parlamentar sério, transparente e focado em melhorar a vida das pessoas de Salvador e de toda a Bahia.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              <a href={candidateConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-pink-vibrant hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href={candidateConfig.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-pink-vibrant hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href={candidateConfig.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-pink-vibrant hover:text-white transition-colors" aria-label="Twitter">
                {/* SVG for X (formerly Twitter) */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href={candidateConfig.socials.youtube} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-pink-vibrant hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={18} />
              </a>
              <a href={candidateConfig.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-pink-vibrant hover:text-white transition-colors" aria-label="WhatsApp">
                <Send size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Sitemap (Quick Links) */}
          <div>
            <h3 className="font-display font-semibold text-lg text-white mb-5">Mapa do Site</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-white/70">
              <li><Link to="/" className="hover:text-brand-pink-vibrant transition-colors">Início</Link></li>
              <li><Link to="/quem-sou-eu" className="hover:text-brand-pink-vibrant transition-colors">Quem Sou</Link></li>
              <li><Link to="/nossos-projetos" className="hover:text-brand-pink-vibrant transition-colors">Projetos</Link></li>
              <li><Link to="/atuacao-parlamentar" className="hover:text-brand-pink-vibrant transition-colors">Atuação</Link></li>
              <li><Link to="/noticias" className="hover:text-brand-pink-vibrant transition-colors">Notícias</Link></li>
              <li><Link to="/videos" className="hover:text-brand-pink-vibrant transition-colors">Galeria</Link></li>
              <li><Link to="/materiais-de-campanha" className="hover:text-brand-pink-vibrant transition-colors">Materiais</Link></li>
              <li><Link to="/contato" className="hover:text-brand-pink-vibrant transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="flex flex-col gap-4 text-sm text-white/70">
            <h3 className="font-display font-semibold text-lg text-white mb-1">Contato</h3>
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-brand-pink-vibrant shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span>{candidateConfig.phone}</span>
                <span className="text-xs text-white/40">Gabinete Parlamentar</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={18} className="text-brand-pink-vibrant shrink-0 mt-0.5" />
              <span>{candidateConfig.email}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-pink-vibrant shrink-0 mt-0.5" />
              <a href={candidateConfig.googleMapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink-vibrant transition-colors">
                {candidateConfig.address}
              </a>
            </div>
          </div>

          {/* Column 4: Links Rápidos de Participação */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-lg text-white mb-1">Participação Popular</h3>
            <p className="text-sm text-white/70 leading-relaxed mb-1">
              Participe do nosso mandato. Envie sugestões de projetos e emendas ou denuncie irregularidades.
            </p>
            <div className="flex flex-col gap-2">
              <Link to="/sugira-uma-emenda" className="inline-flex items-center justify-center py-2 px-4 bg-brand-blue border border-brand-pink/20 hover:bg-brand-pink/15 text-white font-semibold text-xs rounded transition-colors">
                Sugerir Emenda
              </Link>
              <Link to="/faca-uma-denuncia" className="inline-flex items-center justify-center py-2 px-4 bg-transparent border border-white/20 hover:border-white/40 text-white font-semibold text-xs rounded transition-colors">
                Fazer Denúncia Segura
              </Link>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-brand-blue/20 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50 text-center md:text-left">
          <div>
            <p>© {currentYear} {candidateConfig.name} - Mandato Parlamentar de Salvador. Todos os direitos reservados.</p>
            <p className="mt-1 font-mono text-[10px]">
              Desenvolvido com carinho • Salvador, Bahia
            </p>
          </div>
          
          {/* Electoral Compliance Box */}
          <div className="max-w-md md:text-right text-[10px] leading-relaxed border border-white/10 p-2.5 rounded bg-white/5">
            <span className="font-bold text-brand-pink-vibrant uppercase block mb-1">Conformidade Eleitoral (TSE)</span>
            Este site possui caráter informativo e de prestação de contas de mandato parlamentar, em estrita conformidade com a Lei das Eleições nº 9.504/1997. Não há pedido de voto explícito ou propaganda antecipada vedada.
          </div>
        </div>

      </div>
    </footer>
  );
}
