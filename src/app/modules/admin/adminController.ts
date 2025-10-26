import { NextFunction, Request, Response } from "express";
import { adminServices } from "./adminServices";
import { adminFilterableField } from "./admin.constant";
import pick from "../../../shared/shared";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";


const getAllAdminDataFromDB=async(req:Request,res:Response,next:NextFunction)=>{
    try {
          
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
    } catch (error:any) {
        next(error) ;
    }
};

const getSingleAdminById=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result=await adminServices.getSingleAdminById(req.params.id as string);
       
        sendResponse(res,{
            statusCode:status.OK,
            success:true,
            message:"get specific admin data",
            data:result
        })
    } catch (error:any) {
       next(error) ;
    }
}

const updateAdminById=async(req:Request,res:Response,next:NextFunction)=>{
    
    try {
   const result=await adminServices.updateAdminById(req.params.id as string,req.body);
        sendResponse(res,{
            statusCode:status.OK,
            success:true,
            message:"update specific admin data",
            data:result
        })
    } catch (error:any) {
       next(error) ;
    }
} ;

const deleteAdminById=async(req:Request,res:Response,next:NextFunction)=>{
    try {
         const result=await adminServices.deleteAdminById(req.params.id as string);
          sendResponse(res,{
            statusCode:status.OK,
            success:true,
            message:"delete permanently admin data",
            data:result
        })
    } catch (error:any) {
       next(error) ;
    }
};

const softDeleteAdminById=async(req:Request,res:Response,next:NextFunction)=>{
    try {
         const result=await adminServices.softDeleteAdminById(req.params.id as string);
         sendResponse(res,{
            statusCode:status.OK,
            success:true,
            message:"delete admin data",
            data:result
        })
    } catch (error:any) {
      next(error) ;
    }
};


export const adminControllers ={
    getAllAdminDataFromDB,
    getSingleAdminById,
    updateAdminById,
    deleteAdminById,
    softDeleteAdminById
}