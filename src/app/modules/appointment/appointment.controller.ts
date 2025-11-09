import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { appointmentServices } from "./appointment.services";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { TAuthUser } from "../../interface/common";
import pick from "../../../shared/shared";

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

const getMyAppointment=catchAsync(async(req:Request & {user?:TAuthUser} ,res:Response)=>{
   
    const user=req.user ;
   
    const queryParams=pick(req.query,['status','paymentStatus']) ;
   
    const options=pick(req.query,['page','limit','sortBy','sortOrder']) ;
   
 const result=await appointmentServices.getMyAppointment(user,queryParams,options) ;

 sendResponse(res,{
    statusCode:status.OK,
    success:true,
    message:"get my appointment successfully",
    data:result
 }) ;
}) ;

const getAllAppointment=catchAsync(async(req,res)=>{
   const queryParams=pick(req.query,['status','paymentStatus']) ;
   const options=pick(req.query,['page','limit','sortBy','sortOrder']) ;
   const result=await appointmentServices.getAllAppointment(queryParams,options) ;
    sendResponse(res,{
    statusCode:status.OK,
    success:true,
    message:"get all appointment successfully",
    data:result
 }) ;
})

export const appointmentController={
    createAppointment,
    getMyAppointment,
    getAllAppointment
} ;