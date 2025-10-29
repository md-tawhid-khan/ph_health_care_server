
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

//  -------------- user password change -------------------

const userPasswordChange=catchAsync(async(req:Request & {user?:any},res:Response)=>{
    const user = req.user ;
    const result=await authServices.userPasswordChange(user,req.body) ;
     sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"change password successfully ",
        data:result
    });
}) ;

// ---------- forget password ---------------

const forgetPassword=catchAsync(async(req:Request,res:Response)=>{
     await authServices.forgetPassword(req.body) ;
     sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"check your gmail",
        data:null
    });
});

// ------------------- reset password ----------------

const resetPassword=catchAsync(async(req:Request,res:Response)=>{
    const token=req.headers.authorization;
   
    const result =await authServices.resetPassword(token,req.body);
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"reset password successfully",
        data:null
    });
})

export const authController={
    loginUser,
    refreshToken,
    userPasswordChange,
    forgetPassword,
    resetPassword
} ;