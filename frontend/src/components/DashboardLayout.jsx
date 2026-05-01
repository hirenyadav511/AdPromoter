import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  LayoutDashboard, 
  Megaphone, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Sun,
  Moon
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Campaigns', href: '/campaigns', icon: Megaphone },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Billing', href: '/pricing', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 flex transform transition-transform duration-300 lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-900 pt-5 pb-4">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex flex-shrink-0 items-center px-4">
            <span className="text-2xl font-black text-indigo-600">AdPromoter</span>
          </div>
          <div className="mt-5 h-0 flex-1 overflow-y-auto">
            <nav className="space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center rounded-md px-2 py-2 text-base font-medium ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'}`}
                  >
                    <item.icon className={`mr-4 h-6 w-6 flex-shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between w-full">
              <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={handleLogout} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-6">
              <span className="text-2xl font-black text-indigo-600">AdPromoter</span>
            </div>
            <nav className="mt-8 flex-1 space-y-1 bg-white dark:bg-gray-900 px-3">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'}`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 dark:border-gray-800 p-4">
            <div className="group block w-full flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.name}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
                      {user?.subscriptionPlan && user?.subscriptionPlan !== 'none' && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                          user.subscriptionPlan === 'Premium' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          user.subscriptionPlan === 'Pro' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {user.subscriptionPlan}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={toggleTheme} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                  <button onClick={handleLogout} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" title="Logout">
                    <LogOut size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 lg:hidden">
          <button
            type="button"
            className="border-r border-gray-200 dark:border-gray-800 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex flex-1 items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Dashboard</span>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-2">
              <button onClick={toggleTheme} className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="rounded-full bg-white dark:bg-gray-800 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="hidden lg:flex lg:items-center lg:justify-between lg:px-8 lg:mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 capitalize">{location.pathname.substring(1) || 'Dashboard'}</h1>
              <div className="flex items-center space-x-4">
                <button onClick={toggleTheme} className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                <button className="rounded-full bg-white dark:bg-gray-800 p-1 text-gray-400 hover:text-gray-500">
                  <Bell className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
