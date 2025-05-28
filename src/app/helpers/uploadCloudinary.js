import cloudinary from '../../../libs/cloudinary';

export function uploadFromBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
    
    uploadStream.end(buffer);
  });
}