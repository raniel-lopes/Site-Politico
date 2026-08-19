import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { candidateConfig } from '../config/candidate.js';
import { apiFetch } from '../utils/api.js';
import SEO from '../components/SEO.js';

export default function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    subject: 'Solicitação',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    try {
      await apiFetch('/contact', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setFormStatus({
        type: 'success',
        message: 'Sua mensagem foi enviada com sucesso ao nosso gabinete parlamentar!'
      });
      setFormData({ name: '', email: '', whatsapp: '', subject: 'Solicitação', message: '' });
    } catch (err: any) {
      setFormStatus({
        type: 'error',
        message: err.message || 'Erro ao processar contato. Verifique sua conexão.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contato" 
        description="Fale diretamente com o gabinete da vereadora Mariana Souza: envie sugestões de projetos de lei, reclamações e ofícios."
      />

      {/* Page Header */}
      <section className="relative bg-brand-blue-dark text-white pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <span className="px-4 py-1.5 bg-brand-pink/20 border border-brand-pink/30 rounded-full text-brand-pink-vibrant font-display font-semibold text-xs tracking-wider uppercase mb-4 inline-block">
            Canais de Comunicação
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
            Fale Conosco
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Envie sua demanda para nossa assessoria jurídica e parlamentar ou use nossos canais diretos de atendimento.
          </p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="py-24 bg-brand-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            
            {/* Info Column */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Card 1: Direct Support */}
              <div className="bg-white p-8 rounded-3xl border border-brand-blue/5 shadow-sm flex flex-col gap-6">
                <h3 className="font-display font-bold text-xl text-brand-blue-dark">Gabinete Parlamentar</h3>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-pink/10 rounded-xl text-brand-pink-vibrant shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-brand-gray-600 block mb-1">Telefone Oficial</h4>
                    <span className="text-sm font-semibold text-brand-blue-dark">{candidateConfig.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-pink/10 rounded-xl text-brand-pink-vibrant shrink-0">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-brand-gray-600 block mb-1">WhatsApp Assessoria</h4>
                    <a href={candidateConfig.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-blue hover:text-brand-pink-vibrant transition-colors font-mono">
                      {candidateConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-pink/10 rounded-xl text-brand-pink-vibrant shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-brand-gray-600 block mb-1">E-mail Institucional</h4>
                    <span className="text-sm font-semibold text-brand-blue-dark">{candidateConfig.email}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Physical Address & Map Info */}
              <div className="bg-white p-8 rounded-3xl border border-brand-blue/5 shadow-sm flex flex-col gap-4">
                <h3 className="font-display font-bold text-xl text-brand-blue-dark flex items-center gap-2">
                  <MapPin className="text-brand-pink-vibrant" size={20} /> Onde nos encontrar
                </h3>
                <p className="text-brand-gray-600 text-sm leading-relaxed">
                  Nosso gabinete fica na Câmara Municipal de Salvador. As visitas podem ser agendadas previamente através de contato telefônico.
                </p>
                <a href={candidateConfig.googleMapsLink} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-blue hover:text-brand-pink-vibrant font-bold transition-colors">
                  Visualizar no Google Maps →
                </a>
              </div>

            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl border border-brand-blue/5 shadow-sm">
              <h3 className="font-display font-extrabold text-2xl text-brand-blue-dark mb-6">
                Formulário de Contato
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {formStatus.type && (
                  <div className={`p-4 rounded-lg text-sm font-semibold ${
                    formStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {formStatus.message}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Nome Completo</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome"
                      className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors bg-brand-gray-50/50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">E-mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu.email@exemplo.com"
                      className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors bg-brand-gray-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="whatsapp" className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">WhatsApp</label>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      required
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="(71) 99999-9999"
                      className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors bg-brand-gray-50/50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Assunto Principal</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue bg-white transition-colors"
                    >
                      <option value="Projeto de Lei">Sugestão de Projeto de Lei</option>
                      <option value="Sugestão">Sugestão Geral</option>
                      <option value="Reclamação">Reclamação de Serviço Público</option>
                      <option value="Ofício">Ofício / Representação</option>
                      <option value="Solicitação">Outras Demandas</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Mensagem Detalhada</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Escreva sua mensagem em detalhes..."
                    className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors resize-none bg-brand-gray-50/50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-50"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar para o Gabinete'}
                  <Send size={16} />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
