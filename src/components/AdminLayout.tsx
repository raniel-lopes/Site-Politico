import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Newspaper, 
  FileText, 
  Mail, 
  Lightbulb, 
  AlertTriangle, 
  LogOut, 
  Globe, 
  Menu, 
  X,
  UserCheck
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ name: string; username: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userStr = localStorage.getItem('adminUser');
    
    if (!token || !userStr) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      navigate('/admin/login');
      return;
    }

    try {
      setAdminUser(JSON.parse(userStr));
    } catch (e) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Notícias', path: '/admin/noticias', icon: Newspaper },
    { label: 'Projetos', path: '/admin/projetos', icon: FileText },
    { label: 'Mensagens de Contato', path: '/admin/mensagens', icon: Mail },
    { label: 'Sugestões de Emenda', path: '/admin/sugestoes', icon: Lightbulb },
    { label: 'Denúncias', path: '/admin/denuncias', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-brand-gray-100 flex flex-col lg:flex-row">
      
      {/* Mobile Top Bar */}
      <header className="lg:hidden bg-brand-blue-dark text-white px-6 py-4 flex items-center justify-between shadow-md">
        <span className="font-display font-bold text-lg tracking-tight">Painel Mandato</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 focus:outline-none">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-brand-blue-dark text-white border-r border-brand-blue/10 flex flex-col z-30 transform lg:transform-none lg:static transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Brand Header */}
        <div className="px-6 py-6 border-b border-white/5 flex flex-col gap-1">
          <span className="font-display font-extrabold text-xl tracking-tight text-gradient bg-gradient-to-r from-white to-brand-pink-light">
            CMS Mandato
          </span>
          <span className="text-[10px] uppercase tracking-wider text-brand-pink-vibrant font-semibold font-sans">
            Painel de Controle
          </span>
        </div>

        {/* User Card */}
        {adminUser && (
          <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center gap-3">
            <div className="p-2 bg-brand-pink/20 rounded-full text-brand-pink-vibrant shrink-0">
              <UserCheck size={18} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white/90 truncate">{adminUser.name}</span>
              <span className="text-xs text-white/40 truncate">@{adminUser.username}</span>
            </div>
          </div>
        )}

        {/* Menu Links */}
        <nav className="flex-grow px-4 py-6 flex flex-col gap-1 font-sans font-medium text-sm">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active 
                    ? 'bg-brand-pink text-white shadow-md' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/5 flex flex-col gap-1">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium"
          >
            <Globe size={18} className="text-brand-pink-vibrant" />
            Visualizar Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col p-6 lg:p-10 overflow-x-hidden min-w-0">
        {children}
      </main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-brand-blue-dark/50 z-20 lg:hidden"
        ></div>
      )}

    </div>
  );
}
