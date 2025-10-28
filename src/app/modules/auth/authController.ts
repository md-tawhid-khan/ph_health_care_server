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

export const authController={
    loginUser
} ;