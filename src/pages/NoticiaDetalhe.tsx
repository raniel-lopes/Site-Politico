import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, MessageSquare, Facebook } from 'lucide-react';
import { apiFetch } from '../utils/api.js';
import SEO from '../components/SEO.js';

export default function NoticiaDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadArticle() {
      setLoading(true);
      try {
        const data = await apiFetch(`/news/${slug}`);
        setArticle(data);
      } catch (err) {
        console.error('Falha ao buscar notícia do backend. Usando fallback:', err);
        // Fallback Mock data
        const mockNews = [
          {
            title: "Mariana Souza defende a ampliação do programa Tecnologia Ativa nas escolas estaduais da Bahia",
            slug: "mariana-defende-tecnologia-ativa-na-bahia",
            summary: "Após aprovar o projeto em Salvador, a vereadora reuniu-se com lideranças educacionais de Feira de Santana para planejar a extensão do acesso digital para alunos da rede estadual.",
            content: `### Tecnologia como direito social fundamental

Na última terça-feira, a vereadora Mariana Souza liderou uma audiência em Salvador que reuniu especialistas, educadores e pais para debater os resultados preliminares do **Programa Tecnologia Ativa**.\n\nAprovado na Câmara Municipal de Salvador, o projeto garantiu laboratórios de programação e tablets nas escolas de periferia. Diante do sucesso estrondoso, Mariana iniciou tratativas para propor um modelo legislativo para toda a Bahia, defendendo a expansão do programa nas redes estaduais a partir de 2027.\n\n> "A exclusão digital na juventude baiana é um gargalo que limita o futuro profissional. Ensinar lógica de programação e dar acesso a computadores é a saúde social das próximas gerações."\n\nA pré-candidata participará de rodadas de encontros com secretários de educação do interior para levantar as demandas de infraestrutura.`,
            image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
            category: "Tecnologia Ativa",
            author: "Assessoria",
            createdAt: new Date().toISOString()
          },
          {
            title: "Gabinete Mariana Souza aprova recurso de R$ 1.2 milhão para estruturar a Casa do Autista em Salvador",
            slug: "aprovado-recurso-casa-do-autista",
            summary: "Os fundos municipais serão direcionados à aquisição de equipamentos clínicos e qualificação da equipe técnica. A proposta visa tornar-se um modelo estadual de acolhimento para o autismo.",
            content: `O mandato da vereadora Mariana Souza obteve uma vitória marcante para a saúde e direitos sociais em Salvador. O remanejamento orçamentário no valor de **R$ 1.2 milhão** foi totalmente aprovado e será destinado para estruturar e iniciar o funcionamento da **Casa do Autista**.\n\nO espaço servirá de ponto focal para acolhimento de crianças e adultos com Transtorno do Espectro Autista (TEA), disponibilizando atendimento multidisciplinar composto por psicólogos, terapeutas ocupacionais e fonoaudiólogos.\n\nMariana Souza ressaltou que esse projeto é um piloto inovador: "Em Salvador iniciamos essa semente de acolhimento gratuito e integral. Nosso objetivo, ao buscar uma vaga na ALBA, é descentralizar esses centros terapêuticos especializados para atender a todo o Recôncavo e interior da Bahia".`,
            image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop",
            category: "Direitos e Inclusão",
            author: "Assessoria",
            createdAt: new Date(Date.now() - 86400000).toISOString()
          }
        ];

        const match = mockNews.find(n => n.slug === slug);
        if (match) {
          setArticle(match);
        } else {
          navigate('/noticias');
        }
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [slug, navigate]);

  const handleShareWhatsApp = () => {
    const text = `Confira esta notícia sobre o mandato de Mariana Souza: ${article.title}\n\nLeia no site: ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-gray-50 flex items-center justify-center pt-24">
        <div className="text-center flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-pink border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-brand-gray-600">Buscando notícia...</span>
        </div>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <>
      <SEO 
        title={article.title}
        description={article.summary}
        image={article.image}
      />

      <article className="bg-white min-h-screen pt-36 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          
          {/* Back button */}
          <Link to="/noticias" className="inline-flex items-center gap-2 text-sm text-brand-blue hover:text-brand-pink-vibrant font-semibold mb-8 group transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Voltar para Notícias
          </Link>

          {/* Category Badge & Metas */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="bg-brand-blue text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              {article.category}
            </span>
            <div className="flex items-center gap-4 text-xs text-brand-gray-600">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-brand-pink-vibrant" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-brand-pink-vibrant" />
                Por {article.author}
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-brand-blue-dark leading-tight mb-6 tracking-tight">
            {article.title}
          </h1>

          {/* Summary Lead */}
          <p className="text-brand-gray-600 text-lg md:text-xl font-medium leading-relaxed mb-10 border-l-4 border-brand-pink-vibrant pl-5 italic">
            {article.summary}
          </p>

          {/* Cover image */}
          <div className="rounded-3xl overflow-hidden shadow-lg border border-brand-blue/5 mb-12 aspect-video bg-brand-gray-100">
            <img
              src={article.image || 'https://via.placeholder.com/1200x675.png?text=Mariana+Souza+2026'}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main Content Body */}
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-brand-blue-dark prose-p:leading-relaxed prose-p:text-brand-gray-600 prose-blockquote:border-l-brand-pink prose-blockquote:bg-brand-gray-50 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic text-brand-gray-600 leading-relaxed space-y-6">
            {/* Split content by double new lines and render paragraphs or headers */}
            {article.content.split('\n\n').map((block: string, idx: number) => {
              if (block.startsWith('### ')) {
                return <h3 key={idx} className="text-2xl font-bold text-brand-blue-dark mt-8 mb-4">{block.replace('### ', '')}</h3>;
              }
              if (block.startsWith('> ')) {
                return (
                  <blockquote key={idx} className="border-l-4 border-brand-pink bg-brand-gray-50 p-6 rounded-r-2xl italic my-6 text-brand-blue-dark font-medium">
                    {block.replace('> ', '').replace(/"/g, '')}
                  </blockquote>
                );
              }
              return <p key={idx} className="text-base md:text-lg mb-4">{block}</p>;
            })}
          </div>

          {/* Social Share Footer widget */}
          <div className="border-t border-brand-gray-200 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm font-bold text-brand-blue-dark flex items-center gap-2">
              <Share2 size={16} className="text-brand-pink-vibrant" /> Gostou? Compartilhe essa ação
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleShareWhatsApp}
                className="flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                <MessageSquare size={14} /> WhatsApp
              </button>
              <button 
                onClick={handleShareFacebook}
                className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                <Facebook size={14} /> Facebook
              </button>
            </div>
          </div>

        </div>
      </article>
    </>
  );
}
