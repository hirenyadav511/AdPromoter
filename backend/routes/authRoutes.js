import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', getUserProfile);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:token', resetPassword);

export default router;
