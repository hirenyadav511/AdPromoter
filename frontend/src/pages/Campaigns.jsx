import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';
import DashboardLayout from '../components/DashboardLayout';
import Skeleton from '../components/Skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  withCredentials: true
});

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/campaigns/my?page=${page}&limit=5`);
      setCampaigns(data.campaigns);
      setPages(data.pages);
      setTotal(data.total);
    } catch (error) {
      toast.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();

    // Listen for real-time updates from admin
    socket.on('campaignUpdated', (data) => {
      console.log('🔄 Campaign updated in real-time:', data);
      fetchCampaigns();
    });

    return () => {
      socket.off('campaignUpdated');
    };
  }, [page]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        await axios.delete(`/campaigns/${id}`);
        toast.success('Campaign deleted');
        if (campaigns.length === 1 && page > 1) {
          setPage(page - 1);
        } else {
          fetchCampaigns();
        }
      } catch (error) {
        toast.error('Failed to delete campaign');
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Your Campaigns</h2>
        <Link
          to="/campaigns/new"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700"
        >
          + Create Campaign
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <th className="p-4 font-medium text-gray-900 dark:text-gray-100">Title</th>
              <th className="p-4 font-medium text-gray-900 dark:text-gray-100">Platform</th>
              <th className="p-4 font-medium text-gray-900 dark:text-gray-100">Budget</th>
              <th className="p-4 font-medium text-gray-900 dark:text-gray-100">Status</th>
              <th className="p-4 font-medium text-gray-900 dark:text-gray-100">Date & Time</th>
              <th className="p-4 font-medium text-gray-900 dark:text-gray-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-10 w-10" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </td>
                  <td className="p-4"><Skeleton className="h-4 w-20" /></td>
                  <td className="p-4"><Skeleton className="h-4 w-16" /></td>
                  <td className="p-4"><Skeleton className="h-6 w-20" /></td>
                  <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                  <td className="p-4 text-right"><Skeleton className="h-4 w-12 ml-auto" /></td>
                </tr>
              ))
            ) : campaigns.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No campaigns found. Create one to get started!
                </td>
              </tr>
            ) : (
              campaigns.map((camp) => (
                <tr key={camp._id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="p-4 text-gray-900 dark:text-gray-100 font-medium">
                    <div className="flex items-center space-x-3">
                      {camp.mediaUrl && (
                        <img src={camp.mediaUrl} alt={camp.title} className="h-10 w-10 rounded object-cover border border-gray-200 dark:border-gray-700" />
                      )}
                      <span>{camp.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{camp.platform}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">${camp.budget}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      camp.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      camp.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {camp.status.charAt(0).toUpperCase() + camp.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400 text-xs">
                    {new Date(camp.createdAt).toLocaleString(undefined, { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleDelete(camp._id)}
                      className="text-red-600 hover:underline text-xs font-medium dark:text-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        {/* Pagination UI */}
        {!loading && pages > 1 && (
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium">{(page - 1) * 5 + 1}</span> to <span className="font-medium">{Math.min(page * 5, total)}</span> of <span className="font-medium">{total}</span> results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1 rounded border border-gray-300 dark:border-gray-700 disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm font-medium">{page} / {pages}</span>
              <button
                onClick={() => setPage(p => Math.min(pages, p + 1))}
                disabled={page === pages}
                className="p-1 rounded border border-gray-300 dark:border-gray-700 disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;
