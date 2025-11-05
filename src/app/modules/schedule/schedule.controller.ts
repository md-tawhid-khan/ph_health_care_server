import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { scheduleService } from "./schedule.service";
import { Request, Response } from "express";

const createSchedule=catchAsync(async(req:Request,res:Response)=>{

    const result=await scheduleService.createSchedule(req.body);
    sendResponse(res, {
        statusCode:status.OK,
        success:true,
        message:"create schedule successfully",
        data:result
    }) ;
}) ;

export const scheduleController ={
    createSchedule
}