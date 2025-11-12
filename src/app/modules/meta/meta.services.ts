import { TAuthUser } from './../../interface/common';
import { userRole } from "@prisma/client";
import { TAuthUser } from "../../interface/common";
import prisma from "../../../shared/prisma";


const fetchDashboardMetaData=async(user:TAuthUser)=>{
     switch(user.role){
     case userRole.SUPER_ADMIN :
        getSuperAdminMetaData();
        break ;
     case userRole.ADMIN :
        getAdminMetaData()  
        break ;
    case userRole.DOCTOR :
        getDoctorMetaData(user) 
        break ;
    case userRole.PATIENT :
        getPatientMetaData()
        break ;
     default:
    throw new Error("invalid user role") ;  
    }
} ;

const getSuperAdminMetaData=async()=>{
       console.log('doctor meta data');  
}
const getAdminMetaData=async()=>{
     const totalDoctorCount=await prisma.doctor.count() ;
    const totalPatientCount=await prisma.patience.count();
    const totalAppointmentCount=await prisma.appointment.count();
    const totalPaymentCount=await prisma.payment.count();

    const totalRevenue = await prisma.payment.aggregate({
        _sum:{
            amount:true
        }
    }) ;

    console.log({totalAppointmentCount,totalDoctorCount,totalPatientCount,totalPaymentCount,totalRevenue}) ;

}
const getDoctorMetaData=async(user:TAuthUser)=>{
    const doctorInfo=await prisma.doctor.findUniqueOrThrow({
        where:{
            email:user.email
        }
    }) ;
    
    const totalAppointmentCount= await prisma.appointment.count();
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
            }
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

    console.log(formattedAppointmentStatusDistribution) ;
    
}
const getPatientMetaData=()=>{
    console.log('patient meta data');
}

export const metaServices = {
    fetchDashboardMetaData
}