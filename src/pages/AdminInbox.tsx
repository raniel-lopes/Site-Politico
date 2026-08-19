import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Lightbulb, AlertTriangle, Eye, Trash2, CheckCircle, RefreshCw, Clock } from 'lucide-react';
import { apiFetch } from '../utils/api.js';
import AdminLayout from '../components/AdminLayout.js';
import SEO from '../components/SEO.js';

export default function AdminInbox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'mensagens';

  const [messages, setMessages] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Detail Modal State
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const loadInbox = async () => {
    setLoading(true);
    try {
      if (activeTab === 'mensagens') {
        const data = await apiFetch('/admin/messages');
        setMessages(data || []);
      } else if (activeTab === 'sugestoes') {
        const data = await apiFetch('/admin/suggestions');
        setSuggestions(data || []);
      } else if (activeTab === 'denuncias') {
        const data = await apiFetch('/admin/reports');
        setReports(data || []);
      }
    } catch (err) {
      console.error('Falha ao carregar itens da caixa de entrada:', err);
      // Offline fallback simulations
      if (activeTab === 'mensagens') {
        setMessages([
          { id: '1', name: 'José Albuquerque', email: 'jose@gmail.com', whatsapp: '(71) 98888-1111', subject: 'Reclamação', message: 'Buraco gigante na rua principal de Pernambués. Carros estão quebrando.', isRead: false, createdAt: new Date().toISOString() }
        ]);
      } else if (activeTab === 'sugestoes') {
        setSuggestions([
          { id: '2', name: 'Ana Nery', email: 'ana.nery@hotmail.com', whatsapp: '(71) 99111-2222', topic: 'Saúde e Postos de Atendimento', message: 'Por favor, destinar emenda para reforma do posto de saúde do Cabula.', isRead: false, createdAt: new Date().toISOString() }
        ]);
      } else if (activeTab === 'denuncias') {
        setReports([
          { id: '3', isAnonymous: true, description: 'Falta de merenda escolar constante na Escola Municipal de Pernambués.', location: 'Pernambués', status: 'Pendente', isRead: false, createdAt: new Date().toISOString() }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInbox();
  }, [activeTab]);

  const handleTabChange = (tabName: string) => {
    searchParams.set('tab', tabName);
    setSearchParams(searchParams);
  };

  const handleOpenDetail = async (item: any) => {
    setSelectedItem(item);
    setDetailModalOpen(true);

    // Auto mark as read in database
    if (!item.isRead) {
      try {
        if (activeTab === 'mensagens') {
          await apiFetch(`/admin/messages/${item.id}/read`, {
            method: 'PUT',
            body: JSON.stringify({ isRead: true })
          });
          setMessages(prev => prev.map(m => m.id === item.id ? { ...m, isRead: true } : m));
        } else if (activeTab === 'sugestoes') {
          await apiFetch(`/admin/suggestions/${item.id}/read`, {
            method: 'PUT',
            body: JSON.stringify({ isRead: true })
          });
          setSuggestions(prev => prev.map(s => s.id === item.id ? { ...s, isRead: true } : s));
        } else if (activeTab === 'denuncias') {
          await apiFetch(`/admin/reports/${item.id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ isRead: true })
          });
          setReports(prev => prev.map(r => r.id === item.id ? { ...r, isRead: true } : r));
        }
      } catch (err) {
        console.error('Falha ao marcar como lido:', err);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Excluir este contato permanentemente?')) return;

    try {
      if (activeTab === 'mensagens') {
        await apiFetch(`/admin/messages/${id}`, { method: 'DELETE' });
      } else if (activeTab === 'sugestoes') {
        await apiFetch(`/admin/suggestions/${id}`, { method: 'DELETE' });
      } else if (activeTab === 'denuncias') {
        await apiFetch(`/admin/reports/${id}`, { method: 'DELETE' });
      }
      setDetailModalOpen(false);
      loadInbox();
    } catch (err: any) {
      alert(err.message || 'Falha ao excluir.');
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await apiFetch(`/admin/reports/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem((prev: any) => ({ ...prev, status: newStatus }));
      }
    } catch (err: any) {
      alert(err.message || 'Falha ao atualizar status.');
    }
  };

  return (
    <AdminLayout>
      <SEO title="Painel Admin - Caixa de Entrada" />

      <div className="flex flex-col gap-8 flex-grow">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-extrabold text-brand-blue-dark">Caixa de Entrada</h1>
            <p className="text-sm text-brand-gray-600">Acompanhe as interações e demandas enviadas pelo site.</p>
          </div>
          <button 
            onClick={loadInbox}
            className="p-2 border border-brand-gray-300 rounded-lg bg-white hover:bg-brand-gray-100 text-brand-gray-600 transition-colors"
          >
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-brand-gray-200">
          <button
            onClick={() => handleTabChange('mensagens')}
            className={`flex items-center gap-2 px-6 py-3.5 border-b-2 font-display font-bold text-sm transition-colors ${
              activeTab === 'mensagens' 
                ? 'border-brand-pink text-brand-pink-vibrant' 
                : 'border-transparent text-brand-gray-600 hover:text-brand-blue'
            }`}
          >
            <Mail size={16} />
            Mensagens de Contato
          </button>
          
          <button
            onClick={() => handleTabChange('sugestoes')}
            className={`flex items-center gap-2 px-6 py-3.5 border-b-2 font-display font-bold text-sm transition-colors ${
              activeTab === 'sugestoes' 
                ? 'border-brand-pink text-brand-pink-vibrant' 
                : 'border-transparent text-brand-gray-600 hover:text-brand-blue'
            }`}
          >
            <Lightbulb size={16} />
            Sugestões de Emenda
          </button>

          <button
            onClick={() => handleTabChange('denuncias')}
            className={`flex items-center gap-2 px-6 py-3.5 border-b-2 font-display font-bold text-sm transition-colors ${
              activeTab === 'denuncias' 
                ? 'border-brand-pink text-brand-pink-vibrant' 
                : 'border-transparent text-brand-gray-600 hover:text-brand-blue'
            }`}
          >
            <AlertTriangle size={16} />
            Denúncias
          </button>
        </div>

        {/* Detail Modal Overlay */}
        {detailModalOpen && selectedItem && (
          <div className="fixed inset-0 bg-brand-blue-dark/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 md:p-8 rounded-3xl w-full max-w-lg border border-brand-blue/15 shadow-2xl relative">
              <button 
                onClick={() => setDetailModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 bg-brand-gray-100 hover:bg-brand-gray-200 text-brand-gray-600 rounded-full transition-colors font-semibold"
              >
                Fechar
              </button>

              <h3 className="font-display font-extrabold text-xl text-brand-blue-dark mb-4">
                Detalhes da Demanda
              </h3>

              <div className="space-y-4 text-sm text-brand-gray-600 leading-relaxed border-t border-brand-gray-100 pt-4">
                {activeTab === 'denuncias' ? (
                  <>
                    <p><strong>Tipo:</strong> {selectedItem.isAnonymous ? 'Denúncia Anônima' : 'Denúncia Identificada'}</p>
                    {!selectedItem.isAnonymous && (
                      <>
                        <p><strong>Nome:</strong> {selectedItem.reporterName}</p>
                        <p><strong>E-mail:</strong> {selectedItem.reporterEmail}</p>
                        <p><strong>WhatsApp:</strong> {selectedItem.reporterWhatsapp}</p>
                      </>
                    )}
                    <p><strong>Local:</strong> {selectedItem.location || 'Não informado'}</p>
                    <p><strong>Status de Análise:</strong></p>
                    <select
                      value={selectedItem.status}
                      onChange={(e) => handleStatusChange(selectedItem.id, e.target.value)}
                      className="w-full px-4 py-2 border border-brand-gray-300 rounded-lg outline-none bg-white text-sm"
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Em Análise">Em Análise</option>
                      <option value="Resolvido">Resolvido</option>
                    </select>
                  </>
                ) : (
                  <>
                    <p><strong>Nome do Remetente:</strong> {selectedItem.name}</p>
                    <p><strong>E-mail:</strong> {selectedItem.email}</p>
                    <p><strong>WhatsApp:</strong> {selectedItem.whatsapp}</p>
                    <p><strong>Assunto/Tema:</strong> {activeTab === 'mensagens' ? selectedItem.subject : selectedItem.topic}</p>
                  </>
                )}

                <p className="border-t border-brand-gray-100 pt-4"><strong>Conteúdo / Detalhes:</strong></p>
                <div className="bg-brand-gray-50 border border-brand-gray-200 p-4 rounded-xl text-xs max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {activeTab === 'denuncias' ? selectedItem.description : selectedItem.message}
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-brand-gray-100">
                  <button
                    onClick={() => handleDelete(selectedItem.id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 font-bold"
                  >
                    <Trash2 size={16} /> Excluir Registro
                  </button>
                  <span className="text-[10px] font-mono text-brand-gray-600">
                    ID: {selectedItem.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content list */}
        {loading ? (
          <div className="flex justify-center py-20">
            <RefreshCw className="animate-spin text-brand-pink-vibrant" size={32} />
          </div>
        ) : (
          <div className="bg-white border border-brand-blue/5 shadow-sm rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-brand-gray-600">
                <thead className="bg-brand-gray-50 font-display font-bold text-brand-blue-dark text-xs uppercase tracking-wider border-b border-brand-gray-200">
                  <tr>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Remetente / Local</th>
                    <th className="px-6 py-4">Assunto / Tema</th>
                    <th className="px-6 py-4">Data de Envio</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-gray-200">
                  {/* Render based on Active Tab */}
                  {activeTab === 'mensagens' && messages.map((item) => (
                    <tr key={item.id} className={`hover:bg-brand-gray-50/50 transition-colors ${!item.isRead ? 'font-semibold bg-brand-pink-light/10 text-brand-blue-dark' : ''}`}>
                      <td className="px-6 py-4">
                        {item.isRead ? (
                          <span className="text-xs text-brand-gray-600 flex items-center gap-1"><CheckCircle size={14} className="text-green-500" /> Lido</span>
                        ) : (
                          <span className="text-xs text-brand-pink-vibrant flex items-center gap-1"><Clock size={14} /> Pendente</span>
                        )}
                      </td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4 text-xs font-semibold">{item.subject}</td>
                      <td className="px-6 py-4 text-xs">{new Date(item.createdAt).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleOpenDetail(item)} className="p-1.5 border border-brand-gray-300 rounded hover:bg-brand-blue-light/25 hover:text-brand-blue bg-white transition-colors" title="Visualizar"><Eye size={14} /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-1.5 border border-brand-gray-300 rounded hover:bg-red-50 hover:text-red-600 bg-white transition-colors" title="Excluir"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {activeTab === 'sugestoes' && suggestions.map((item) => (
                    <tr key={item.id} className={`hover:bg-brand-gray-50/50 transition-colors ${!item.isRead ? 'font-semibold bg-brand-pink-light/10 text-brand-blue-dark' : ''}`}>
                      <td className="px-6 py-4">
                        {item.isRead ? (
                          <span className="text-xs text-brand-gray-600 flex items-center gap-1"><CheckCircle size={14} className="text-green-500" /> Lido</span>
                        ) : (
                          <span className="text-xs text-brand-pink-vibrant flex items-center gap-1"><Clock size={14} /> Novo</span>
                        )}
                      </td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4 text-xs font-semibold max-w-xs truncate">{item.topic}</td>
                      <td className="px-6 py-4 text-xs">{new Date(item.createdAt).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleOpenDetail(item)} className="p-1.5 border border-brand-gray-300 rounded hover:bg-brand-blue-light/25 hover:text-brand-blue bg-white transition-colors" title="Visualizar"><Eye size={14} /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-1.5 border border-brand-gray-300 rounded hover:bg-red-50 hover:text-red-600 bg-white transition-colors" title="Excluir"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {activeTab === 'denuncias' && reports.map((item) => (
                    <tr key={item.id} className={`hover:bg-brand-gray-50/50 transition-colors ${!item.isRead ? 'font-semibold bg-brand-pink-light/10 text-brand-blue-dark' : ''}`}>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.status === 'Resolvido' ? 'bg-green-100 text-green-700' :
                          item.status === 'Em Análise' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{item.isAnonymous ? 'Anônimo' : item.reporterName} ({item.location || 'Sem local'})</td>
                      <td className="px-6 py-4 text-xs font-semibold max-w-xs truncate">{item.description}</td>
                      <td className="px-6 py-4 text-xs">{new Date(item.createdAt).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleOpenDetail(item)} className="p-1.5 border border-brand-gray-300 rounded hover:bg-brand-blue-light/25 hover:text-brand-blue bg-white transition-colors" title="Visualizar"><Eye size={14} /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-1.5 border border-brand-gray-300 rounded hover:bg-red-50 hover:text-red-600 bg-white transition-colors" title="Excluir"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty check */}
            {((activeTab === 'mensagens' && messages.length === 0) ||
              (activeTab === 'sugestoes' && suggestions.length === 0) ||
              (activeTab === 'denuncias' && reports.length === 0)) && (
              <div className="p-12 text-center text-brand-gray-600">
                <p className="text-sm font-semibold">Nenhum registro encontrado nesta categoria.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
