import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Save, X, RefreshCw, AlertCircle } from 'lucide-react';
import { apiFetch } from '../utils/api.js';
import AdminLayout from '../components/AdminLayout.js';
import SEO from '../components/SEO.js';

export default function AdminNews() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Editor State
  const [editorOpen, setEditorOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Atuação');
  const [image, setImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const loadNews = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/news?limit=100');
      setNews(data.news || []);
    } catch (err) {
      console.error('Falha ao carregar notícias no painel:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleOpenNew = () => {
    setCurrentArticle(null);
    setTitle('');
    setSummary('');
    setContent('');
    setCategory('Atuação');
    setImage('');
    setErrorMessage('');
    setEditorOpen(true);
  };

  const handleOpenEdit = (article: any) => {
    setCurrentArticle(article);
    setTitle(article.title);
    setSummary(article.summary);
    setContent(article.content);
    setCategory(article.category);
    setImage(article.image || '');
    setErrorMessage('');
    setEditorOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Standard reader to convert image to base64 string
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage('');

    try {
      const payload = { title, summary, content, category, image, author: 'Assessoria' };
      if (currentArticle) {
        // Update
        await apiFetch(`/news/${currentArticle.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
      } else {
        // Create
        await apiFetch('/news', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
      }
      setEditorOpen(false);
      loadNews();
    } catch (err: any) {
      setErrorMessage(err.message || 'Falha ao salvar notícia.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta notícia permanentemente?')) return;

    try {
      await apiFetch(`/news/${id}`, { method: 'DELETE' });
      loadNews();
    } catch (err: any) {
      alert(err.message || 'Falha ao excluir notícia.');
    }
  };

  return (
    <AdminLayout>
      <SEO title="Painel Admin - Gerenciar Notícias" />

      <div className="flex flex-col gap-8 flex-grow">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-extrabold text-brand-blue-dark">Gerenciar Notícias</h1>
            <p className="text-sm text-brand-gray-600">Publique reportagens e posicionamentos oficiais do mandato.</p>
          </div>
          <button 
            onClick={handleOpenNew}
            className="btn-primary flex items-center gap-2 font-semibold !py-2.5"
          >
            <Plus size={18} /> Nova Notícia
          </button>
        </div>

        {/* Editor Form Modal Overlay */}
        {editorOpen && (
          <div className="fixed inset-0 bg-brand-blue-dark/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 md:p-8 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-brand-blue/15 shadow-2xl relative">
              <button 
                onClick={() => setEditorOpen(false)}
                className="absolute top-5 right-5 p-1 bg-brand-gray-100 hover:bg-brand-gray-200 text-brand-gray-600 rounded-full transition-colors"
              >
                <X size={18} />
              </button>

              <h3 className="font-display font-extrabold text-xl text-brand-blue-dark mb-6">
                {currentArticle ? 'Editar Notícia' : 'Publicar Nova Notícia'}
              </h3>

              <form onSubmit={handleSave} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 bg-red-50 text-red-800 text-sm font-semibold rounded-lg border border-red-200 flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Title & Category */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Título da Matéria</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ex: Inauguração da Nova Sede"
                      className="w-full px-4 py-2.5 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Categoria</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue bg-white"
                    >
                      <option value="Tecnologia Ativa">Tecnologia Ativa</option>
                      <option value="Direitos e Inclusão">Direitos e Inclusão</option>
                      <option value="Atuação">Atuação</option>
                      <option value="Segurança">Segurança</option>
                      <option value="Geral">Geral</option>
                    </select>
                  </div>
                </div>

                {/* Summary */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Resumo / Linha Fina (Opener)</label>
                  <input
                    type="text"
                    required
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Um pequeno resumo de 1-2 linhas sobre a notícia."
                    className="w-full px-4 py-2.5 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue"
                  />
                </div>

                {/* Image Upload */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Foto de Capa</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="text-xs text-brand-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-brand-blue-light/50 file:text-brand-blue hover:file:bg-brand-blue-light"
                    />
                    {image && (
                      <img 
                        src={image} 
                        alt="Preview" 
                        className="w-16 h-12 object-cover rounded border border-brand-gray-200" 
                      />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Texto da Notícia (Rich Text / Markdown)</label>
                  <textarea
                    required
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escreva a notícia em detalhes. Você pode usar subtítulos começando com '### ' e citações começando com '> ' para formatação especial."
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
                    {saving ? 'Salvando...' : 'Salvar Matéria'}
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
        ) : news.length > 0 ? (
          <div className="bg-white border border-brand-blue/5 shadow-sm rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-brand-gray-600">
                <thead className="bg-brand-gray-50 font-display font-bold text-brand-blue-dark text-xs uppercase tracking-wider border-b border-brand-gray-200">
                  <tr>
                    <th className="px-6 py-4">Imagem</th>
                    <th className="px-6 py-4">Título</th>
                    <th className="px-6 py-4">Categoria</th>
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-gray-200">
                  {news.map((item) => (
                    <tr key={item.id} className="hover:bg-brand-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <img 
                          src={item.image || 'https://via.placeholder.com/150x100.png?text=Noticia'} 
                          alt="Thumb" 
                          className="w-12 h-9 object-cover rounded border border-brand-gray-200" 
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-brand-blue-dark max-w-sm truncate">
                        {item.title}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-brand-blue-light/50 text-brand-blue text-xs font-bold rounded">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        {new Date(item.createdAt).toLocaleDateString('pt-BR')}
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
            <h3 className="font-display font-bold text-lg text-brand-blue-dark mb-1">Nenhuma notícia registrada</h3>
            <p className="text-brand-gray-600 text-sm mb-6">Comece preenchendo o formulário de publicações.</p>
            <button onClick={handleOpenNew} className="btn-primary inline-flex items-center gap-2">
              <Plus size={16} /> Escrever Primeiro Artigo
            </button>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
