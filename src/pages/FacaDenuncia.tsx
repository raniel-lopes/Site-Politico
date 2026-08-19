import { useState } from 'react';
import { Shield, AlertCircle, EyeOff, Send } from 'lucide-react';
import { apiFetch } from '../utils/api.js';
import SEO from '../components/SEO.js';

export default function FacaDenuncia() {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [formData, setFormData] = useState({
    reporterName: '',
    reporterEmail: '',
    reporterWhatsapp: '',
    description: '',
    location: ''
  });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const payload = {
        isAnonymous,
        description: formData.description,
        location: formData.location,
        ...(isAnonymous ? {} : {
          reporterName: formData.reporterName,
          reporterEmail: formData.reporterEmail,
          reporterWhatsapp: formData.reporterWhatsapp
        })
      };

      await apiFetch('/reports', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      setFormStatus({
        type: 'success',
        message: 'Denúncia registrada com sucesso! Nosso gabinete fará a devida triagem e acionará os órgãos responsáveis protegendo sua identidade.'
      });
      setFormData({ reporterName: '', reporterEmail: '', reporterWhatsapp: '', description: '', location: '' });
    } catch (err: any) {
      setFormStatus({
        type: 'error',
        message: err.message || 'Falha ao enviar denúncia. Tente novamente mais tarde.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Fazer Denúncia" 
        description="Canal de denúncias seguro do Gabinete de Mariana Souza. Relate violações de direitos ou abandono de serviços públicos de forma totalmente anônima."
      />

      {/* Page Header */}
      <section className="relative bg-brand-blue-dark text-white pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <span className="px-4 py-1.5 bg-brand-pink/20 border border-brand-pink/30 rounded-full text-brand-pink-vibrant font-display font-semibold text-xs tracking-wider uppercase mb-4 inline-block">
            Canal Seguro de Denúncias
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
            Fazer Denúncia
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Fiscalize com o mandato. Canal direto para relatar violações de direitos, abandono de postos de serviços e irregularidades.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-24 bg-brand-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
            
            {/* Guarantee Column */}
            <div className="lg:col-span-5 bg-gradient-to-b from-brand-blue-dark to-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-5"></div>
              
              <div className="relative z-10 flex flex-col gap-6">
                <span className="p-3 bg-white/10 rounded-2xl w-fit text-brand-pink-vibrant">
                  <Shield size={28} />
                </span>
                <h3 className="text-2xl font-display font-extrabold tracking-tight">
                  Garantia de Anonimato
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Levamos sua privacidade e segurança a sério. Se você optar por enviar uma denúncia **anônima**, nenhuma informação pessoal sua será solicitada ou arquivada em nossos registros.
                </p>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 text-xs">
                  <EyeOff className="text-brand-pink-vibrant shrink-0" size={18} />
                  <span>Seus dados de navegação ou IP não são armazenados nos logs de submissão do formulário.</span>
                </div>
              </div>

              <div className="relative z-10 border-t border-white/10 pt-6 mt-8 flex items-center gap-2 text-xs text-white/50 leading-relaxed">
                <AlertCircle size={14} className="text-brand-pink-vibrant shrink-0" />
                Caso precise de retorno oficial do mandato, opte pelo envio **identificado**.
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl border border-brand-blue/5 shadow-sm">
              <div className="flex items-center justify-between border-b border-brand-gray-100 pb-4 mb-6">
                <h3 className="font-display font-bold text-xl text-brand-blue-dark">Registrar Ocorrência</h3>
                
                {/* Anonymous switch */}
                <button
                  type="button"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    isAnonymous 
                      ? 'bg-brand-blue-light/50 text-brand-blue border-brand-blue/20' 
                      : 'bg-brand-pink/10 text-brand-pink-vibrant border-brand-pink/20'
                  }`}
                >
                  {isAnonymous ? 'Denúncia: Anônima' : 'Denúncia: Identificada'}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {formStatus.type && (
                  <div className={`p-4 rounded-lg text-sm font-semibold ${
                    formStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {formStatus.message}
                  </div>
                )}

                {/* Identified info fields */}
                {!isAnonymous && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="reporterName" className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Seu Nome</label>
                      <input
                        type="text"
                        id="reporterName"
                        name="reporterName"
                        required
                        value={formData.reporterName}
                        onChange={handleInputChange}
                        placeholder="Nome completo"
                        className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors bg-brand-gray-50/50"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="reporterEmail" className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">E-mail</label>
                        <input
                          type="email"
                          id="reporterEmail"
                          name="reporterEmail"
                          required
                          value={formData.reporterEmail}
                          onChange={handleInputChange}
                          placeholder="seu.email@exemplo.com"
                          className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors bg-brand-gray-50/50"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="reporterWhatsapp" className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">WhatsApp</label>
                        <input
                          type="tel"
                          id="reporterWhatsapp"
                          name="reporterWhatsapp"
                          required
                          value={formData.reporterWhatsapp}
                          onChange={handleInputChange}
                          placeholder="(71) 99999-9999"
                          className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors bg-brand-gray-50/50"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label htmlFor="location" className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Localização / Bairro</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Bairro, Rua ou Ponto de Referência em Salvador/Bahia"
                    className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors bg-brand-gray-50/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Descrição dos Fatos</label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={6}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Relate em detalhes a situação, os direitos violados ou o descaso com o serviço público verificado..."
                    className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors resize-none bg-brand-gray-50/50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-50"
                >
                  {isSubmitting ? 'Registrando Ocorrência...' : 'Enviar Denúncia de Forma Segura'}
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
