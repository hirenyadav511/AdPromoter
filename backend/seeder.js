import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Campaign from './models/Campaign.js';
import connectDB from './config/db.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Campaign.deleteMany();

    console.log('Data Cleared...');

    // Create Admin
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    
    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@adpromoter.com',
      password: adminPassword,
      role: 'admin',
    });

    // Create Test Users
    const userPassword = await bcrypt.hash('user123', salt);
    
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: userPassword,
      subscriptionPlan: 'Pro',
      paymentStatus: 'completed',
    });

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: userPassword,
      subscriptionPlan: 'Basic',
      paymentStatus: 'completed',
    });

    console.log('Users Created...');

    // Create Sample Campaigns
    const campaigns = [
      {
        user: user1._id,
        title: 'Summer Sale 2024',
        description: 'Big discounts on all summer apparel.',
        mediaUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=400',
        platform: 'Instagram',
        budget: 500,
        duration: 30,
        status: 'approved',
      },
      {
        user: user1._id,
        title: 'New Product Launch',
        description: 'Introducing our latest eco-friendly sneakers.',
        mediaUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
        platform: 'Facebook',
        budget: 1200,
        duration: 15,
        status: 'pending',
      },
      {
        user: user2._id,
        title: 'Coffee Shop Promo',
        description: 'Buy one get one free every Monday.',
        mediaUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400',
        platform: 'Google',
        budget: 300,
        duration: 7,
        status: 'approved',
      }
    ];

    await Campaign.insertMany(campaigns);

    console.log('Campaigns Seeded!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
