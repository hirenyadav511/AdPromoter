import express from 'express';
import {
  getAllUsers,
  getAllCampaigns,
  updateCampaignStatus,
  getAdminStats
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected and require admin role
router.use(protect, admin);

router.get('/users', getAllUsers);
router.get('/campaigns', getAllCampaigns);
router.put('/campaigns/:id/status', updateCampaignStatus);
router.get('/stats', getAdminStats);

export default router;
