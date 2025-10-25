
import { Request, Response } from "express";
import { adminServices } from "./adminServices";
import { adminFilterableField } from "./admin.constant";
import pick from "../../../shared/shared";



const getAllAdminDataFromDB=async(req:Request,res:Response)=>{
    try {
          
        const queryParams= pick(req.query,adminFilterableField);
        const options=pick(req.query,['page','limit','sortBy','sortOrder']);
       
        const result=await adminServices.getAllAdminDataFromDB(queryParams,options) ;
        res.status(200).json({
            success:true,
            message:"get all admin data",
            result
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.name || "failed to get all admin data",
            error
        })
    }
}

export const adminControllers ={
    getAllAdminDataFromDB
}