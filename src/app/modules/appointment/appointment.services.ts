import prisma from "../../../shared/prisma";
import { TAuthUser } from "../../interface/common";
import { v4 as uuidv4 } from 'uuid';

const createAppointment=async(req:Request & { user: TAuthUser; },)=>{
    const user=req.user ;
    const payload=req?.body ;
    const patientInfo=await prisma.patience.findUniqueOrThrow({
        where:{
            email:user.email
        }
    });

    
    const doctorInfo=await prisma.doctorSchedule.findFirstOrThrow({
       where:{
         doctorId:payload?.doctorId,
         scheduleId:payload?.scheduleId,
         isBooked:false
       }
    }) ;

    const callingId = uuidv4() ;


   const result = await prisma.appointment.create({
    data:{
        patientId:patientInfo.id,
        doctorId:payload?.doctorId,
        scheduleId:payload?.scheduleId,
        vedioCallingId:callingId
    }
   }) ;

   return result ;

} ;

export const appointmentServices={
    createAppointment
}