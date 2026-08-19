import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, RefreshCw, FileText, CheckCircle, ExternalLink } from 'lucide-react';
import { candidateConfig } from '../config/candidate.js';
import { apiFetch } from '../utils/api.js';
import SEO from '../components/SEO.js';

export default function NossosProjetos() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Filters State
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Load category from query string on load
  useEffect(() => {
    const categoryParam = searchParams.get('categoria');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (search) query.append('search', search);
        if (selectedCategory && selectedCategory !== 'Todos') {
          query.append('category', selectedCategory);
        }

        const data = await apiFetch(`/projects?${query.toString()}`);
        setProjects(data || []);
      } catch (err) {
        console.error('Falha ao buscar projetos do backend. Usando fallback:', err);
        // Fallback to local config
        let filtered = [...candidateConfig.projects];
        if (selectedCategory && selectedCategory !== 'Todos') {
          filtered = filtered.filter(p => p.category === selectedCategory);
        }
        if (search) {
          filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(search.toLowerCase()) || 
            p.description.toLowerCase().includes(search.toLowerCase()) ||
            (p.code && p.code.toLowerCase().includes(search.toLowerCase()))
          );
        }
        setProjects(filtered);
      } finally {
        setLoading(false);
      }
    }

    const delayDebounce = setTimeout(() => {
      loadProjects();
    }, 300); // Debounce search

    return () => clearTimeout(delayDebounce);
  }, [search, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'Todos') {
      searchParams.delete('categoria');
    } else {
      searchParams.set('categoria', category);
    }
    setSearchParams(searchParams);
  };

  const categories = [
    'Todos',
    'Saúde Integrada',
    'Escola Segura & Tecnologia',
    'Direitos e Inclusão',
    'Tecnologia Ativa',
    'Segurança e Serviços',
    'Assistência Social'
  ];

  return (
    <>
      <SEO 
        title="Projetos de Lei" 
        description="Conheça os projetos de lei, propostas de emendas e indicações do mandato de Mariana Souza em Salvador e para a Bahia."
      />

      {/* Page Header */}
      <section className="relative bg-brand-blue-dark text-white pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <span className="px-4 py-1.5 bg-brand-pink/20 border border-brand-pink/30 rounded-full text-brand-pink-vibrant font-display font-semibold text-xs tracking-wider uppercase mb-4 inline-block">
            Prestação de Contas
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
            Nossos Projetos
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Iniciativas de impacto social convertidas em Projetos de Lei, Indicações aprovadas e propostas orçamentárias concretas.
          </p>
        </div>
      </section>

      {/* Projects Search and Grid */}
      <section className="py-20 bg-brand-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Filters Bar */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-blue/5 mb-10 flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              
              {/* Search Bar */}
              <div className="lg:col-span-4 relative">
                <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-gray-600" />
                <input
                  type="text"
                  placeholder="Buscar por código ou palavra-chave..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors"
                />
              </div>

              {/* Quick Categories Desktop Scroll */}
              <div className="lg:col-span-8 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 ${
                      selectedCategory === cat
                        ? 'bg-brand-blue text-white border-brand-blue'
                        : 'bg-brand-gray-50 text-brand-gray-600 border-brand-gray-200 hover:bg-brand-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Results Area */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-brand-gray-600">
              <RefreshCw className="animate-spin text-brand-pink-vibrant" size={32} />
              <span className="text-sm font-semibold">Carregando projetos legislativos...</span>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj, idx) => (
                <div 
                  key={proj.id || idx}
                  className="bg-white rounded-2xl p-8 border border-brand-blue/10 hover:border-brand-blue/20 hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="px-3 py-1 bg-brand-blue-light/35 text-brand-blue text-xs font-bold rounded-full">
                      {proj.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      proj.status === 'Aprovado' ? 'bg-green-50 text-green-700 border border-green-200' :
                      proj.status === 'Em Tramitação' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 
                      'bg-brand-gray-100 text-brand-gray-700 border border-brand-gray-200'
                    }`}>
                      {proj.status}
                    </span>
                  </div>

                  {/* Title & Code */}
                  <span className="font-mono text-xs text-brand-gray-600 block mb-1">{proj.code || 'PL/Indicação'}</span>
                  <h3 className="font-display font-bold text-xl text-brand-blue-dark group-hover:text-brand-pink-vibrant transition-colors mb-4">
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p className="text-brand-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                    {proj.description}
                  </p>

                  {/* Footer details */}
                  <div className="pt-4 border-t border-brand-gray-100 flex items-center justify-between mt-auto">
                    <span className="text-xs text-brand-gray-600 font-semibold flex items-center gap-1">
                      <CheckCircle size={14} className="text-green-500" />
                      Auditoria de Mandato
                    </span>
                    {proj.link ? (
                      <a 
                        href={proj.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-brand-blue hover:text-brand-pink-vibrant font-bold flex items-center gap-1 transition-colors"
                      >
                        Acompanhar Trâmite <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-xs text-brand-gray-600 italic">Gabinete Digital</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-brand-blue/5 text-center max-w-xl mx-auto">
              <FileText className="mx-auto text-brand-pink-vibrant mb-4 opacity-50" size={48} />
              <h3 className="font-display font-bold text-xl text-brand-blue-dark mb-2">Nenhum projeto encontrado</h3>
              <p className="text-brand-gray-600 text-sm leading-relaxed">
                Não encontramos projetos correspondentes aos filtros selecionados. Tente ajustar os termos de busca ou mudar a categoria.
              </p>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
