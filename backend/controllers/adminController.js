import User from '../models/User.js';
import Campaign from '../models/Campaign.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    const query = {
      role: 'user',
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    };

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select('name email subscriptionPlan expiryDate createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      users,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all campaigns
// @route   GET /api/admin/campaigns
// @access  Private/Admin
export const getAllCampaigns = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status || 'all';

    const query = status === 'all' ? {} : { status };

    const total = await Campaign.countDocuments(query);
    const campaigns = await Campaign.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      campaigns,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update campaign status (Approve/Reject)
// @route   PUT /api/admin/campaigns/:id/status
// @access  Private/Admin
export const updateCampaignStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    console.log(`📑 Updating campaign [${campaign._id}] status: ${campaign.status} -> ${status}`);

    campaign.status = status;
    await campaign.save();

    // Emit real-time event for frontend sync
    req.io.emit('campaignUpdated', { id: campaign._id, status });

    console.log(`✅ Campaign updated successfully: ${campaign.status}`);

    res.json(campaign);
  } catch (error) {
    console.error('❌ Error updating campaign status:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get Admin Analytics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const premiumUsers = await User.countDocuments({ subscriptionPlan: 'Premium' });
    const totalCampaigns = await Campaign.countDocuments();
    const pendingCampaigns = await Campaign.countDocuments({ status: 'pending' });

    res.json({
      totalUsers,
      premiumUsers,
      totalCampaigns,
      pendingCampaigns,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
