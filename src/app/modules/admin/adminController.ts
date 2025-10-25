
import { Request, Response } from "express";
import { adminServices } from "./adminServices";
import pick from "../../../shared";



const getAllAdminDataFromDB=async(req:Request,res:Response)=>{
    try {
          
        const queryParams= pick(req.query,['name','contactNumber','email','searchTerm']);
        
        const result=await adminServices.getAllAdminDataFromDB(queryParams) ;
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