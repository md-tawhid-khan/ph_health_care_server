import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { appointmentServices } from "./appointment.services";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { TAuthUser } from "../../interface/common";

const createAppointment=catchAsync(async(req:Request ,res:Response)=>{
    
 const result=await appointmentServices.createAppointment(req as any) ;

 sendResponse(res,{
    statusCode:status.OK,
    success:true,
    message:"create appointment successfully",
    data:result
 }) ;
}) ;


export const appointmentController={
    createAppointment
} ;