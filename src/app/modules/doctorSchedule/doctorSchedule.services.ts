import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../shared/prisma";
import { TAuthUser } from "../../interface/common";
import { TAdminPagination } from "../../interface/pagination";

const createDoctorSchedule=async(user:any,payload:{scheduleIds:string[]})=>{
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

const getDoctorSchedule=async(queryParams: any,options:TAdminPagination,user:TAuthUser)=>{

    const {startDate,endDate,...filterableFields}=queryParams ;
    const {page,limit,skip,sortOrder,sortBy} =paginationHelper.calculatePagination(options);


  const addCondition:Prisma.DoctorScheduleWhereInput[]=[] ;

  if(startDate && endDate) {
    addCondition.push({AND:[
      {schedule:{
        startDateTime:{
          gte:startDate
        }
      }},
      {schedule:{
        endDateTime:{
          lte:endDate
        }
      }}
    ]}) ;
  } ;

 
  if(filterableFields && Object.keys(filterableFields).length>0){
    if(typeof filterableFields.isBooked==='string' && filterableFields.isBooked === 'true'){
      filterableFields.isBooked=true ;
    }
    else if(typeof filterableFields.isBooked==='string' && filterableFields.isBooked==='false'){
    filterableFields.isBooked=false
   }
     addCondition.push({AND: Object.keys(filterableFields).map(field=>({
        [field]:{
            equals:filterableFields[field] 
        }
     }))

     })
  };

  
const whereCondition:Prisma.DoctorScheduleWhereInput={AND:addCondition} ;

  // console.dir(whereCondition,{depth:'infinity'}) ;

   const result=await prisma.doctorSchedule.findMany({
    where:whereCondition,
    skip,
    take:Number(limit),
    
   }) ;
   

   const totalData=await prisma.doctorSchedule.count({
   where:whereCondition,
   }) ;
   
   return {
    meta:{page,limit,totalData},
    data:result
   } ;
};


export const doctorScheduleServices={
    createDoctorSchedule,
    getDoctorSchedule
} ;