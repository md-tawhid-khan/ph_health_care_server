import { status } from 'http-status';
import { TAuthUser } from './../../interface/common';
import { PaymentStatus, userRole } from "@prisma/client";
import prisma from "../../../shared/prisma";


const fetchDashboardMetaData=async(user:TAuthUser)=>{
    
    let metaData ;

     switch(user.role){
     
     case userRole.SUPER_ADMIN :
      metaData =  getSuperAdminMetaData();
        break ;
     case userRole.ADMIN :
      metaData =  getAdminMetaData()  
        break ;
    case userRole.DOCTOR :
       metaData =  getDoctorMetaData(user) 
        break ;
    case userRole.PATIENT :
       metaData =  getPatientMetaData(user)
        break ;
     default:
    throw new Error("invalid user role") ;  
    }

    return metaData
} ;

const getSuperAdminMetaData=async()=>{
    const totalAdminCount = await prisma.admin.count() ;
        const totalDoctorCount=await prisma.doctor.count() ;
    const totalPatientCount=await prisma.patience.count();
    const totalAppointmentCount=await prisma.appointment.count();
    const totalPaymentCount=await prisma.payment.count();

    const totalRevenue = await prisma.payment.aggregate({
        _sum:{
            amount:true
        },
        where:{
             status:PaymentStatus.PAID
        }
    }) ;

    return({totalAppointmentCount,totalDoctorCount,totalPatientCount,totalPaymentCount,totalRevenue,totalAdminCount}) ;

}
const getAdminMetaData=async()=>{
     const totalDoctorCount=await prisma.doctor.count() ;
    const totalPatientCount=await prisma.patience.count();
    const totalAppointmentCount=await prisma.appointment.count();
    const totalPaymentCount=await prisma.payment.count();

    const totalRevenue = await prisma.payment.aggregate({
        _sum:{
            amount:true
        },
       where:{
         status:PaymentStatus.PAID
       }
    }) ;

    return({totalAppointmentCount,totalDoctorCount,totalPatientCount,totalPaymentCount,totalRevenue}) ;

}
const getDoctorMetaData=async(user:TAuthUser)=>{
    const doctorInfo=await prisma.doctor.findUniqueOrThrow({
        where:{
            email:user.email
        }
    }) ;
    
    const totalAppointmentCount= await prisma.appointment.count({
        where:{
            doctorId:doctorInfo.id
        },
    });

    const totalPatientCount = await prisma.appointment.groupBy({
        by:['patientId'],
        _count:{
            id:true
        }
    }) ;

    const reviewsCount= await prisma.reviews.count({
           where:{
            doctorId:doctorInfo.id
           }
    })

    const doctorTotalRevinue= await prisma.payment.aggregate({
        _sum:{
            amount:true
        } ,
        where:{
            apppointment:{
                doctorId:doctorInfo.id
            },
             status:PaymentStatus.PAID
        }
    }) ;

    const appointmentStatusDistribution = await prisma.appointment.groupBy({
       by:['status'] ,
       _count:{id:true},
       where:{
        doctorId:doctorInfo.id
       }
    })

    const formattedAppointmentStatusDistribution = appointmentStatusDistribution.map((count)=>({
        status:count.status,
        count:Number(count._count.id)
    }))

   return({totalAppointmentCount,
    reviewsCount,
    totalPatientCount:totalPatientCount.length,
    doctorTotalRevinue,
    formattedAppointmentStatusDistribution}) ;
    
 } ;


const getPatientMetaData=async(user:TAuthUser)=>{
    const patientInfo= await prisma.patience.findUniqueOrThrow({
        where:{
            email:user.email
        }
    })

   const patientAppointmentCount= await prisma.appointment.count({
    where:{
        patientId:patientInfo.id
    }
   });

   const prescriptionCount= await prisma.prescription.count({
    where:{
        patientId:patientInfo.id
    }
   }) ;

   const reviewsCount = await prisma.reviews.count({
    where:{
        patientId:patientInfo.id
    }
   }) ;

   const appointmentStatusDistribution=await prisma.appointment.groupBy({
    by:['status'],
    _count:{id:true},
    where:{
        patientId:patientInfo.id
    }
   })

   const formattedAppointmentStatusDistribution=appointmentStatusDistribution.map(({status,_count})=>({
    status:status,
    count:_count.id
   }))

   return({formattedAppointmentStatusDistribution,reviewsCount,prescriptionCount,patientAppointmentCount}) ;

}


export const metaServices = {
    fetchDashboardMetaData
}