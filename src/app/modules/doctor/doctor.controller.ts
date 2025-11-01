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

export const doctorController={
    getAllDoctorData
} ;