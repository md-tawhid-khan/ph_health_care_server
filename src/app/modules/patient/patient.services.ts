
import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../../helper/paginationHelper";

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

const updatePatientData=async()=>{
    console.log(' update patient data ')
}

export const patientServices={
    getAllPatientData,
    getSinglePatientData,
    updatePatientData
}
