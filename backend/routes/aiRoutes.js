import express from 'express';
import { generateCampaignContent } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route to generate campaign text using Gemini AI
router.post('/generate-campaign', protect, generateCampaignContent);

export default router;
