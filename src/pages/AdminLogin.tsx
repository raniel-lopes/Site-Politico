import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle } from 'lucide-react';
import { apiFetch } from '../utils/api.js';
import SEO from '../components/SEO.js';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Falha ao autenticar. Verifique o usuário e a senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Painel Admin - Login" />

      <div className="min-h-screen bg-brand-gray-100 flex items-center justify-center px-4 py-12">
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-brand-blue/5 shadow-2xl w-full max-w-md">
          
          {/* Header */}
          <div className="text-center mb-8 flex flex-col items-center gap-2">
            <div className="p-3 bg-brand-blue-dark text-white rounded-2xl w-fit">
              <ShieldCheck size={28} />
            </div>
            <h2 className="font-display font-extrabold text-2xl text-brand-blue-dark">Gabinete Digital</h2>
            <p className="text-xs font-semibold text-brand-gray-600 uppercase tracking-widest">Painel Administrativo</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="p-4 bg-red-50 text-red-800 text-sm font-semibold rounded-lg border border-red-200 flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Usuário</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-gray-600" />
                <input
                  type="text"
                  id="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nome de usuário"
                  className="w-full pl-12 pr-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">Senha</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-gray-600" />
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha de acesso"
                  className="w-full pl-12 pr-4 py-3 border border-brand-gray-300 rounded-lg text-sm outline-none focus:border-brand-blue transition-colors"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Acessar Painel'}
            </button>

          </form>

        </div>
      </div>
    </>
  );
}
