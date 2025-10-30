import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { advertisementServices } from "./advertisementServices";

const createAdvertisement=catchAsync(async(req:Request,res:Response)=>{
   
    const result=await advertisementServices.createAdvertisement(req)
})

export const advertisementController={
    createAdvertisement
}