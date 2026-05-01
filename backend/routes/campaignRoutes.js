import express from 'express';
import {
  createCampaign,
  getCampaigns,
  updateCampaign,
  deleteCampaign,
} from '../controllers/campaignController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCampaign)
  .get(protect, getCampaigns);

// Explicit route for user's own campaigns
router.get('/my', protect, getCampaigns);

router.route('/:id')
  .put(protect, updateCampaign)
  .delete(protect, deleteCampaign);

export default router;
