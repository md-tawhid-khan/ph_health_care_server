import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { doctorServices } from "./doctor.services";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { doctorFilterableField } from "./doctor.constant";
import pick from "../../../shared/shared";
import { TAuthUser } from "../../interface/common";



const getAllDoctorData=catchAsync(async(req:Request,res:Response)=>{
   
    const queryParams=pick(req.query,doctorFilterableField);
    const options=pick(req.query,['page','limit','sortBy','sortOrder']) ;
   
    const result=await doctorServices.getAllDoctorData(queryParams,options) ;
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"get all doctor data",
        meta:result.meta,
        data:result.data
    }) ;
}) ;

const getSingleDoctorData=catchAsync(async(req:Request ,res:Response)=>{
    
     const result=await doctorServices.getSingleDoctorData(req as Request & {user:TAuthUser} ) ;
     sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'get single data',
        data:result
     }) ;
}) ;

const deleteDoctorData=catchAsync(async(req:Request,res:Response)=>{
     const result = await doctorServices.deleteDoctorData(req as Request & {user:TAuthUser}) ;
     sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'deleted data successfully',
        data:result 
     }) ;
}) ;

const softDeleteDoctorData=catchAsync(async(req:Request,res:Response)=>{
 const result=await doctorServices.softDeleteDoctorData(req as Request & {user:TAuthUser});
 sendResponse(res,{
    statusCode:status.OK,
    success:true,
    message:'delete doctor data',
    data:result 
   }) ;
}) ;

const updateDoctorData=catchAsync(async(req:Request,res:Response)=>{
    const result = await doctorServices.updateDoctorData(req as Request & {user:TAuthUser}) ;
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'update doctorData successfully',
        data:result
    })
})

export const doctorController={
    getAllDoctorData ,
    getSingleDoctorData,
    deleteDoctorData,
    softDeleteDoctorData,
    updateDoctorData

} ;