import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { Users, Megaphone, CheckCircle, Clock } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white border border-gray-200 rounded p-4 flex items-center">
    <div className={`p-3 rounded-full mr-4 ${colorClass}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/admin/stats');
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <AdminLayout><div className="p-4">Loading stats...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={Users}
          colorClass="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Premium Users"
          value={stats?.premiumUsers || 0}
          icon={CheckCircle}
          colorClass="bg-green-100 text-green-600"
        />
        <StatCard
          title="Total Campaigns"
          value={stats?.totalCampaigns || 0}
          icon={Megaphone}
          colorClass="bg-purple-100 text-purple-600"
        />
        <StatCard
          title="Pending Approval"
          value={stats?.pendingCampaigns || 0}
          icon={Clock}
          colorClass="bg-yellow-100 text-yellow-600"
        />
      </div>

      <div className="bg-white border border-gray-200 rounded p-6">
        <h3 className="text-lg font-semibold border-b pb-2 mb-4">Welcome to Admin Portal</h3>
        <p className="text-gray-600">
          Use the sidebar to navigate through the system. You can view all registered users and their current subscription status in the <strong>Users</strong> tab. You can approve or reject new advertisements in the <strong>Campaigns</strong> tab.
        </p>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
