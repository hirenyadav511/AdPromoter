import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import DashboardLayout from '../components/DashboardLayout';
import Skeleton from '../components/Skeleton';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Calendar, CreditCard } from 'lucide-react';

const StatCard = ({ title, value }) => (
  <div className="border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 p-4 shadow-sm">
    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">{title}</div>
    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/dashboard/stats');
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const { overviewStats, graphData, recentActivity } = stats;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Overview</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Welcome, {user?.name}</span>
          </div>
        </div>

        {/* Subscription Status Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">Your Active Plan</p>
                <h3 className="text-3xl font-bold mt-1">
                  {user?.subscriptionPlan === 'none' ? 'Free Plan' : `${user?.subscriptionPlan} Subscription`}
                </h3>
                <div className="flex items-center mt-4 space-x-4">
                  <div className="flex items-center text-sm bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
                    <ShieldCheck size={16} className="mr-2" />
                    <span>Status: {user?.paymentStatus === 'completed' ? 'Active' : 'Inactive'}</span>
                  </div>
                  {user?.expiryDate && (
                    <div className="flex items-center text-sm bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
                      <Calendar size={16} className="mr-2" />
                      <span>Expires: {new Date(user.expiryDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden sm:block bg-white/10 p-4 rounded-2xl backdrop-blur-xl border border-white/20">
                <CreditCard size={40} className="text-white" />
              </div>
            </div>
          </div>
          
          {/* Quick Plan Badge */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
            <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-3 ${
              user?.subscriptionPlan === 'Premium' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
              user?.subscriptionPlan === 'Pro' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
              'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}>
              <ShieldCheck size={32} />
            </div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100">{user?.subscriptionPlan || 'Free'} Member</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Verified Account</p>
          </div>
        </div>

        
        {/* Overview Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Active Campaigns" value={overviewStats.activeCampaigns} />
          <StatCard title="Total Clicks" value={overviewStats.totalClicks.toLocaleString()} />
          <StatCard title="Total Impressions" value={overviewStats.totalImpressions.toLocaleString()} />
          <StatCard title="Avg. CTR" value={`${overviewStats.clickThroughRate}%`} />
        </div>

        {/* Chart and Activity Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Chart */}
          <div className="border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 p-4 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-800 dark:text-gray-200">Weekly Performance</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={graphData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="impressions" fill="#93c5fd" name="Impressions" />
                  <Bar dataKey="clicks" fill="#2563eb" name="Clicks" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 p-4 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-800 dark:text-gray-200">Recent Activity</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">
                  <th className="pb-2 font-medium">Activity</th>
                  <th className="pb-2 font-medium text-right">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((event) => (
                  <tr key={event.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                    <td className="py-3 flex items-center">
                      <span className="text-gray-900 dark:text-gray-200 font-medium">{event.action}</span>
                      {event.action.includes('Approved') && <span className="ml-2 px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">LIVE</span>}
                      {event.action.includes('Rejected') && <span className="ml-2 px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">X</span>}
                    </td>
                    <td className="py-3 text-right text-gray-500 dark:text-gray-500">{event.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
