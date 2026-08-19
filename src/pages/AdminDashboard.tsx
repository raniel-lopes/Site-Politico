import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Newspaper, 
  FileText, 
  Mail, 
  Lightbulb, 
  AlertTriangle, 
  ArrowRight,
  RefreshCw 
} from 'lucide-react';
import { apiFetch } from '../utils/api.js';
import AdminLayout from '../components/AdminLayout.js';
import SEO from '../components/SEO.js';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/admin/stats');
      setStats(data);
    } catch (err) {
      console.error('Falha ao buscar estatísticas do backend:', err);
      // Fictional mockup stats for offline presentation
      setStats({
        newsCount: 4,
        projectCount: 5,
        unreadMessages: 2,
        unreadSuggestions: 1,
        unreadReports: 1,
        totalUnread: 4
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading && !stats) {
    return (
      <AdminLayout>
        <div className="flex-grow flex items-center justify-center">
          <RefreshCw className="animate-spin text-brand-pink-vibrant" size={36} />
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    { label: 'Notícias Publicadas', value: stats?.newsCount, path: '/admin/noticias', icon: Newspaper, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { label: 'Projetos Cadastrados', value: stats?.projectCount, path: '/admin/projetos', icon: FileText, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { label: 'Mensagens Pendentes', value: stats?.unreadMessages, path: '/admin/mensagens?tab=mensagens', icon: Mail, color: 'text-amber-600 bg-amber-50 border-amber-100' },
    { label: 'Sugestões de Emenda', value: stats?.unreadSuggestions, path: '/admin/mensagens?tab=sugestoes', icon: Lightbulb, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    { label: 'Denúncias Não Lidas', value: stats?.unreadReports, path: '/admin/mensagens?tab=denuncias', icon: AlertTriangle, color: 'text-rose-600 bg-rose-50 border-rose-100' },
  ];

  return (
    <AdminLayout>
      <SEO title="Painel Admin - Dashboard" />

      <div className="flex flex-col gap-8 flex-grow">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-extrabold text-brand-blue-dark">Resumo do Mandato</h1>
            <p className="text-sm text-brand-gray-600">Monitore as publicações oficiais e contatos populacionais.</p>
          </div>
          <button 
            onClick={loadStats}
            className="p-2 border border-brand-gray-300 rounded-lg bg-white hover:bg-brand-gray-100 text-brand-gray-600 transition-colors"
            title="Recarregar dados"
          >
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx}
                className={`p-6 rounded-3xl border shadow-sm flex flex-col justify-between ${card.color}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-semibold">{card.label}</span>
                  <div className="p-2 bg-white rounded-xl shadow-xs">
                    <Icon size={20} />
                  </div>
                </div>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-3xl font-display font-black leading-none">{card.value}</span>
                  <Link 
                    to={card.path}
                    className="text-xs font-bold flex items-center gap-1 hover:underline"
                  >
                    Gerenciar <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions Board */}
        <div className="bg-white p-8 rounded-3xl border border-brand-blue/5 shadow-sm mt-4">
          <h3 className="font-display font-bold text-xl text-brand-blue-dark mb-4">Guia Prático da Assessoria</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-brand-gray-600 leading-relaxed">
            <div className="space-y-3">
              <h4 className="font-bold text-brand-blue-dark">1. Publicando Notícias</h4>
              <p>Acesse a seção de **Notícias** para escrever um novo artigo. Você pode preencher o título, resumo, categoria e colar o texto. O sistema gera a rota automática (`slug`) amigável para SEO para divulgar em redes sociais.</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-brand-blue-dark">2. Atendimento ao Cidadão</h4>
              <p>Os contatos, denúncias anônimas e ideias de emendas parlamentares caem diretamente na aba **Mensagens de Contato**. Use esse painel para classificar, responder ou auditar as demandas da comunidade de Salvador.</p>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
