import multer from "multer"
import path from "path"
import {v2 as cloudinary} from 'cloudinary'
import 'dotenv/config'
import config from "../config"
import fs from 'fs'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(process.cwd(),'uploads'))
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

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

export const uploadImage = async (imagePath:string) => {
    
    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      fs.unlinkSync(imagePath) ;
      return result. secure_url;
    } catch (error) {
      console.error(error);
    }
};
// ---------------------

export default upload ;
