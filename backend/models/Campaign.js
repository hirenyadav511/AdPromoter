import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Please add a campaign title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a campaign description'],
  },
  mediaUrl: {
    type: String,
    required: [true, 'Please upload a media file'],
  },
  platform: {
    type: String,
    required: [true, 'Please select a platform'],
    enum: ['Google', 'Facebook', 'Instagram', 'Twitter', 'LinkedIn'],
  },
  budget: {
    type: Number,
    required: [true, 'Please add a budget'],
  },
  duration: {
    type: Number, // duration in days
    required: [true, 'Please add campaign duration in days'],
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, { timestamps: true });

// Indexes for faster filtering and user lookups
campaignSchema.index({ user: 1 });
campaignSchema.index({ status: 1 });

const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;
