import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { specialitiesServices } from "./specialities.services";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const getAllSpecialities=catchAsync(async(req:Request,res:Response)=>{
  const result=await specialitiesServices.getAllSpecialities() ;

  sendResponse(res,{
    statusCode:status.OK,
    success:true,
    message:'get all specialities data',
    data:result
  }) ;

}) ;

const createSpecialities=catchAsync(async(req:Request,res:Response)=>{
 const result = await specialitiesServices.createSpecialities(req)
 sendResponse(res,{
    statusCode:status.OK,
    success:true,
    message:"create specialities successfully ",
    data:result
 }) ;

}) ;

const deleteSpecialities=catchAsync(async(req:Request,res:Response)=>{
    const specialitiesId=req.params.id ;
    const result=await specialitiesServices.deleteSpecialities(specialitiesId!);
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"delete specialities successfully",
        data:result 
    })
})

export const specialitiesController={
    createSpecialities,
    getAllSpecialities,
    deleteSpecialities
}