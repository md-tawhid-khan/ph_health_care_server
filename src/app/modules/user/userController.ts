import { Request, Response } from "express";
import { userServices } from "./userServices";
import { uploadImage } from "../../../helper/fileUploaders";

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
export const userController={
    createAdmin
} ;