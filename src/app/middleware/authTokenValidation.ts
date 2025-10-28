import status from "http-status";
import { verifyToken } from "../../helper/jwtHelpers";
import catchAsync from "../../shared/catchAsync";
import apiError from "../errors/apiError";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";

const authTokenValidation=(...userRoles:string[])=>{
    return catchAsync(async(req,res,next)=>{
       const  token=req.headers.authorization ;
       if(!token){
        throw new apiError(status.UNAUTHORIZED,"You are not authorized !!!") ;
       };

      const verifiedUser=verifyToken(token,config.jwt_access_secret!) as JwtPayload;

     
      
      if(userRoles && !userRoles.includes(verifiedUser.role )){
           throw new apiError(status.FORBIDDEN,"forbidden") ;
      }

      next()

    } 
 )

}

export default authTokenValidation ;