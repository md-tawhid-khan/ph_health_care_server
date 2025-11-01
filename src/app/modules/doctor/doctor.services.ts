import { Request } from "express";
import prisma from "../../../shared/prisma";
import { userRole, userStatus } from "@prisma/client";

const getAllDoctorData=async()=>{
   const result=await prisma.doctor.findMany() ;
   return result ;
} ;

const getSingleDoctorData=async(req:Request)=>{
    const user=req.user ;
   
    const params=req.params.id as string;
    const userInfo=await prisma.user.findUniqueOrThrow({
        where:{
            email:user.email,
            status:userStatus.ACTIVES
        }
    });

    const result=await prisma.doctor.findUniqueOrThrow({
        where:{
            id:params,
            isDelete:false
        }
    }) ;
   return result  ;
} ;
 
   const deleteDoctorData=async(req:Request)=>{
       const user=req.user ;
       const params=req.params.id as string ;
       const userInfo=await prisma.user.findUniqueOrThrow({
        where:{
            email:user.email,
            status:userStatus.ACTIVES,           
        }
       }) ;

       const result = await prisma.doctor.delete({
        where:{
            id:params
        }
       }) ;

       return result ;

   } ;

export const doctorServices={
    getAllDoctorData,
    getSingleDoctorData,
    deleteDoctorData
} ;