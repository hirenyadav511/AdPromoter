import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'missing_cloud_name',
  api_key: process.env.CLOUDINARY_API_KEY || 'missing_api_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'missing_api_secret',
});

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.warn('⚠️ WARNING: Cloudinary credentials are missing. File uploads will not work.');
}

export default cloudinary;
