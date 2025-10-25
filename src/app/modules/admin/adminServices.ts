
import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";
const prisma=new PrismaClient();

const calculatePagination=(options:{
    page?:string,
    limit?:string,
    sortOrder?:string,
    sortBy?:string
})=>{
      const page:number=Number(options.page)  || 1 ;
      const limit:number = Number(options.limit) || 10 ;
      const skip = (page-1)*limit ;

      return {
        page,
        limit,
        skip,
        sortOrder:options.sortOrder || 'desc',
        sortBy:options.sortBy || 'createAt'
      }

}


const getAllAdminDataFromDB=async(queryParams:any,options:any)=>{
const {searchTerm,...filterData}=queryParams ;

const {page,limit,sortOrder,sortBy,skip}=calculatePagination(options);

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
   return result ;
}

export const adminServices={
    getAllAdminDataFromDB
}