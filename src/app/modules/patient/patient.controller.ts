
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { patientServices } from "./patient.services";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import pick from "../../../shared/shared";
import { patientFilterableField } from "./patient.constance";

const getAllPatientData=catchAsync(async(req:Request,res:Response)=>{
    const options = pick(req.query,["page","limit","sortBy","sortOrder"]) ;
   const queryFields=pick(req.query,patientFilterableField) ;

 const result = await patientServices.getAllPatientData(queryFields,options) ;
 sendResponse(res,{
    statusCode:status.OK,
    success:true,
    message:"get all patient data successfully",
    meta:result.meta,
    data:result .data
 }) ;
}) ;

const getSinglePatientData=catchAsync(async(req:Request,res:Response)=>{
    const params = req.params.id ;
    
    const result=await patientServices.getSinglePatientData(params as string) ;

    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'get single patient data',
        data:result
    })
})

const updatePatientData=catchAsync(async(req:Request,res:Response)=>{
  
  const patientId=req.params.id as string ;
  const updateData=req.body ;

  const result=await patientServices.updatePatientData(patientId,updateData);
  sendResponse(res,{
    statusCode:status.OK,
    success:true,
    message:"update patient data successfully",
    data:result 
  })
}) ;

const deletePatientData=catchAsync(async(req:Request,res:Response)=>{
  const patientId=req.params.id as string;
 
  const result=await patientServices.deletePatientData(patientId) ;
  sendResponse(res,{
    statusCode:status.OK,
    success:true,
    message:"delete patient data successfully",
    data:result
  })
}) ;

const softDeletePatientData=catchAsync(async(req:Request,res:Response)=>{

  const patientId=req.params.id as string;
 const result=await patientServices.softDeletePatientData(patientId) ;

 sendResponse(res,{
  statusCode:status.OK,
  success:true,
  message:'delete patient data successfully',
  data:result
 }) ;
}) ;

export const patientController={
    getAllPatientData,
    getSinglePatientData,
    updatePatientData,
    deletePatientData,
    softDeletePatientData
}