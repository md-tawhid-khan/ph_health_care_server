import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { doctorScheduleServices } from "./doctorSchedule.services";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { TAuthUser } from "../../interface/common";

const createDoctorSchedule=catchAsync(async(req:Request & {user?:TAuthUser} ,res:Response)=>{
  
    const result = await doctorScheduleServices.createDoctorSchedule(req?.user,req.body) ;
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'successfully create doctor schedule',
        data:result
    })
}) ;

export const doctorScheduleController={
  createDoctorSchedule   
}