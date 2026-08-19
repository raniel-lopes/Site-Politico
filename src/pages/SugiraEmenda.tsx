import { useState } from 'react';
import { Heart, Send } from 'lucide-react';
import { apiFetch } from '../utils/api.js';
import SEO from '../components/SEO.js';

export default function SugiraEmenda() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    topic: 'Saúde',
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
      await apiFetch('/suggestions', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setFormStatus({
        type: 'success',
        message: 'Sua sugestão de emenda parlamentar foi registrada! A equipe técnica do mandato irá analisar a viabilidade orçamentária.'
      });
      setFormData({ name: '', email: '', whatsapp: '', topic: 'Saúde', message: '' });
    } catch (err: any) {
      setFormStatus({
        type: 'error',
        message: err.message || 'Erro ao registrar sugestão. Verifique sua conexão.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const topics = [
    'Saúde e Postos de Atendimento',
    'Educação Básica e Escolas',
    'Capacitação Tecnológica',
    'Acessibilidade e Direitos Sociais',
    'Praças e Esporte Comunitário',
    'Mobilidade e Sinalização',
    'Saneamento e Drenagem'
  ];

  return (
    <>
      <SEO 
        title="Sugerir Emenda" 
        description="Participe do orçamento de Salvador. Envie suas sugestões de emendas parlamentares para postos de saúde, escolas e melhorias em seu bairro."
      />

      {/* Page Header */}
      <section className="relative bg-brand-blue-dark text-white pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <span className="px-4 py-1.5 bg-brand-pink/20 border border-brand-pink/30 rounded-full text-brand-pink-vibrant font-display font-semibold text-xs tracking-wider uppercase mb-4 inline-block">
            Democracia Participativa
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
            Sugira uma Emenda
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Ajude a definir o destino de recursos públicos. Aponte melhorias prioritárias para o seu bairro e região.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-24 bg-brand-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
            
            {/* Info panel */}
            <div className="lg:col-span-5 bg-gradient-to-b from-brand-blue-dark to-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-5"></div>
              
              <div className="relative z-10 flex flex-col gap-6">
                <span className="p-3 bg-white/10 rounded-2xl w-fit text-brand-pink-vibrant">
                  <Heart size={28} />
                </span>
                <h3 className="text-2xl font-display font-extrabold tracking-tight">
                  O que é uma Emenda Parlamentar?
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Trata-se de uma cota orçamentária anual que os parlamentares têm direito de direcionar para finalidades específicas. Nosso mandato adota critérios transparentes e ouve a comunidade antes de destinar emendas.
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Indique a necessidade exata (ex: reforma de posto de saúde, fornecimento de computadores para cursinhos, instalação de lixeiras, etc.).
                </p>
              </div>

              <div className="relative z-10 border-t border-white/10 pt-6 mt-8 text-xs text-white/50 leading-relaxed">
                *Todas as sugestões recebidas passam por um crivo técnico de viabilidade orçamentária executado pelo Gabinete Mariana Souza.
              </div>
            </div>

            {/* Form panel */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl border border-brand-blue/5 shadow-sm">
              <h3 className="font-display font-extrabold text-2xl text-brand-blue-dark mb-6">
                Detalhes da Proposta
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {formStatus.type && (
                  <div className={`p-4 rounded-lg text-sm font-semibold ${
                    formStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {formStatus.message}
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Seu Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nome completo"
                    className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors bg-brand-gray-50/50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="topic" className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Área/Tema da Emenda</label>
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue bg-white transition-colors"
                  >
                    {topics.map((t, idx) => (
                      <option key={idx} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">O que precisa ser feito e onde?</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Descreva o local exato (bairro, rua, praça ou instituição) e qual o benefício esperado com essa emenda parlamentar..."
                    className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors resize-none bg-brand-gray-50/50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-pink flex items-center justify-center gap-2 py-4 disabled:opacity-50"
                >
                  {isSubmitting ? 'Registrando...' : 'Enviar Sugestão de Emenda'}
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
