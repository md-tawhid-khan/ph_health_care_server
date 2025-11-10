import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { reviewsServices } from "./reviews.services";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { TAuthUser } from "../../interface/common";
import pick from "../../../shared/shared";

const createReviews=catchAsync(async(req:Request & {user?:TAuthUser},res:Response)=>{
    const user=req.user ;
    const result= await reviewsServices.createReviews(user as TAuthUser,req.body) ;
     sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"create reviews successfully",       
        data:result
    }) ;
}) ;


const getAllReviews=catchAsync(async(req:Request ,res:Response)=>{
    const queryParams=pick(req.query,['email']);
    const options=pick(req.query,['page','limit','sortBy','sortOrder']);
     const result= await reviewsServices.getAllReviews(queryParams,options) ;
   sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"get all reviews successfully",       
        meta:result.meta , 
        data:result.data
    }) ;
})
export const reviewsController =  {
    createReviews,
    getAllReviews
}