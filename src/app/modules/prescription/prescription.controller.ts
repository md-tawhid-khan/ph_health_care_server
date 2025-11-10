import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { prescriptionServices } from "./prescription.services";
import { Request, Response } from "express";
import { TAuthUser } from "../../interface/common";
import pick from "../../../shared/shared";

const createPrescription=catchAsync(async(req:Request & {user?:TAuthUser},res:Response)=>{

    const user=req.user ;
    const payload=req.body ;

    const result=await prescriptionServices.createPrescription(user,payload) ;
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"create prescription successfully",   
        data:result
    }) ;
}) ;

const getPatientPrescription=catchAsync(async(req:Request & {user?:TAuthUser},res:Response)=>{
    const user=req.user

    const options=pick(req.query,['limit','page','sortBy','sortOrder']) ;
    const result=await prescriptionServices.getPatientPrescription(user ,options) ;
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"get my prescription successfully", 
        meta:result.meta,  
        data:result.data
    }) ;
})

export const prescriptionController ={
    createPrescription,
    getPatientPrescription
}