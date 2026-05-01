import express from 'express';
import { processDemoPayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route: POST /api/payment/demo-success
// Private route - user must be logged in
router.post('/demo-success', protect, processDemoPayment);

export default router;
