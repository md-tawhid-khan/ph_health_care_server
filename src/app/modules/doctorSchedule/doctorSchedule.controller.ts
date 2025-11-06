import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { doctorScheduleServices } from "./doctorSchedule.services";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { TAuthUser } from "../../interface/common";
import pick from "../../../shared/shared";

const createDoctorSchedule=catchAsync(async(req:Request & {user?:TAuthUser} ,res:Response)=>{
  
    const result = await doctorScheduleServices.createDoctorSchedule(req?.user,req.body) ;
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'successfully create doctor schedule',
        data:result
    })
}) ;

const getDoctorSchedule=catchAsync(async(req:Request & {user?:TAuthUser},res:Response)=>{
    const user=req.user ;
    const filterField=pick(req.query,["startDate","endDate","isBooked"]) ;
    const options=pick(req.query,["page","limit","sortBy","sortOrder"]) ;
     const result = await doctorScheduleServices.getDoctorSchedule(filterField,options,user!) ;
     sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"get my schedule data successfully",
        data:result
     }) ;
}) ;
const deleteDoctorSchedule=catchAsync(async(req:Request & {user?:TAuthUser},res:Response)=>{
    const user=req.user ;
    const {scheduleId}=req.params
     const result = await doctorScheduleServices.deleteDoctorSchedule(user,scheduleId) ;
     sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"delete  my schedule data successfully",
        data:result
     }) ;
}) ;


export const doctorScheduleController={
  createDoctorSchedule  ,
  getDoctorSchedule ,
  deleteDoctorSchedule,
}