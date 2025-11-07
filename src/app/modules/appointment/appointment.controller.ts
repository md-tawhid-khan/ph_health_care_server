import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { appointmentServices } from "./appointment.services";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { TAuthUser } from "../../interface/common";

const createAppointment=catchAsync(async(req:Request & {user?:TAuthUser} ,res:Response)=>{
    const user=req.user ;
    const payload=req.body ;
 const result=await appointmentServices.createAppointment(user as TAuthUser,payload) ;

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