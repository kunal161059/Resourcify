export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? '',
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ?? '',
  apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
};

// Validation
if (!cloudinaryConfig.cloudName || !cloudinaryConfig.uploadPreset) {
  console.error('Missing Cloudinary configuration:', {
    hasCloudName: !!cloudinaryConfig.cloudName,
    hasUploadPreset: !!cloudinaryConfig.uploadPreset,
  });
} 