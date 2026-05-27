import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      const token = generateToken(user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscriptionPlan: user.subscriptionPlan,
        paymentStatus: user.paymentStatus,
        expiryDate: user.expiryDate,
        token,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔑 Attempting login for:', email);

    // 1. HARDCODED ADMIN CHECK (Not stored in database)
    if (email === 'admin@adpromoter.com' && password === 'admin123') {
      console.log('👑 Admin Login (Hardcoded Success)');
      const adminId = 'admin_hardcoded_id';
      const token = generateToken(adminId);
      return res.json({
        _id: adminId,
        name: 'System Admin',
        email: 'admin@adpromoter.com',
        role: 'admin',
        token,
      });
    }

    // 2. NORMAL USER LOGIN (Fetch from database)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log('❌ Login failed: User not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);

    if (isMatch) {
      console.log('🎉 User Login Success:', email);
      const token = generateToken(user._id);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscriptionPlan: user.subscriptionPlan,
        paymentStatus: user.paymentStatus,
        expiryDate: user.expiryDate,
        token,
      });
    } else {
      console.log('❌ Login failed: Incorrect password');
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('🔥 Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Public
export const getUserProfile = async (req, res) => {
  try {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(200).json(null);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Handle hardcoded admin profile
    if (decoded.userId === 'admin_hardcoded_id') {
      return res.json({
        _id: 'admin_hardcoded_id',
        name: 'System Admin',
        email: 'admin@adpromoter.com',
        role: 'admin',
      });
    }

    const user = await User.findById(decoded.userId);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscriptionPlan: user.subscriptionPlan,
        paymentStatus: user.paymentStatus,
        expiryDate: user.expiryDate,
      });
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    res.status(200).json(null);
  }
};

// @desc    Direct Change Password (simplified for demo)
// @route   POST /api/auth/forgotpassword
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // Return 404 so frontend knows email is wrong
      return res.status(404).json({ message: 'No account found with this email.' });
    }

    // Direct password update
    user.password = password;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Reset Password
// @route   PUT /api/auth/resetpassword/:token
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful. Please log in.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
