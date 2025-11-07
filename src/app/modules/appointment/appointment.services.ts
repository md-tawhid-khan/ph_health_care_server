import prisma from "../../../shared/prisma";
import { TAuthUser } from "../../interface/common";
import { v4 as uuidv4 } from 'uuid';

type TPayload={
    doctorId:string,
    scheduleId:string
}

const createAppointment=async(user:TAuthUser,payload:TPayload )=>{
    
    const patientInfo=await prisma.patience.findUniqueOrThrow({
        where:{
            email:user.email
        }
    });

    
    const doctorInfo=await prisma.doctorSchedule.findFirstOrThrow({
       where:{
         doctorId:payload?.doctorId ,
         scheduleId:payload?.scheduleId,
         isBooked:false
       }
    }) ;

    const callingId:string = uuidv4() ;

    

    const result=await prisma.$transaction(async(tx)=>{
         const createAppointment = await tx.appointment.create({
      data:{
          doctorId:payload.doctorId,
          scheduleId:payload.scheduleId,
          patientId:patientInfo.id,
          vedioCallingId:callingId
      },
      include:{
        doctor:true,
        patient:true,
        schedule:true
      }
   }) ;
        await tx.doctorSchedule.update({
    where:{
        doctorId_scheduleId:{
            doctorId:payload.doctorId,
            scheduleId:payload.scheduleId
        }
    },
    data:{
        isBooked:true,
        appointmentId:createAppointment.id
    }
   }) ;
  
   return createAppointment ;

    }) ;

  
   return result ;

} ;

export const appointmentServices={
    createAppointment
}