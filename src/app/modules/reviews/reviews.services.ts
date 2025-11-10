import status from "http-status";
import prisma from "../../../shared/prisma";
import apiError from "../../errors/apiError";
import { TAuthUser } from "../../interface/common";

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

  const result = await prisma.reviews.create({
    data:{
        patientId:appointmentData.patientId,
        doctorId:appointmentData.doctorId,
        appointmentId:appointmentData.id,
        rating:payload.rating,
        comment:payload.comment 
    }
  })  ;
      
      return result ;
} ;

export const reviewsServices={
    createReviews
}