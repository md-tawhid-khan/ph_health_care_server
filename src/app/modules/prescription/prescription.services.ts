import { AppointmentStatus, PaymentStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import apiError from "../../errors/apiError";
import status from "http-status";
import { TAuthUser } from "../../interface/common";
import { paginationHelper } from "../../../helper/paginationHelper";

const createPrescription=async(user:any,payload:any)=>{
   
const appointmentData=await prisma.appointment.findUniqueOrThrow({
    where:{
        id:payload.appointmentId,
        status:AppointmentStatus.COMPLETED,
        paymentStatus:PaymentStatus.PAID
    },
    include:{
        doctor:true
    }
}) ;
 if(user.email!==appointmentData.doctor.email){
     throw new apiError(status.BAD_REQUEST, ' this appointment is not your') ;
 } ;

 const result = await prisma.prescription.create({
    data:{
        doctorId:appointmentData.doctorId,
        patientId:appointmentData.patientId,
        appointmentId:appointmentData.id,
        instruction:payload.instruction,
        followUpDate:payload.followUpDate
    },
    include:{
        doctor:true
    }
 })

return result ;
} ;

const getPatientPrescription=async(user:TAuthUser,options:any)=>{
    const {page,limit,skip,sortBy,sortOrder}=paginationHelper.calculatePagination(options )
  const result=await prisma.prescription.findMany({
    where:{
       patient:{
        email:user.email
       } 
    },
    include:{
        doctor:true,
        patient:true
    },
    skip,
    take:Number(limit),
    orderBy:{
        [sortBy]:sortOrder
    }
  }) ;
  const totalData=await prisma.prescription.count()

  return {
    meta:{
        page,limit,totalData
    },
   data: result
  }
}

export const prescriptionServices={
    createPrescription,
    getPatientPrescription
}