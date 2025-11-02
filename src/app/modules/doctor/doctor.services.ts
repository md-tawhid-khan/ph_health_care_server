import { Request } from "express";
import prisma from "../../../shared/prisma";
import { userStatus } from "@prisma/client";
import { TAuthUser } from "../../interface/common";


const getAllDoctorData=async()=>{
   const result=await prisma.doctor.findMany() ;
   return result ;
} ;

const getSingleDoctorData=async(req:Request & {user:TAuthUser})=>{
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
 
   const deleteDoctorData=async(req:Request & {user:TAuthUser})=>{
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

   const softDeleteDoctorData=async(req:Request & {user:TAuthUser})=>{
     const user = req?.user  ;
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

   const updateDoctorData=async(req:Request & {user:TAuthUser})=>{
       const user=req.user ; 
       const doctorId=req.params.id as string;
       const doctorData=req.body.doctorData ;
       const specialities=req.body.specialities ;
       
       const userInfo=await prisma.user.findUniqueOrThrow({
        where:{
            email:user.email,
            status:userStatus.ACTIVES
        }
       }) ;

       
     
       await prisma.$transaction(async(transaction)=>{
        const updateDoctorInfo= await transaction.doctor.update({
            where:{
                id:doctorId
            },
            data: doctorData,
           
        }) ;
         if(specialities && specialities.length>0){
            
            const deleteSpecialitiesIds=specialities.filter(speciality =>speciality.isDelete) ;
          
            for(const speciality of deleteSpecialitiesIds){
               await transaction.doctorSpecialist.deleteMany({
           where:{
            doctorId:updateDoctorInfo.id,
           specialistId :speciality.specialitiesId,
           }       
        }) ;
            } ;
         }


            const createSpecialitiesIds=specialities.filter(speciality =>!speciality.isDelete) ;

            for(const speciality of createSpecialitiesIds){
                 await transaction.doctorSpecialist.create({
           data:{
            doctorId:updateDoctorInfo.id,
           specialistId :speciality.specialitiesId,
           }       
        }) ;
            } ;

         

         });


       
       const result =await prisma.doctor.findUniqueOrThrow({
        where:{
            id:doctorId
        },
        include:{
            doctorSpecialist:{
                include:{
                    spacialist:true
                }
            }
        }
       }) ;
       
     return result ;
   } ;

export const doctorServices={
    getAllDoctorData,
    getSingleDoctorData,
    deleteDoctorData,
    softDeleteDoctorData,
    updateDoctorData
} ;