import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, RefreshCw, FileText } from 'lucide-react';
import { apiFetch } from '../utils/api.js';
import SEO from '../components/SEO.js';
import NewsCard from '../components/NewsCard.js';

export default function Noticias() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Search/Filters State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('busca') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || 'Geral');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Sync state with URL params
  useEffect(() => {
    setSearchQuery(searchParams.get('busca') || '');
    setSelectedCategory(searchParams.get('categoria') || 'Geral');
  }, [searchParams]);

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        query.append('page', currentPage.toString());
        query.append('limit', '9');
        if (searchQuery) query.append('search', searchQuery);
        if (selectedCategory && selectedCategory !== 'Geral') {
          query.append('category', selectedCategory);
        }

        const data = await apiFetch(`/news?${query.toString()}`);
        setArticles(data.news || []);
        setTotalPages(data.pagination?.pages || 1);
      } catch (err) {
        console.error('Falha ao buscar notícias do backend. Usando mocks:', err);
        // Fallback Mock News
        const mockNews = [
          {
            id: "1",
            title: "Mariana Souza defende a ampliação do programa Tecnologia Ativa nas escolas estaduais da Bahia",
            slug: "mariana-defende-tecnologia-ativa-na-bahia",
            summary: "Após aprovar o projeto em Salvador, a vereadora reuniu-se com lideranças educacionais de Feira de Santana para planejar a extensão do acesso digital para alunos da rede estadual.",
            image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
            category: "Tecnologia Ativa",
            author: "Assessoria",
            createdAt: new Date().toISOString()
          },
          {
            id: "2",
            title: "Gabinete Mariana Souza aprova recurso de R$ 1.2 milhão para estruturar a Casa do Autista em Salvador",
            slug: "aprovado-recurso-casa-do-autista",
            summary: "Os fundos municipais serão direcionados à aquisição de equipamentos clínicos e qualificação da equipe técnica. A proposta visa tornar-se um modelo estadual de acolhimento para o autismo.",
            image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop",
            category: "Direitos e Inclusão",
            author: "Assessoria",
            createdAt: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: "3",
            title: "Pelo interior: Mariana Souza visita cooperativas de agricultura familiar no Recôncavo Baiano",
            slug: "visita-interior-cooperativas",
            summary: "Ouvindo demandas dos produtores rurais de Santo Amaro e Cruz das Almas, a pré-candidata debateu políticas de incentivo e linhas de crédito para jovens no campo.",
            image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800&auto=format&fit=crop",
            category: "Atuação",
            author: "Assessoria",
            createdAt: new Date(Date.now() - 172800000).toISOString()
          },
          {
            id: "4",
            title: "Mariana Souza propõe criação do Botão do Comerciante para reforçar a segurança em Salvador",
            slug: "mariana-propoe-botao-do-comerciante",
            summary: "O projeto de lei visa disponibilizar um sistema de pânico silencioso nos estabelecimentos comerciais, integrando a segurança dos pequenos lojistas aos órgãos municipais.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
            category: "Segurança",
            author: "Assessoria",
            createdAt: new Date(Date.now() - 259200000).toISOString()
          }
        ];

        let filtered = [...mockNews];
        if (selectedCategory && selectedCategory !== 'Geral') {
          filtered = filtered.filter(n => n.category === selectedCategory);
        }
        if (searchQuery) {
          filtered = filtered.filter(n => 
            n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            n.summary.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setArticles(filtered);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadNews();
    }, 300);

    return () => clearTimeout(timer);
  }, [currentPage, searchQuery, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      searchParams.set('busca', searchQuery);
    } else {
      searchParams.delete('busca');
    }
    setSearchParams(searchParams);
    setCurrentPage(1);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (category === 'Geral') {
      searchParams.delete('categoria');
    } else {
      searchParams.set('categoria', category);
    }
    setSearchParams(searchParams);
    setCurrentPage(1);
  };

  const categories = ['Geral', 'Tecnologia Ativa', 'Direitos e Inclusão', 'Atuação', 'Segurança'];

  return (
    <>
      <SEO 
        title="Notícias" 
        description="Acompanhe as últimas notícias, discursos, ações e posicionamentos oficiais do mandato da vereadora Mariana Souza." 
      />

      {/* Page Header */}
      <section className="relative bg-brand-blue-dark text-white pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <span className="px-4 py-1.5 bg-brand-pink/20 border border-brand-pink/30 rounded-full text-brand-pink-vibrant font-display font-semibold text-xs tracking-wider uppercase mb-4 inline-block">
            Sala de Imprensa
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
            Notícias & Atualidades
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Fique por dentro das principais reportagens, artigos de opinião e prestação de contas do gabinete.
          </p>
        </div>
      </section>

      {/* Archive Grid */}
      <section className="py-20 bg-brand-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Search & Category Filter */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
            
            {/* Categories list */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full border transition-colors ${
                    selectedCategory === cat
                      ? 'bg-brand-pink text-white border-brand-pink'
                      : 'bg-white text-brand-gray-600 border-brand-gray-200 hover:bg-brand-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="flex w-full lg:w-96 relative">
              <input
                type="text"
                placeholder="Pesquisar notícias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 pr-12 border border-brand-gray-300 rounded-full text-sm outline-none focus:border-brand-blue bg-white shadow-sm transition-colors"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 bg-brand-blue hover:bg-brand-pink text-white rounded-full transition-colors"
              >
                <Search size={14} />
              </button>
            </form>

          </div>

          {/* Grid Render */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-brand-gray-600">
              <RefreshCw className="animate-spin text-brand-pink-vibrant" size={32} />
              <span className="text-sm font-semibold">Carregando sala de imprensa...</span>
            </div>
          ) : articles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {articles.map((item) => (
                  <NewsCard key={item.id} article={item} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="p-3 border border-brand-gray-300 rounded-lg hover:bg-brand-gray-100 disabled:opacity-30 bg-white transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-sm font-semibold text-brand-gray-600 px-4">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="p-3 border border-brand-gray-300 rounded-lg hover:bg-brand-gray-100 disabled:opacity-30 bg-white transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-brand-blue/5 text-center max-w-xl mx-auto">
              <FileText className="mx-auto text-brand-pink-vibrant mb-4 opacity-50" size={48} />
              <h3 className="font-display font-bold text-xl text-brand-blue-dark mb-2">Nenhuma notícia publicada</h3>
              <p className="text-brand-gray-600 text-sm leading-relaxed">
                Nenhum artigo corresponde à pesquisa. Tente buscar por outros termos ou redefinir os filtros de categoria.
              </p>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
