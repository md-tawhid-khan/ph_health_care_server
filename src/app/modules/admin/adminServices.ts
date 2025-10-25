
import { Prisma, PrismaClient } from "@prisma/client"

const prisma=new PrismaClient();

const getAllAdminDataFromDB=async(queryParams:any)=>{
const {searchTerm,...filterData}=queryParams ;

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

    const adminSearchableField=['name','email'] ;

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
    where:whereCondition 
   }) ;
   return result ;
}

export const adminServices={
    getAllAdminDataFromDB
}