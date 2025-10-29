import dotenv from 'dotenv' ;
import path from 'path';


dotenv.config({ path:path.join(process.cwd(),'.env')}) ;

export default {
    env:process.env.NODE_ENV ,
    port: process.env.PORT,
    jwt_access_secret:process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret:process.env.JWT_REFRESH_SECRET,
    jwt_access_expire_in:process.env.JWT_ACCESS_EXPIRED_IN,
    jwt_refresh_expire_in:process.env.JWT_REFRESFH_EXPIRED_IN,
    jwt_reset_password_secret:process.env.JWT_RESET_PASSWORD_SECRET,
    jwt_reset_password_token_expire_in:process.env.JWT_RESET_PASSWORD_TOKEN_EXPIRED_IN,
    reset_password_link:process.env.RESET_PASSWORD_LINK,
    emailSender:{
        email:process.env.EMAIL,
        app_password:process.env.APP_PASSWORD
    },
   clouninary_app_name:process.env.CLOUDINARY_APP_NAME,
   cloudinary_api_key:process.env.CLOUDINARY_API_KEY,
   cloudinary_api_secret:process.env.CLOUDINARY_API_SECRET
} ;