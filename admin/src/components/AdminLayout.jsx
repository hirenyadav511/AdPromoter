import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LayoutDashboard, Users, Megaphone, LogOut, Sun, Moon } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const nav = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Campaigns', path: '/campaigns', icon: Megaphone },
  ];

  return (
    <div className={`flex h-screen bg-gray-100 dark:bg-gray-950 font-sans ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-blue-500">AdPromoter</h1>
          <p className="text-xs text-gray-400">Admin Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {nav.map((item) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded ${
                  active ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-800 flex items-center justify-between">
          <div className="text-sm">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-gray-400 text-xs">Administrator</p>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={toggleTheme} className="text-gray-400 hover:text-white">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={logout} className="text-gray-400 hover:text-white">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 capitalize">
            {location.pathname.split('/')[1] || 'Dashboard'}
          </h2>
          <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>
        <div className="flex-1 overflow-auto p-6 bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
