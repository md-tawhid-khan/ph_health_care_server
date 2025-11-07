import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { scheduleService } from "./schedule.service";
import { Request, Response } from "express";
import pick from "../../../shared/shared";
import { TAuthUser } from "../../interface/common";

const createSchedule=catchAsync(async(req:Request,res:Response)=>{

    const result=await scheduleService.createSchedule(req.body);
    sendResponse(res, {
        statusCode:status.OK,
        success:true,
        message:"create schedule successfully",
        data:result
    }) ;
}) ;

const getAllSchedule=catchAsync(async(req:Request & {user?:TAuthUser},res:Response)=>{
    const user=req.user ;
    const filterField=pick(req.query,["startDate","endDate"]) ;
    const options=pick(req.query,["page","limit","sortBy","sortOrder"]) ;
     const result = await scheduleService.getAllSchedule(filterField,options,user!) ;
     sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"get all schedule successfully",
        data:result
     }) ;
}) ;

const getSingleSchedule=catchAsync(async(req:Request & {user?:TAuthUser},res:Response)=>{
    const user =req.user ;
    const scheduleId=req.params.id ;

    const result=await scheduleService.getSingleSchedule(user,scheduleId) ;

    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"get single schedule successfully",
        data:result
     }) ;
}) ;

const deleteSchedule=catchAsync(async(req:Request,res:Response)=>{
    const scheduleId=req.params.id ;
   const result=await scheduleService.deleteSchedule(scheduleId as string) ;
   sendResponse(res,{
    statusCode:status.OK,
    success:true,
    message:'delete schedule data successfully',
    data:result
   }) ;
})  ;

export const scheduleController ={
    createSchedule,
    getAllSchedule,
    getSingleSchedule,
    deleteSchedule
}