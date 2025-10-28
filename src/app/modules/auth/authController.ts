
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { authServices } from "./authServices";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const loginUser =catchAsync(async(req:Request,res:Response)=>{

       const {refreshToken,accessToken,isPasswordChange}= await authServices.loginUser(req.body);
       res.cookie("refreshToken",refreshToken,{secure:false,httpOnly:true})
       sendResponse(res ,{
        statusCode:status.OK,
        success:true,
        message:'user log in successfully',
        data:{
            accessToken,
            isPasswordChange
        }
       })
}) ;

//  create access token by using refresh token 

const refreshToken =catchAsync(async(req:Request,res:Response)=>{
      const {refreshToken}= req.cookies;
      const result=await authServices.refreshToken(refreshToken) ;
      sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"create accesstoken successfully",
        data:result
    })
    
})

export const authController={
    loginUser,
    refreshToken
} ;