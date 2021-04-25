import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function uploadImageToCloudinary(
  file: Express.Multer.File
): Promise<cloudinary.UploadApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream(
        {
          folder: '/aktivity',
          transformation: {
            width: 2048,
            height: 2048,
            crop: 'limit',
            quality: 80,
          },
        },
        function (error, response) {
          if (error) {
            reject(error);
          }
          resolve(response!);
        }
      )
      .end(file.buffer);
  });
}
