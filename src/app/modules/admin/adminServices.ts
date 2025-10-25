
import { Prisma, } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../shared/prisma";





const getAllAdminDataFromDB=async(queryParams:any,options:any)=>{
const {searchTerm,...filterData}=queryParams ;

const {page,limit,sortOrder,sortBy,skip}=paginationHelper.calculatePagination(options);

    const addCondition:Prisma.AdminWhereInput[]=[];
    
    // [
    //         {
    //      name:{
    //         contains:queryParams,
    //         mode:'insensitive'
    //        }
    //     },
    //    {
    //     email:{
    //         contains:queryParams,
    //         mode:'insensitive'
    //     }
    //    }
    // ]

    const adminSearchableField=adminSearchableFields;

    if(searchTerm){
         addCondition.push({ OR:adminSearchableField.map(field=>({
            [field]:{
                contains:searchTerm,
                mode:'insensitive'
            }
         })) }
) ;
    } ;

    if(Object.keys(filterData).length>0){
        addCondition.push({
            AND:
                Object.keys(filterData).map(key=>({
                    [key]:{
                        equals:filterData[key]
                    }
                }))
            
        })
    }
// console.dir(addCondition,{depth:Infinity})
  const whereCondition :Prisma.AdminWhereInput={AND:addCondition};
   const result=await prisma.admin.findMany({
    where:whereCondition ,
    skip ,
    take:Number(limit),
    orderBy:{
       [sortBy]:sortOrder
    }
   }) ;

   const totalData= await prisma.admin.count({
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

const getSingleAdminById=async(params:string)=>{
     const result=await prisma.admin.findUnique({
        where:{id:params}
     });

     return result
}

const updateAdminById=async(params:string,data)=>{
     const result=await prisma.admin.update({
        where:{id:params},
        data
     });

     return result
}

export const adminServices={
    getAllAdminDataFromDB,
    getSingleAdminById,
    updateAdminById
}