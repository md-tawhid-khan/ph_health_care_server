import prisma from "../../../shared/prisma";

const getAllDoctorData=async()=>{
   const result=await prisma.doctor.findMany() ;
   return result ;
} ;

export const doctorServices={
    getAllDoctorData
} ;