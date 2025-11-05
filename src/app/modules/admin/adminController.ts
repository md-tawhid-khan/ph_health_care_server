import { NextFunction, Request,  Response } from "express";
import { adminServices } from "./adminServices";
import { adminFilterableField } from "./admin.constant";
import pick from "../../../shared/shared";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import catchAsync from "../../../shared/catchAsync";

const getAllAdminDataFromDB=catchAsync(async(req:Request,res:Response)=>{
             
        const queryParams= pick(req.query,adminFilterableField);
        const options=pick(req.query,['page','limit','sortBy','sortOrder']);
       
        const result=await adminServices.getAllAdminDataFromDB(queryParams,options) ;
       
        sendResponse(res , {
            statusCode:status.OK,
            success:true,
            message:"get all admin data",
            meta:result.meta,
            data:result.data
        })
    
});

const getSingleAdminById=catchAsync(async(req:Request,res:Response)=>{
    
        const result=await adminServices.getSingleAdminById(req.params.id as string);
       
        sendResponse(res,{
            statusCode:status.OK,
            success:true,
            message:"get specific admin data",
            data:result
        })
    
})

const updateAdminById=catchAsync(async(req:Request,res:Response)=>{
    
   const result=await adminServices.updateAdminById(req.params.id as string,req.body);
        sendResponse(res,{
            statusCode:status.OK,
            success:true,
            message:"update specific admin data",
            data:result
        })
    
} );

const deleteAdminById=catchAsync(async(req:Request,res:Response)=>{
   
         const result=await adminServices.deleteAdminById(req.params.id as string);
          sendResponse(res,{
            statusCode:status.OK,
            success:true,
            message:"delete permanently admin data",
            data:result
        })
   
});

const softDeleteAdminById=catchAsync(async(req:Request,res:Response)=>{
    
         const result=await adminServices.softDeleteAdminById(req.params.id as string);
         sendResponse(res,{
            statusCode:status.OK,
            success:true,
            message:"delete admin data",
            data:result
        })
   
});


export const adminControllers ={
    getAllAdminDataFromDB,
    getSingleAdminById,
    updateAdminById,
    deleteAdminById,
    softDeleteAdminById
}