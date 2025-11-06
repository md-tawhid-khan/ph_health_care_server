import { addHours, addMinutes, format } from "date-fns";
import prisma from "../../../shared/prisma";
import { Prisma, Schedule } from "@prisma/client";
import { TQueryParams, TSchedule } from "./schedule.constant";
import { paginationHelper } from "../../../helper/paginationHelper";
import { TAuthUser } from "../../interface/common";
import { TAdminPagination } from "../../interface/pagination";

const createSchedule=async(payload : TSchedule):Promise<Schedule[]>=>{
   
const {startDate,endDate,startTime,endTime}=payload ;

const currentDate=new Date(startDate) ;

const lastDate=new Date(endDate) ;

const intervalTime= 30 ;

const schedule=[] ;

while(currentDate<=lastDate){
     const startDateTime=new Date(
      addMinutes(addHours(`${format(currentDate,'yyyy-MM-dd')}`,Number(startTime.split(':')[0])),Number(startTime.split(':')[1])) 
        
     ) ;

     const endDateTime=new Date(
      addMinutes( addHours(`${format(currentDate,'yyyy-MM-dd')}`,Number(endTime.split(':')[0])),Number(endTime.split(':')[1]))
       )


    

     while(startDateTime < endDateTime){
         

           const scheduleData={
            startDateTime : startDateTime,
            endDateTime :addMinutes(startDateTime,intervalTime)
           } ;

           const existingScheduleData= await prisma.schedule.findFirst({
            where:{
               startDateTime:scheduleData.startDateTime,
               endDateTime:scheduleData.endDateTime
            }
           }) ;

           if(!existingScheduleData){
             const result=await prisma.schedule.create({
            data:scheduleData
          }) ;
          
           schedule.push(result);

           }

           startDateTime.setMinutes(startDateTime.getMinutes()+intervalTime) ;
     }

     currentDate.setDate(currentDate.getDate()+1) ;
}

return schedule  ;

} ;

const getAllSchedule=async(queryParams:TQueryParams | any,options:TAdminPagination,user:TAuthUser)=>{

    const {startDate,endDate,...filterableFields}=queryParams ;
    const {page,limit,skip,sortOrder,sortBy} =paginationHelper.calculatePagination(options);


  const addCondition:Prisma.ScheduleWhereInput[]=[] ;

  if(startDate && endDate) {
    addCondition.push({AND:[
      {startDateTime:{
         gte:startDate
      }},
      {endDateTime:{
         lte:endDate
      }}
    ]}) ;
  } ;

 
  if(filterableFields && Object.keys(filterableFields).length>0){
     addCondition.push({AND: Object.keys(filterableFields).map(field=>({
        [field]:{
            equals:filterableFields[field] 
        }
     }))

     })
  };

  
const whereCondition:Prisma.ScheduleWhereInput={AND:addCondition} ;

//   console.dir(whereCondition,{depth:'infinity'}) ;

const getDoctorSchedule=await prisma.doctorSchedule.findMany({
   where:{
      doctor:{
         email:user?.email
      }
   }
}) ;

 const schedulIds=getDoctorSchedule.map(schedule=>schedule.scheduleId) ;

   const result=await prisma.schedule.findMany({
    where:{...whereCondition,
      id:{notIn:schedulIds}
    },
    skip,
    take:Number(limit),
    orderBy:{
        [sortBy]:sortOrder
    },
 
   }) ;

   const totalData=await prisma.schedule.count({
   where:{...whereCondition,
      id:{notIn:schedulIds}
    },
   }) ;
   
   return {
    meta:{page,limit,totalData},
    data:result
   } ;
};

const getSingleSchedule=async(user:any,scheduleId:any)=>{
       const result=await prisma.schedule.findUniqueOrThrow({
         where:{
            id:scheduleId
         }
       }) ;

       return result ;
}


export const scheduleService={
    createSchedule,
    getAllSchedule,
    getSingleSchedule
}