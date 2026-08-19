import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  Send,
  MessageCircle
} from 'lucide-react';
import { candidateConfig } from '../config/candidate.js';
import { apiFetch } from '../utils/api.js';
import SEO from '../components/SEO.js';
import NewsCard from '../components/NewsCard.js';

export default function Home() {
  const [news, setNews] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    subject: 'Sugestão',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch latest news on load
  useEffect(() => {
    async function loadLatestNews() {
      try {
        const data = await apiFetch('/news?limit=3');
        setNews(data.news || []);
      } catch (err) {
        console.error('Falha ao carregar notícias:', err);
      } finally {
        setLoadingNews(false);
      }
    }
    loadLatestNews();
  }, []);

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
        message: 'Mensagem enviada com sucesso! Nossa assessoria entrará em contato em breve.'
      });
      setFormData({ name: '', email: '', whatsapp: '', subject: 'Sugestão', message: '' });
    } catch (err: any) {
      setFormStatus({
        type: 'error',
        message: err.message || 'Erro ao enviar mensagem. Verifique se o backend está ativo.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Início" />
      
      {/* 1. HERO BANNER */}
      <section className="relative w-full bg-brand-blue-dark">
        <div className="w-full relative overflow-hidden">
          <img
            src={candidateConfig.hero.backgroundImage}
            alt={candidateConfig.name}
            className="w-full h-auto block"
          />
        </div>
      </section>

      {/* 2. QUEM SOU EU PREVIEW */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue-light/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-pink-light/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Interactive Image */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue to-brand-pink rounded-3xl rotate-3 scale-102 opacity-10"></div>
              <div className="relative rounded-3xl overflow-hidden border border-brand-blue/10 bg-brand-gray-100 shadow-2xl">
                <img
                  src={candidateConfig.hero.candidatePhoto}
                  alt={candidateConfig.name}
                  className="w-full aspect-[4/5] object-cover hover:scale-102 transition-transform duration-500"
                />
                {/* Overlay card */}
                <div className="absolute bottom-6 left-6 right-6 glass p-5 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-brand-blue text-white rounded-xl">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-blue-dark">De Salvador para a Bahia</h4>
                    <p className="text-brand-gray-600 text-xs font-semibold">Uma trajetória de serviço e proximidade</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Biography short text */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-brand-pink-vibrant font-display font-semibold uppercase tracking-wider text-sm">Biografia</span>
                <h2 className="text-3xl md:text-5xl font-display font-extrabold text-brand-blue-dark tracking-tight leading-tight">
                  Trajetória que inspira, coragem que transforma
                </h2>
              </div>
              
              <div className="text-brand-gray-600 space-y-4 leading-relaxed text-base">
                <p>
                  Minha história de luta começou nas comunidades de Salvador. Vivenciei as carências do transporte, a falta de oportunidades e vi de perto o poder transformador de projetos comunitários.
                </p>
                <p className="font-semibold text-brand-blue-dark">
                  “Meu propósito como vereador foi dar voz à nossa gente de Salvador. Como pré-candidato a {candidateConfig.targetRole}, quero levar esse compromisso para a Bahia inteira, descentralizando oportunidades.”
                </p>
                <p>
                  {candidateConfig.biographySummary.substring(0, 320)}...
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-4">
                <Link to="/quem-sou-eu" className="btn-primary flex items-center gap-2 font-semibold">
                  Saiba Mais Sobre Minha História
                  <ArrowRight size={16} />
                </Link>
                <span className="text-brand-gray-600 text-sm font-semibold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-brand-pink-vibrant rounded-full animate-ping"></span>
                  De {candidateConfig.role} a {candidateConfig.targetRole}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. NOSSOS PROJETOS / BANDEIRAS */}
      <section className="py-24 bg-brand-gray-50 border-t border-b border-brand-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-brand-pink-vibrant font-display font-semibold uppercase tracking-wider text-sm">Nossas Causas</span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-brand-blue-dark tracking-tight">
              Bandeiras que Defendemos no Mandato
            </h2>
            <p className="text-brand-gray-600 leading-relaxed text-sm md:text-base">
              Acreditamos que a política só faz sentido quando gera soluções concretas nas áreas essenciais. Confira os temas que impulsionamos na Câmara Municipal de Salvador.
            </p>
          </div>

          {/* Grid of thematic cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidateConfig.projects.map((project, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-8 border border-brand-blue/10 hover:border-brand-blue/20 hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
              >
                <span className="px-3 py-1 bg-brand-blue-light/35 text-brand-blue text-xs font-bold rounded-full w-fit mb-6">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-brand-gray-600 block mb-1">{project.code}</span>
                <h3 className="font-display font-bold text-xl text-brand-blue-dark group-hover:text-brand-pink-vibrant transition-colors mb-3">
                  {project.title}
                </h3>
                <p className="text-brand-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                <div className="pt-4 border-t border-brand-gray-100 flex items-center justify-between">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    project.status === 'Aprovado' ? 'bg-green-100 text-green-700' :
                    project.status === 'Em Tramitação' ? 'bg-amber-100 text-amber-700' : 'bg-brand-blue-light/50 text-brand-blue-dark'
                  }`}>
                    {project.status}
                  </span>
                  <Link 
                    to="/nossos-projetos" 
                    className="text-xs text-brand-blue hover:text-brand-pink-vibrant font-semibold flex items-center gap-1 transition-colors"
                  >
                    Ver Detalhes <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/nossos-projetos" className="btn-secondary inline-flex items-center gap-2">
              Ver Todos os Projetos de Lei e Emendas
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. ESTATÍSTICAS / NÚMEROS DO MANDATO */}
      <section className="py-20 bg-brand-blue-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            
            <div className="flex flex-col gap-2">
              <span className="font-display font-black text-4xl md:text-5xl text-brand-pink-vibrant">
                {candidateConfig.stats.billsProtocolled}
              </span>
              <span className="text-white/60 text-xs md:text-sm font-semibold uppercase tracking-wider">
                Projetos Protocolados
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-display font-black text-4xl md:text-5xl text-brand-pink-vibrant">
                {candidateConfig.stats.billsApproved}
              </span>
              <span className="text-white/60 text-xs md:text-sm font-semibold uppercase tracking-wider">
                Projetos Aprovados
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-display font-black text-4xl md:text-5xl text-brand-pink-vibrant">
                {candidateConfig.stats.emendasAllocated}
              </span>
              <span className="text-white/60 text-xs md:text-sm font-semibold uppercase tracking-wider">
                Emendas Alocadas
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-display font-black text-4xl md:text-5xl text-brand-pink-vibrant">
                {candidateConfig.stats.communitiesAssisted}
              </span>
              <span className="text-white/60 text-xs md:text-sm font-semibold uppercase tracking-wider">
                Comunidades Ouvidas
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-display font-black text-4xl md:text-5xl text-brand-pink-vibrant">
                {candidateConfig.stats.publicHearings}
              </span>
              <span className="text-white/60 text-xs md:text-sm font-semibold uppercase tracking-wider">
                Audiências Públicas
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-display font-black text-4xl md:text-5xl text-brand-pink-vibrant">
                {candidateConfig.stats.approvedIndications}
              </span>
              <span className="text-white/60 text-xs md:text-sm font-semibold uppercase tracking-wider">
                Indicações Aprovadas
              </span>
            </div>

          </div>

          <div className="text-center mt-14 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-sm font-semibold text-white/80">Quer auditar os relatórios de prestação de contas?</span>
            <Link to="/atuacao-parlamentar" className="text-brand-pink-vibrant hover:text-white font-bold text-sm flex items-center gap-1 group">
              Ir para Atuação Parlamentar Completa
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. SEÇÃO DE NOTÍCIAS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="flex flex-col gap-2">
              <span className="text-brand-pink-vibrant font-display font-semibold uppercase tracking-wider text-sm">Notícias</span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-brand-blue-dark tracking-tight">
                Notícias do Mandato
              </h2>
            </div>
            <Link to="/noticias" className="btn-secondary inline-flex items-center gap-2 shrink-0">
              Ver Todas as Notícias
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Cards Grid */}
          {loadingNews ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse flex flex-col gap-4">
                  <div className="aspect-video w-full bg-brand-gray-200 rounded-2xl"></div>
                  <div className="h-4 w-1/3 bg-brand-gray-200 rounded"></div>
                  <div className="h-6 w-full bg-brand-gray-200 rounded"></div>
                  <div className="h-20 w-full bg-brand-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((item) => (
                <NewsCard key={item.id} article={item} />
              ))}
            </div>
          ) : (
            /* Mock news for immediate gorgeous preview */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <NewsCard article={{
                id: "1",
                title: "Mariana Souza defende a ampliação do programa Tecnologia Ativa nas escolas estaduais da Bahia",
                slug: "mariana-defende-tecnologia-ativa-na-bahia",
                summary: "Após aprovar o projeto em Salvador, a vereadora reuniu-se com lideranças educacionais de Feira de Santana para planejar a extensão do acesso digital para alunos da rede estadual.",
                image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
                category: "Tecnologia Ativa",
                author: "Assessoria",
                createdAt: new Date().toISOString()
              }} />
              <NewsCard article={{
                id: "2",
                title: "Gabinete Mariana Souza aprova recurso de R$ 1.2 milhão para estruturar a Casa do Autista em Salvador",
                slug: "aprovado-recurso-casa-do-autista",
                summary: "Os fundos municipais serão direcionados à aquisição de equipamentos clínicos e qualificação da equipe técnica. A proposta visa tornar-se um modelo estadual de acolhimento para o autismo.",
                image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop",
                category: "Direitos e Inclusão",
                author: "Assessoria",
                createdAt: new Date(Date.now() - 86400000).toISOString()
              }} />
              <NewsCard article={{
                id: "3",
                title: "Pelo interior: Mariana Souza visita cooperativas de agricultura familiar no Recôncavo Baiano",
                slug: "visita-interior-cooperativas",
                summary: "Ouvindo demandas dos produtores rurais de Santo Amaro e Cruz das Almas, a pré-candidata debateu políticas de incentivo e linhas de crédito para jovens no campo.",
                image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800&auto=format&fit=crop",
                category: "Atuação",
                author: "Assessoria",
                createdAt: new Date(Date.now() - 172800000).toISOString()
              }} />
            </div>
          )}

        </div>
      </section>

      {/* 6. CONTATO / PARTICIPAÇÃO POPULAR */}
      <section className="py-24 bg-brand-gray-50 border-t border-brand-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Col: Contact Info Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-brand-blue-dark to-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-5"></div>
              
              <div className="relative z-10 flex flex-col gap-6">
                <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-brand-pink-vibrant font-display font-semibold text-xs tracking-wider uppercase w-fit">
                  Fale com a gente
                </span>
                <h3 className="text-3xl font-display font-extrabold tracking-tight">
                  Construa esse mandato com a gente
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Tem uma sugestão de projeto de lei? Quer denunciar algum problema na sua comunidade ou solicitar o envio de um ofício? Mande sua mensagem ou utilize nossos formulários dedicados.
                </p>

                <div className="flex flex-col gap-4 text-sm text-white/80 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg text-brand-pink-vibrant">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-white/50">WhatsApp da Assessoria</p>
                      <a href={candidateConfig.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink-vibrant font-semibold font-mono">
                        {candidateConfig.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões de atalho */}
              <div className="relative z-10 flex flex-col gap-3 mt-12">
                <Link to="/sugira-uma-emenda" className="flex items-center justify-center gap-2 py-3 bg-brand-pink hover:bg-brand-pink-vibrant text-white font-semibold rounded-lg text-sm transition-colors">
                  Sugira uma Emenda Orçamentária
                </Link>
                <Link to="/faca-uma-denuncia" className="flex items-center justify-center gap-2 py-3 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold rounded-lg text-sm transition-colors">
                  Denúncia de Violação de Direitos
                </Link>
              </div>
            </div>

            {/* Right Col: Quick Form */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-brand-blue/5">
              <h4 className="font-display font-extrabold text-2xl text-brand-blue-dark mb-6">
                Envie uma Mensagem Direta
              </h4>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {formStatus.type && (
                  <div className={`p-4 rounded-lg text-sm font-semibold ${
                    formStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {formStatus.message}
                  </div>
                )}

                {/* Name & Email Grid */}
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
                      className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors"
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
                      className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors"
                    />
                  </div>
                </div>

                {/* WhatsApp & Subject */}
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
                      className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Motivo do Contato</label>
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
                      <option value="Ofício">Solicitação de Ofício</option>
                      <option value="Solicitação">Outra Solicitação</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Mensagem</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Escreva sua mensagem em detalhes..."
                    className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-50"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem para o Gabinete'}
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
