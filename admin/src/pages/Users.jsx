import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {[...Array(6)].map((_, i) => (
      <td key={i} className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div></td>
    ))}
  </tr>
);

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/admin/users?page=${page}&search=${searchTerm}&limit=10`);
      setUsers(data.users);
      setPages(data.pages);
      setTotal(data.total);
    } catch (error) {
      console.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [page, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <AdminLayout>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">User Directory ({total})</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search users..."
              className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-64"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400">Name</th>
                <th className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400">Email</th>
                <th className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400">Subscription Plan</th>
                <th className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400">Expiry Date</th>
                <th className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400 text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {loading ? (
                [...Array(10)].map((_, i) => <SkeletonRow key={i} />)
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No users found.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                    <td className="px-6 py-4 text-gray-900 dark:text-gray-100 font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                        !user.subscriptionPlan || user.subscriptionPlan === 'none' 
                          ? 'bg-gray-100 text-gray-500 dark:bg-gray-800' 
                          : user.subscriptionPlan === 'Premium' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30' 
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
                      }`}>
                        {!user.subscriptionPlan || user.subscriptionPlan === 'none' ? 'Free Plan' : user.subscriptionPlan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {user.expiryDate ? new Date(user.expiryDate).toLocaleDateString('en-GB') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-500 text-right">
                      {new Date(user.createdAt).toLocaleDateString('en-GB')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && pages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium">{(page - 1) * 10 + 1}</span> to <span className="font-medium">{Math.min(page * 10, total)}</span> of <span className="font-medium">{total}</span> users
            </p>
            <div className="flex space-x-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="p-1.5 rounded border border-gray-300 dark:border-gray-700 disabled:opacity-50 dark:text-gray-300"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                disabled={page === pages}
                onClick={() => setPage(p => p + 1)}
                className="p-1.5 rounded border border-gray-300 dark:border-gray-700 disabled:opacity-50 dark:text-gray-300"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;
