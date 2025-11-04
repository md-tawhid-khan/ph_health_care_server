
import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../../helper/paginationHelper";
import { TUpdatePatientData } from "./patient.interface";

const getAllPatientData=async(queryParams:any,options:any)=>{

    const {searchTerm,...filterableFields}=queryParams ;
    const {page,limit,skip,sortOrder,sortBy} =paginationHelper.calculatePagination(options);


  const addCondition:Prisma.PatienceWhereInput[]=[] ;

  const searchAbleField=['name','email','contactNumber','address'] ;

  if(searchTerm){
       addCondition.push({
        OR:searchAbleField.map(field=>({
            [field]:{
                contains:searchTerm,
                mode:'insensitive'
            }
        }))
       })
  }

  if(filterableFields && Object.keys(filterableFields).length>0){
     addCondition.push({AND: Object.keys(filterableFields).map(field=>({
        [field]:{
            equals:filterableFields[field]
        }
     }))

     })
  };

  
const whereCondition:Prisma.PatienceWhereInput={AND:addCondition} ;

//   console.dir(whereCondition,{depth:'infinity'}) ;
  
   const result=await prisma.patience.findMany({
    where:whereCondition,
    skip,
    take:Number(limit),
    orderBy:{
        [sortBy]:sortOrder
    },
include:{
    patientHealthData:true,
    medicalReport:true
}  
   }) ;

   const totalData=await prisma.patience.count({
    where:whereCondition
   }) ;
   
   return {
    meta:{page,limit,totalData},
    data:result
   } ;
};

const getSinglePatientData=async(params:string)=>{
    const result=await prisma.patience.findUniqueOrThrow({
        where:{
            id:params 
        },
        include:{
            patientHealthData:true,
            medicalReport:true 
        }
    }) ;
    return result ;
} ;

const updatePatientData=async(patientId:string,updateData:TUpdatePatientData)=>{
    const {medicalReport,patientHealthData,...patientData}=updateData ;
      const patientInfo=await prisma.patience.findUniqueOrThrow({
        where:{
            id:patientId,
            isDelete:false 
        }
      }) ;

       await prisma.$transaction(async(transactionClient)=>{
        if(patientData){
               await transactionClient.patience.update({
            where:{
                id:patientInfo.id,
                isDelete:false
            },
            data:patientData
        }) ;
        }
       
        
      if(patientHealthData){
         await transactionClient.patientHealthData.upsert({
            where:{
                patientId:patientInfo.id,               
            },
            update:patientHealthData,
            create:{...patientHealthData,patientId:patientInfo.id}
        }) ;
      }

        

        if(medicalReport){
            await transactionClient.medicalReport.create({
            data:{...medicalReport,patientId:patientInfo.id}
        }) ;
       
        }
        
      }) ;
     

      const updatedPatientInformation=await prisma.patience.findUniqueOrThrow({
        where:{
            id:patientInfo.id
        },
        include:{
            patientHealthData:true,
            medicalReport:true
        }
      }) ;

      return updatedPatientInformation
} ;

const deletePatientData=async(patientId:string)=>{
    const patientInfo=await prisma.patience.findUniqueOrThrow({
        where:{
            id:patientId,
        }
    }) ;
    
    const result=await prisma.$transaction(async(transactionClient)=>{
        await transactionClient.patientHealthData.delete({
            where:{
                patientId:patientInfo.id
            }
        }) ;
      await transactionClient.medicalReport.deleteMany({
            where:{
                patientId:patientInfo.id
            }
        }) ;
 

      const patientDelete= await transactionClient.patience.delete({
            where:{
                id:patientInfo.id
            }
        }) ;
 

       await transactionClient.user.delete({
            where:{
                email:patientInfo.email
            }
        }) ;

        return patientDelete ;
    })
 return result ;
}

export const patientServices={
    getAllPatientData,
    getSinglePatientData,
    updatePatientData,
    deletePatientData
}
