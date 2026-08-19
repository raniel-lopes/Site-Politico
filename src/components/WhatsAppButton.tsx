import { MessageCircle } from 'lucide-react';
import { candidateConfig } from '../config/candidate.js';

export default function WhatsAppButton() {
  return (
    <a
      href={candidateConfig.socials.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label="Falar com assessoria no WhatsApp"
    >
      {/* Pulse Rings */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none"></span>
      
      {/* Icon */}
      <MessageCircle size={28} className="relative z-10" />

      {/* Tooltip */}
      <span className="absolute right-full mr-3 bg-brand-blue-dark text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap border border-brand-blue/20">
        Fale Conosco no WhatsApp
      </span>
    </a>
  );
}
