import status from "http-status";
import prisma from "../../../shared/prisma";
import apiError from "../../errors/apiError";
import { TAuthUser } from "../../interface/common";
import { paginationHelper } from "../../../helper/paginationHelper";
import { Prisma } from "@prisma/client";

const createReviews=async(user : TAuthUser,payload:any)=>{
   const patientData=await prisma.patience.findUniqueOrThrow({
    where:{
        email:user.email
    }
   }) ;
   const appointmentData=await prisma.appointment.findUniqueOrThrow({
    where:{
        id:payload.appointmentId
    }
   }) ;

  if(patientData.id!==appointmentData.patientId){
    throw new apiError(status.BAD_REQUEST,'you are not authorized to create reviews in this appointment ') ;

  } ;

  const result= await prisma.$transaction(async(tx)=>{
             const result = await tx.reviews.create({
    data:{
        patientId:appointmentData.patientId,
        doctorId:appointmentData.doctorId,
        appointmentId:appointmentData.id,
        rating:payload.rating,
        comment:payload.comment 
    }
  })  ;

const avarageRating= await tx.reviews.aggregate({
    _avg:{
        rating:true
    }
}) ;

await tx.doctor.update({
    where:{
        id:appointmentData.doctorId
    },
    data:{
        averageRating:avarageRating._avg.rating as number
    }
}) ;

return result ;

  })


      
      return result ;
} ;



const getAllReviews=async(queryParams:any,options:any)=>{

   
    const {page,skip,limit,sortBy,sortOrder}=paginationHelper.calculatePagination(options) ;
    
    

    const result=await prisma.reviews.findMany({
        where:{
            OR:[
               { doctor:{
                   email:queryParams.email
                }}
            ]
        },
        skip,
        take:Number(limit),
        orderBy:{
            [sortBy]:sortOrder
        },
        include:{
            doctor:true
        }
    }) ;

    const totalData=await prisma.reviews.count({
         where:{
            OR:[
               { doctor:{
                   email:queryParams.email
                }},
               { patient:{
                   email:queryParams.email
                }}
            ]
        },
    })

   return {
    meta:{
      page,limit,totalData
    },
    data:result
} ;
}

export const reviewsServices={
    createReviews,
    getAllReviews
}