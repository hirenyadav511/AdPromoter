import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

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
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscriptionPlan: user.subscriptionPlan,
        paymentStatus: user.paymentStatus,
        expiryDate: user.expiryDate,
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
      generateToken(res, adminId);
      return res.json({
        _id: adminId,
        name: 'System Admin',
        email: 'admin@adpromoter.com',
        role: 'admin',
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
      generateToken(res, user._id);
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
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Handle hardcoded admin profile
    if (req.user._id === 'admin_hardcoded_id') {
      res.json({
        _id: 'admin_hardcoded_id',
        name: 'System Admin',
        email: 'admin@adpromoter.com',
        role: 'admin',
      });
      return;
    }

    const user = await User.findById(req.user._id);

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
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
