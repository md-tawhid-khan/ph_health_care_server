import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { doctorServices } from "./doctor.services";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";


const getAllDoctorData=catchAsync(async(req:Request,res:Response)=>{
    const result=await doctorServices.getAllDoctorData() ;
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"get all doctor data",
        data:result
    }) ;
}) ;

const getSingleDoctorData=catchAsync(async(req:Request,res:Response)=>{
    
     const result=await doctorServices.getSingleDoctorData(req) ;
     sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'get single data',
        data:result
     }) ;
}) ;

const deleteDoctorData=catchAsync(async(req:Request,res:Response)=>{
     const result = await doctorServices.deleteDoctorData(req) ;
     sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'deleted data successfully',
        data:result 
     }) ;
}) ;

const softDeleteDoctorData=catchAsync(async(req:Request,res:Response)=>{
 const result=await doctorServices.softDeleteDoctorData(req);
 sendResponse(res,{
    statusCode:status.OK,
    success:true,
    message:'delete doctor data',
    data:result 
   }) ;
}) ;

export const doctorController={
    getAllDoctorData ,
    getSingleDoctorData,
    deleteDoctorData,
    softDeleteDoctorData

} ;