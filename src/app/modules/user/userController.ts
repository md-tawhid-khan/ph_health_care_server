import { Request, Response } from "express";
import { userServices } from "./userServices";
import { uploadImage } from "../../../helper/fileUploaders";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const createAdmin=async(req:Request,res:Response)=>{
    try {

     
        const result=await userServices.createAdmin(req);

    res.status(200).json({        
        success:true,
        message:"successfully retrieve admin",
        result
    }) ;
    } catch (error:any) {
       res.status(500).json({
        success:false,
        message:error?.name || "failed to retrieve admin" ,
        error
       }) 
    }
   
}

const createDoctor=catchAsync(async(req:Request,res:Response)=>{

   const result= await userServices.createDoctor(req);

    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'doctor create successfully',
        data:result 
    })
}
) ;

const createPatience=catchAsync(async(req:Request,res:Response)=>{
   
   const result= await userServices.createPatience(req);

    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'doctor create successfully',
        data:result 
    })
}
)
    
    

export const userController={
    createAdmin,
    createDoctor,
    createPatience
} ;