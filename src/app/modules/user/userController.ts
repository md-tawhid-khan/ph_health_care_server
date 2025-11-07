
import { Request, Response } from "express";
import { userServices } from "./userServices";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import pick from "../../../shared/shared";
import { userFilterableField } from "./user.constant";
import { TAuthUser } from "../../interface/common";

const createAdmin=async(req:Request,res:Response)=>{
    try {

     
        const result=await userServices.createAdmin(req);

    res.status(200).json({        
        success:true,
        message:"successfully retrieve admin",
        result
    }) ;
    } catch (error:any) {
       res.status(500).json({
        success:false,
        message:error?.name || "failed to retrieve admin" ,
        error
       }) 
    }
   
}

const createDoctor=catchAsync(async(req:Request,res:Response)=>{

   const result= await userServices.createDoctor(req);

    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'doctor create successfully',
        data:result 
    })
}
) ;

const createPatience=catchAsync(async(req:Request,res:Response)=>{
   
   const result= await userServices.createPatience(req);

    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'patient create successfully',
        data:result 
    })
}
)
    
const getAllUserDataFromDB=catchAsync(async(req:Request,res:Response)=>{
         
    
        const queryParams= pick(req.query,userFilterableField);
        const options=pick(req.query,['page','limit','sortBy','sortOrder']);
        
        const result=await userServices.getAllUserDataFromDB(queryParams,options) ;
       
        sendResponse(res , {
            statusCode:status.OK,
            success:true,
            message:"get all user data",
            meta:result.meta,
            data:result.data
        })
    
});

const changeUserStatus=catchAsync(async(req:Request,res:Response)=>{
     const {id}=req.params ;
     
    const result = await userServices.changeUserStatus(id as string,req.body) ;
      sendResponse(res , {
            statusCode:status.OK,
            success:true,
            message:"get all user data",
            
            data:result
        })
}) ;

const getMyProfile=catchAsync(async(req:Request & {user?:TAuthUser} ,res:Response)=>{
     
     const result =await userServices.getMyProfile(req.user!) ;
      sendResponse(res , {
            statusCode:status.OK,
            success:true,
            message:"get all user data",
            
            data:result
        })
}) ;

const updateMyProfile=catchAsync(async(req:Request & {user?:TAuthUser} ,res:Response)=>{
      const user=req.user  ;
     
     const result =await userServices.updateMyProfile(user!,req) ;
      sendResponse(res , {
            statusCode:status.OK,
            success:true,
            message:"profile update successfully",           
            data:result
        }) ;
}) ;


export const userController={
    createAdmin,
    createDoctor,
    createPatience,
    getAllUserDataFromDB,
    changeUserStatus,
    getMyProfile,
    updateMyProfile
} ;