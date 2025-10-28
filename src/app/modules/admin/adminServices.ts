import { Admin, Prisma, userStatus, } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../shared/prisma";
import { TAdminFilterRequest } from "./admin.interface";
import { TAdminPagination } from "../../interface/pagination";


const getAllAdminDataFromDB=async(queryParams:TAdminFilterRequest,options:TAdminPagination)=>{
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
                        equals:(filterData as any)[key]
                    }
                }))
            
        })
    }

    addCondition.push({
        isDelete:false
    })
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


// -------get single admin data ------------

const getSingleAdminById=async(params:string)=>{
     const result=await prisma.admin.findUnique({
        where:{
            id:params,
           isDelete:false
        }
     });

     return result
}

const updateAdminById=async(params:string,data:Partial<Admin>)=>{
     await prisma.admin.findUniqueOrThrow({
         where:{
            id:params,
            isDelete:false,
        },

     } ) ;
     const result=await prisma.admin.update({
        where:{id:params},
        data
     });

     return result
}

const deleteAdminById=async(params:string)=>{
     await prisma.admin.findUniqueOrThrow({
         where:{id:params},
     } ) ;
     const result=await prisma.$transaction(async(transactionClient)=>{
        const deleteAdmin=await transactionClient.admin.delete({
            where:{
                id:params
            }
        });

       await transactionClient.user.delete({
            where:{
                email:deleteAdmin.email
            }
        });
        return deleteAdmin ;
     })

     return result ;
}

const softDeleteAdminById=async(params:string)=>{
     await prisma.admin.findUniqueOrThrow({
         where:{
            id:params,
            isDelete:false
         },
     } ) ;
     const result=await prisma.$transaction(async(transactionClient)=>{
        const deleteAdmin=await transactionClient.admin.update({
            where:{
                id:params
            },
          data: {
             isDelete:true
            } 
        });

        await transactionClient.user.update({
            where:{
                email:deleteAdmin.email
            },
            data:{
                status:userStatus.DELETED
            }
        });
        return deleteAdmin ;
     })

     return result ;
}


export const adminServices={
    getAllAdminDataFromDB,
    getSingleAdminById,
    updateAdminById,
    deleteAdminById,
    softDeleteAdminById
}