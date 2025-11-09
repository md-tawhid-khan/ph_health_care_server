import { status } from 'http-status';

import prisma from "../../../shared/prisma";
import { TAuthUser } from "../../interface/common";
import { v4 as uuidv4 } from 'uuid';
import { AppointmentStatus, Prisma, userRole } from '@prisma/client';
import { paginationHelper } from '../../../helper/paginationHelper';
import apiError from '../../errors/apiError';

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

    const doctorInfo=await prisma.doctor.findUniqueOrThrow({
        where:{
            id:payload.doctorId
        }
    })
    
    await prisma.doctorSchedule.findFirstOrThrow({
       where:{
         doctorId:payload?.doctorId ,
         scheduleId:payload?.scheduleId,
         isBooked:false
       }
    }) ;

    const callingId:string = uuidv4() ;

 

    const result=await prisma.$transaction(async(tx)=>{
         const appointmentData = await tx.appointment.create({
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
        appointmentId:appointmentData.id
    }
   }) ;

   const today=new Date() ;

  const transactionId="ph-health-"+today.getFullYear()+"_"+today.getMonth()+"_"+today.getDay()+"_"+today.getHours()+"_"+today.getMinutes()+"_"+today.getSeconds() ;
    console.log(transactionId) ;
   await tx.payment.create({
     data:{
        appointmentId:appointmentData.id,
        amount:doctorInfo.appiontentfree,
        transactionId
     }
   })
  
  
   return appointmentData ;

    }) ;

  
   return result ;

} ;

const getMyAppointment=async(user:TAuthUser,queryParams:any,options:any)=>{
    
    const {...filterData}=queryParams ;
    const {page,limit,skip,sortBy,sortOrder}=paginationHelper.calculatePagination(options)

    const addContion:Prisma.AppointmentWhereInput[]=[]

    if(user.role === userRole.PATIENT){
        addContion.push({
            patient:{
                email:user.email
            }
        })
    }
   else if(user.role === userRole.DOCTOR){
        addContion.push({
            doctor:{
                email:user.email
            }
        })
    }

    if(Object.keys(filterData).length>0){
      addContion.push({AND:Object.keys(filterData).map(field=>({
        [field]:{
            equals:filterData[field]
        }
      })) 
      }) ;
    } ;

    const whereCondition:Prisma.AppointmentWhereInput=addContion.length>0 ? {AND:addContion} : {} ;
 
    // console.dir(whereCondition,{depth:'infinity'}) ;

const result = await prisma.appointment.findMany({
    where:whereCondition,
    skip,
    take:Number(limit),
    orderBy:{
        [sortBy]:sortOrder
    },
    include:user?.role === userRole.PATIENT ? {doctor:true,schedule:true} : {patient:{include:{medicalReport:true,patientHealthData:true}}} 

});
const totalData=await prisma.appointment.count({
    where:whereCondition
})
return {
    meta:{
        page,
        limit,
        totalData
    },
    data:result
   } ;
} ;

// get all appointment for admin and super admin 
// endPoint ("/appointment")

const getAllAppointment=async(queryParams:any,options:any)=>{
   
    const {...filterData}=queryParams ;
    
    const {page,limit,skip,sortBy,sortOrder}=paginationHelper.calculatePagination( options) ;

   const addCondition:Prisma.AppointmentWhereInput[]=[]

  

   if(Object.keys(filterData).length>0){
       addCondition.push({
        AND:Object.keys(filterData).map(field=>({
            [field]:{
                equals:filterData[field]
            }
        }))
       })
   } ;

const whereCondition:Prisma.AppointmentWhereInput=addCondition?.length>0?{AND:addCondition} : {} ;

    const result = await prisma.appointment.findMany({
        where:whereCondition,
        skip,
        take:Number(limit),
        orderBy:{
            [sortBy]:sortOrder
        }
    }) ;
    const totalData=await prisma.appointment.count({
        where:whereCondition,
    })
    return {
       meta:{ page,
        limit,
        totalData,},
        data:result 
    }
} ;

const changeAppointmentStatus=async(appointmentId:string,payload:{status:AppointmentStatus},user:TAuthUser)=>{
    const appointmentData=await prisma.appointment.findFirstOrThrow({
        where:{
            id:appointmentId
        },
        include:{
            doctor:true
        }
    }) ;

    if(user?.role===userRole.DOCTOR){
        if(!(user?.email === appointmentData.doctor.email)){
            throw new apiError(status.BAD_REQUEST,'This is not your appointment') ;
        }
    }
   
    const result = await prisma.appointment.update({
        where:{
            id:appointmentData.id
        },
        data:{
            status:payload.status
        }
    }) ;

    return result ;

}

export const appointmentServices={
    createAppointment,
    getMyAppointment,
    getAllAppointment,
    changeAppointmentStatus
}