import { Prisma, PrismaClient } from "@prisma/client"

const prisma=new PrismaClient();

const getAllAdminDataFromDB=async(queryParams:string)=>{

    const addCondition:Prisma.AdminWhereInput[]=[];

    if(queryParams){
         addCondition.push({ OR:[
            {
         name:{
            contains:queryParams,
            mode:'insensitive'
           }
        },
       {
        email:{
            contains:queryParams,
            mode:'insensitive'
        }
       }
    ] }
) 
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