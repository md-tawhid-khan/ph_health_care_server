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
        getDoctorMetaData() 
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
const getDoctorMetaData=()=>{
    console.log('doctor meta data');
}
const getPatientMetaData=()=>{
    console.log('patient meta data');
}

export const metaServices = {
    fetchDashboardMetaData
}