import mongoose from 'mongoose';
import Campaign from '../models/Campaign.js';

// @desc    Create a new campaign
// @route   POST /api/campaigns
// @access  Private
export const createCampaign = async (req, res) => {
  try {
    // 1. Block Admin from creating campaigns
    if (req.user.role === 'admin') {
      return res.status(403).json({ message: 'Admin cannot create campaigns' });
    }

    // 2. Validate user ID
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).json({ message: 'Invalid User ID' });
    }

    const { title, description, mediaUrl, platform, budget, duration } = req.body;

    const campaign = await Campaign.create({
      user: req.user._id,
      title,
      description,
      mediaUrl,
      platform,
      budget,
      duration,
    });

    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get user campaigns
// @route   GET /api/campaigns
// @access  Private
export const getCampaigns = async (req, res) => {
  try {
    console.log('🔍 Fetching campaigns for User ID:', req.user._id);

    // Validate user ID before querying (Prevents CastError for hardcoded admin)
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.json({ campaigns: [], page: 1, pages: 1, total: 0 });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Campaign.countDocuments({ user: req.user._id });
    const campaigns = await Campaign.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    console.log(`✅ Found ${campaigns.length} campaigns for this user.`);

    res.json({
      campaigns,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    console.error('❌ Error fetching user campaigns:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update campaign
// @route   PUT /api/campaigns/:id
// @access  Private
export const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Make sure user owns campaign
    if (campaign.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update' });
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    );

    res.json(updatedCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete campaign
// @route   DELETE /api/campaigns/:id
// @access  Private
export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Make sure user owns campaign
    if (campaign.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete' });
    }

    await campaign.deleteOne();
    res.json({ message: 'Campaign removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
