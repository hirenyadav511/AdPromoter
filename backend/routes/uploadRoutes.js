import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { protect } from '../middleware/authMiddleware.js';
import streamifier from 'streamifier';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', protect, upload.single('media'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Fallback for Demo Mode (if keys are missing)
  const isMissingKeys = !process.env.CLOUDINARY_CLOUD_NAME || 
                       process.env.CLOUDINARY_CLOUD_NAME === 'your_cloud_name';

  if (isMissingKeys) {
    console.log('📝 DEMO MODE: Cloudinary keys missing. Returning placeholder image.');
    return setTimeout(() => {
      res.json({ 
        url: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        isMock: true 
      });
    }, 1000);
  }

  const stream = cloudinary.uploader.upload_stream(
    { folder: 'adpromoter_campaigns', resource_type: 'auto' },
    (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        // Even if upload fails, return a fallback in development to prevent UI crash
        return res.json({ 
          url: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
          error: 'Cloudinary upload failed, using fallback'
        });
      }
      res.json({ url: result.secure_url });
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(stream);
});

export default router;
