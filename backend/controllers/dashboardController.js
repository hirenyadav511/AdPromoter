import mongoose from 'mongoose';
import Campaign from '../models/Campaign.js';

// @desc    Get user dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Validate user ID (Prevents CastError for hardcoded admin)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.json({
        overviewStats: { activeCampaigns: 0, totalClicks: 0, totalImpressions: 0, clickThroughRate: 0 },
        graphData: [],
        recentActivity: [{ id: 'none', action: 'No activity for system admin', date: '-', status: 'info' }],
      });
    }

    // 2. Get real counts from DB
    const activeCampaigns = await Campaign.countDocuments({ user: userId, status: 'approved' });
    const totalCampaigns = await Campaign.countDocuments({ user: userId });
    
    // Sum up budgets for a "Total Spend" or similar stat if needed, 
    // but we'll stick to the UI's expected fields.
    
    const overviewStats = {
      activeCampaigns: activeCampaigns,
      totalClicks: Math.floor(Math.random() * 5000), // Mocking performance stats for now as they aren't in schema
      totalImpressions: Math.floor(Math.random() * 50000),
      clickThroughRate: 2.4, 
    };

    // 2. Fetch real recent activity based on campaigns
    const campaigns = await Campaign.find({ user: userId })
      .sort({ updatedAt: -1 })
      .limit(5);

    const recentActivity = campaigns.map(camp => ({
      id: camp._id,
      action: `Campaign "${camp.title}" ${camp.status}`,
      date: new Date(camp.updatedAt).toLocaleDateString(),
      status: camp.status === 'approved' ? 'success' : camp.status === 'rejected' ? 'error' : 'warning'
    }));

    // If no campaigns, provide a default activity
    if (recentActivity.length === 0) {
      recentActivity.push({ id: 'none', action: 'No recent activity', date: '-', status: 'info' });
    }

    // Graph data remains mock for now as we don't have time-series analytics in schema
    const graphData = [
      { name: 'Mon', clicks: 400, impressions: 2400 },
      { name: 'Tue', clicks: 300, impressions: 1398 },
      { name: 'Wed', clicks: 200, impressions: 980 },
      { name: 'Thu', clicks: 278, impressions: 3908 },
      { name: 'Fri', clicks: 189, impressions: 4800 },
      { name: 'Sat', clicks: 239, impressions: 3800 },
      { name: 'Sun', clicks: 349, impressions: 4300 },
    ];

    res.json({
      overviewStats,
      graphData,
      recentActivity,
    });
  } catch (error) {
    console.error('Error fetching real dashboard stats:', error);
    res.status(500).json({ message: 'Server Error fetching dashboard stats' });
  }
};
