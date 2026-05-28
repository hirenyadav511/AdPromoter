import User from '../models/User.js';

// @desc    Process demo payment and update subscription
// @route   POST /api/payment/demo-success
// @access  Private
export const processDemoPayment = async (req, res) => {
  try {
    const { plan } = req.body;
    console.log('💳 Payment Request received for plan:', plan);
    console.log('👤 User ID from token:', req.user._id);

    // 1. Validate plan
    if (!['Basic', 'Pro', 'Premium'].includes(plan)) {
      return res.status(400).json({ message: 'Invalid subscription plan selected' });
    }

    // 2. Find user (Select password to avoid validation issues on .save())
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      console.log('❌ User not found in database');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('✅ User found before update:', user.email);

    // 3. Calculate expiry date based on plan
    const expiryDate = new Date();
    if (plan === 'Basic') {
      expiryDate.setDate(expiryDate.getDate() + 7);
    } else if (plan === 'Pro') {
      expiryDate.setDate(expiryDate.getDate() + 15);
    } else if (plan === 'Premium') {
      expiryDate.setDate(expiryDate.getDate() + 30);
    }

    // 4. Update fields
    user.subscriptionPlan = plan;
    user.paymentStatus = 'completed';
    user.expiryDate = expiryDate;
    user.subscriptionStartDate = new Date();

    // 5. Save to database
    await user.save();

    console.log('🚀 User updated successfully:', {
      plan: user.subscriptionPlan,
      status: user.paymentStatus,
      expiry: user.expiryDate
    });

    res.status(200).json({
      message: 'Payment Successful! Subscription updated.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        subscriptionPlan: user.subscriptionPlan,
        paymentStatus: user.paymentStatus,
        expiryDate: user.expiryDate,
        subscriptionStartDate: user.subscriptionStartDate,
      }
    });
  } catch (error) {
    console.error('❌ Error in demo payment:', error);
    res.status(500).json({ 
      message: 'Server Error processing payment', 
      error: error.message 
    });
  }
};
