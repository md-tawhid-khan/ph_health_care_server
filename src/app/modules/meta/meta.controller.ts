import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { metaServices } from "./meta.services";
import { Request, Response } from "express";
import { TAuthUser } from "../../interface/common";

const fetchDashboardMetaData=catchAsync(async(req:Request & {user?:TAuthUser},res:Response)=>{
    const user=req.user ;
      const result=await metaServices.fetchDashboardMetaData(user as TAuthUser);
      sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"get finally meta data",
        data:result
      }) ;
}) ;

export const metaController={
    fetchDashboardMetaData
} ;