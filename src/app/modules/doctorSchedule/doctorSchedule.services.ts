import prisma from "../../../shared/prisma";

const createDoctorSchedule=async(user:any,payload:any)=>{
      const doctorInfo=await prisma.doctor.findUniqueOrThrow({
        where:{
            email:user.email,
            isDelete:false
        }
      });

     

      const doctorScheduleData=payload.scheduleIds.map(scheduleId=>({
        doctorId:doctorInfo.id,
        scheduleId
      })) ;

     const result = await prisma.doctorSchedule.createMany({
        data:doctorScheduleData
     }) ;

     return result ;
    
} ;

export const doctorScheduleServices={
    createDoctorSchedule
} ;