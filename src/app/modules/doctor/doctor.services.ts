import { Request } from "express";
import prisma from "../../../shared/prisma";
import { userStatus } from "@prisma/client";


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

   const softDeleteDoctorData=async(req:Request)=>{
     const user = req?.user ;
     const params = req.params.id as string ;
     const userInfo=await prisma.user.findUniqueOrThrow({
        where:{
            email:user.email,
            status:userStatus.ACTIVES
        }
     }) ;
     const result=await prisma.$transaction(async(transaction)=>{
         const doctorInfo=transaction.doctor.update({
            where:{
                id:params
            },
            data:{
                isDelete:true
            }
         }) ;
      const userInfo=transaction.user.update({
        where:{
            email:(await doctorInfo).email
        },
        data:{
            status:userStatus.DELETED
        }
      }) ;

      return doctorInfo ;

     }) ;
    
     return result ;

   } ;

export const doctorServices={
    getAllDoctorData,
    getSingleDoctorData,
    deleteDoctorData,
    softDeleteDoctorData
} ;