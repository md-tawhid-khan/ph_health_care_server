import { AppointmentStatus, PaymentStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import apiError from "../../errors/apiError";
import status from "http-status";

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

export const prescriptionServices={
    createPrescription
}