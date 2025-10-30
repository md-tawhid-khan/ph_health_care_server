import {v2 as cloudinary} from 'cloudinary' ;
import config from '../config';
import fs from 'fs'

// ---------------------------



// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name:config.clouninary_app_name!,
  api_key:config.cloudinary_api_key!,
  api_secret:config.cloudinary_api_secret!
});

// Log the configuration
// console.log(cloudinary.config());

/////////////////////////
// Uploads an image file
/////////////////////////

export const uploadVedio = async (vedioPath:string) => {
    
    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions

    const options = {
      
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(vedioPath, {resource_type: "video", ...options});
      fs.unlinkSync(vedioPath) ;
      return result. secure_url;
    } catch (error) {
      console.error(error);
    }
};

// ---------------------
