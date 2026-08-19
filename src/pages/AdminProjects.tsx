import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Save, X, RefreshCw, AlertCircle } from 'lucide-react';
import { apiFetch } from '../utils/api.js';
import AdminLayout from '../components/AdminLayout.js';
import SEO from '../components/SEO.js';

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Editor State
  const [editorOpen, setEditorOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Direitos e Inclusão');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Protocolado');
  const [code, setCode] = useState('');
  const [link, setLink] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/projects');
      setProjects(data || []);
    } catch (err) {
      console.error('Falha ao carregar projetos no painel:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenNew = () => {
    setCurrentProject(null);
    setTitle('');
    setCategory('Direitos e Inclusão');
    setDescription('');
    setStatus('Protocolado');
    setCode('');
    setLink('');
    setErrorMessage('');
    setEditorOpen(true);
  };

  const handleOpenEdit = (proj: any) => {
    setCurrentProject(proj);
    setTitle(proj.title);
    setCategory(proj.category);
    setDescription(proj.description);
    setStatus(proj.status);
    setCode(proj.code || '');
    setLink(proj.link || '');
    setErrorMessage('');
    setEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage('');

    try {
      const payload = { title, category, description, status, code, link };
      if (currentProject) {
        // Update
        await apiFetch(`/projects/${currentProject.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
      } else {
        // Create
        await apiFetch('/projects', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
      }
      setEditorOpen(false);
      loadProjects();
    } catch (err: any) {
      setErrorMessage(err.message || 'Falha ao salvar projeto.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Excluir este projeto do site permanentemente?')) return;

    try {
      await apiFetch(`/projects/${id}`, { method: 'DELETE' });
      loadProjects();
    } catch (err: any) {
      alert(err.message || 'Falha ao excluir.');
    }
  };

  return (
    <AdminLayout>
      <SEO title="Painel Admin - Gerenciar Projetos" />

      <div className="flex flex-col gap-8 flex-grow">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-extrabold text-brand-blue-dark">Gerenciar Projetos</h1>
            <p className="text-sm text-brand-gray-600">Publique projetos de lei, indicações e ações parlamentares.</p>
          </div>
          <button 
            onClick={handleOpenNew}
            className="btn-primary flex items-center gap-2 font-semibold !py-2.5"
          >
            <Plus size={18} /> Novo Projeto
          </button>
        </div>

        {/* Editor Modal */}
        {editorOpen && (
          <div className="fixed inset-0 bg-brand-blue-dark/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 md:p-8 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-brand-blue/15 shadow-2xl relative">
              <button 
                onClick={() => setEditorOpen(false)}
                className="absolute top-5 right-5 p-1 bg-brand-gray-100 hover:bg-brand-gray-200 text-brand-gray-600 rounded-full transition-colors"
              >
                <X size={18} />
              </button>

              <h3 className="font-display font-extrabold text-xl text-brand-blue-dark mb-6">
                {currentProject ? 'Editar Item Legislativo' : 'Adicionar Item Legislativo'}
              </h3>

              <form onSubmit={handleSave} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 bg-red-50 text-red-800 text-sm font-semibold rounded-lg border border-red-200 flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Título da Proposta</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Botão do Comerciante"
                    className="w-full px-4 py-2.5 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue"
                  />
                </div>

                {/* Category & Status & Code */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Categoria / Bandeira</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue bg-white"
                    >
                      <option value="Saúde Integrada">Saúde Integrada</option>
                      <option value="Escola Segura & Tecnologia">Escola Segura & Tecnologia</option>
                      <option value="Direitos e Inclusão">Direitos e Inclusão</option>
                      <option value="Tecnologia Ativa">Tecnologia Ativa</option>
                      <option value="Segurança e Serviços">Segurança e Serviços</option>
                      <option value="Assistência Social">Assistência Social</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Status Atual</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-2.5 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue bg-white"
                    >
                      <option value="Protocolado">Protocolado</option>
                      <option value="Em Tramitação">Em Tramitação</option>
                      <option value="Em Análise">Em Análise</option>
                      <option value="Aprovado">Aprovado</option>
                      <option value="Rejeitado">Rejeitado</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Código Oficial (PL)</label>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Ex: PL 123/2024"
                      className="w-full px-4 py-2.5 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>

                {/* Link */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Link da Câmara (Acompanhar trâmite)</label>
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Descrição dos Objetivos</label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Resumo do impacto que este projeto gera nas comunidades baianas..."
                    className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue font-sans resize-none"
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-brand-gray-100">
                  <button
                    type="button"
                    onClick={() => setEditorOpen(false)}
                    className="btn-secondary !py-2.5"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary flex items-center gap-2 !py-2.5"
                  >
                    <Save size={16} />
                    {saving ? 'Gravando...' : 'Gravar Projeto'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* List table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <RefreshCw className="animate-spin text-brand-pink-vibrant" size={32} />
          </div>
        ) : projects.length > 0 ? (
          <div className="bg-white border border-brand-blue/5 shadow-sm rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-brand-gray-600">
                <thead className="bg-brand-gray-50 font-display font-bold text-brand-blue-dark text-xs uppercase tracking-wider border-b border-brand-gray-200">
                  <tr>
                    <th className="px-6 py-4">Código</th>
                    <th className="px-6 py-4">Título</th>
                    <th className="px-6 py-4">Categoria</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-gray-200">
                  {projects.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-brand-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-brand-blue-electric font-semibold">
                        {item.code || 'S/ Código'}
                      </td>
                      <td className="px-6 py-4 font-semibold text-brand-blue-dark">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold">
                        {item.category}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.status === 'Aprovado' ? 'bg-green-100 text-green-700' :
                          item.status === 'Em Tramitação' ? 'bg-amber-100 text-amber-700' : 'bg-brand-gray-200 text-brand-gray-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 border border-brand-gray-300 rounded hover:bg-brand-blue-light/20 hover:text-brand-blue transition-colors bg-white"
                            title="Editar"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 border border-brand-gray-300 rounded hover:bg-red-50 hover:text-red-600 transition-colors bg-white"
                            title="Excluir"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-brand-blue/5 shadow-sm rounded-3xl p-12 text-center max-w-md mx-auto">
            <h3 className="font-display font-bold text-lg text-brand-blue-dark mb-1">Nenhum projeto cadastrado</h3>
            <p className="text-brand-gray-600 text-sm mb-6">Cadastre sua atuação parlamentar inicial.</p>
            <button onClick={handleOpenNew} className="btn-primary inline-flex items-center gap-2">
              <Plus size={16} /> Cadastrar Primeiro Projeto
            </button>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
