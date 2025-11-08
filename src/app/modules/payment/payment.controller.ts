import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { paymentServices } from "./payment.services";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const initPayment=catchAsync(async(req:Request,res:Response)=>{
    const {appointmentId}=req.params ;
    
    const result=await paymentServices.initPayment(appointmentId ! );
     sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'init payment successfully',
        data:result
     })
 }) ;

const validatePayment=catchAsync(async(req:Request,res:Response)=>{
   
    const result=await paymentServices.validatePayment(req.query);
     sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:' payment validate successfully',
        data:result
     })
 }) ;

 export const paymentController = {
    initPayment,
    validatePayment
 }