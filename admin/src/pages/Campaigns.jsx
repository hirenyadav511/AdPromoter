import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AdminLayout from '../components/AdminLayout';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {[...Array(5)].map((_, i) => (
      <td key={i} className="px-6 py-4"><div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full"></div></td>
    ))}
  </tr>
);

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/admin/campaigns?page=${page}&status=${filter}&limit=10`);
      setCampaigns(data.campaigns);
      setPages(data.pages);
      setTotal(data.total);
    } catch (error) {
      console.error('Failed to fetch campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [page, filter]);

  const handleStatusUpdate = async (id, status) => {
    // Instant UI update for better sync experience
    const previousCampaigns = [...campaigns];
    setCampaigns(campaigns.map(c => c._id === id ? { ...c, status } : c));

    try {
      const { data } = await axios.put(`/admin/campaigns/${id}/status`, { status });
      console.log('📊 Status update response:', data);
      toast.success(`Campaign marked as ${status}`);
      fetchCampaigns(); // Sync with server
    } catch (error) {
      setCampaigns(previousCampaigns); // Rollback on error
      toast.error('Failed to update status');
    }
  };

  const filteredCampaigns = campaigns.filter(camp => {
    if (filter === 'all') return true;
    return camp.status === filter;
  });

  return (
    <AdminLayout>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">Campaign moderation ({total})</h3>
          <select
            className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 bg-white"
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setPage(1); }}
          >
            <option value="all">All Campaigns</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400">Campaign Details</th>
                <th className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400">User Info</th>
                <th className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400">Platform/Budget</th>
                <th className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {loading ? (
                [...Array(10)].map((_, i) => <SkeletonRow key={i} />)
              ) : filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No campaigns found.</td>
                </tr>
              ) : (
                filteredCampaigns.map((camp) => (
                  <tr key={camp._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img src={camp.mediaUrl} alt="ad" className="h-10 w-10 object-cover border dark:border-gray-700 rounded" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{camp.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 w-48 truncate">{camp.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900 dark:text-gray-200 font-medium">{camp.user?.name}</p>
                      <p className="text-gray-500 dark:text-gray-500 text-xs">{camp.user?.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900 dark:text-gray-200">{camp.platform}</p>
                      <p className="text-gray-500 dark:text-gray-500 text-xs">${camp.budget} / {camp.duration} Days</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        camp.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        camp.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {camp.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        disabled={camp.status === 'approved'}
                        onClick={() => handleStatusUpdate(camp._id, 'approved')}
                        className={`px-3 py-1 rounded text-xs transition-colors ${
                          camp.status === 'approved' 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800' 
                            : 'bg-green-600 text-white hover:bg-green-700 shadow-sm shadow-green-500/20'
                        }`}
                      >
                        Approve
                      </button>
                      <button
                        disabled={camp.status === 'rejected'}
                        onClick={() => handleStatusUpdate(camp._id, 'rejected')}
                        className={`px-3 py-1 rounded text-xs transition-colors ${
                          camp.status === 'rejected' 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800' 
                            : 'bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-500/20'
                        }`}
                      >
                        Reject
                      </button>
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
              Showing <span className="font-medium">{(page - 1) * 10 + 1}</span> to <span className="font-medium">{Math.min(page * 10, total)}</span> of <span className="font-medium">{total}</span> campaigns
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

export default Campaigns;
