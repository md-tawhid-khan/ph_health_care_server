import {  Prisma, userRole } from "@prisma/client";
import bcrypt from "bcrypt"
import prisma from "../../../shared/prisma";
import { uploadImage } from "../../../helper/fileUploaders";
import { TAdminPagination } from "../../interface/pagination";
import { paginationHelper } from "../../../helper/paginationHelper";
import { TUserFilterRequest } from "./user.interface";
import { userSearchableFields } from "./user.constant";


const createAdmin =async(req:any)=>{
  
const image_url:string | undefined = await uploadImage(req.file.path as string) ;

    
    const{password,admin}=req.body;
    const hashedPassword=bcrypt.hashSync(password, 12);
    const userData={
       email:admin.email,
            password:hashedPassword,
            role:userRole.ADMIN      
    } ;
   const adminData={
     ...admin,
     profilePhoto:image_url
   }

  

    const result=await prisma.$transaction(async(transaction)=>{
        await transaction.user.create({data:userData});
        const createAdmin=await transaction.admin.create({data:adminData}) ;
        return createAdmin ;
    }
)
   
    return result ;
} ;

const createDoctor=async(req:any)=>{
    const image_url:string | undefined = await uploadImage(req.file.path as string) ;
   const{password,doctor}=req.body;
    
     const hashedPassword=bcrypt.hashSync(password, 12);
    const userData={
       email:doctor.email,
            password:hashedPassword,
            role:userRole.DOCTOR     
    } ;
   const doctorData={
     ...doctor,
     profilePhoto:image_url
   } ;

   
   
    const result=await prisma.$transaction(async(transaction)=>{
        await transaction.user.create({data:userData});
        const createDoctor=await transaction.doctor.create({data:doctorData}) ;
        return createDoctor ;
    }
)
   
    return result ;

}

const createPatience=async(req:any)=>{
   
    const image_url:string | undefined = await uploadImage(req.file.path as string) ;
    
   const{password,patience}=req.body;
    
     const hashedPassword=bcrypt.hashSync(password, 12);
    const userData={
       email:patience.email,
            password:hashedPassword,
            role:userRole.PATIENT   
    } ;
   const patienceData={
     ...patience,
     profilePhoto:image_url
   } ;

   
    const result=await prisma.$transaction(async(transaction)=>{
        await transaction.user.create({data:userData});
        const createDoctor=await transaction.patience.create({data:patienceData}) ;
        return createDoctor ;
    }
)
   
    return result ;

}


const getAllUserDataFromDB=async(queryParams:TUserFilterRequest,options:TAdminPagination)=>{
const {searchTerm,...filterData}=queryParams ;

const {page,limit,sortOrder,sortBy,skip}=paginationHelper.calculatePagination(options);

    const addCondition:Prisma.UserWhereInput[]=[];
    
   

    const userSearchableField=userSearchableFields;

    if(searchTerm){
         addCondition.push({ OR:userSearchableField.map(field=>({
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

   
// console.dir(addCondition,{depth:Infinity})
  const whereCondition :Prisma.UserWhereInput={AND:addCondition};
  


   const result=await prisma.user.findMany({
    where:whereCondition ,
    skip ,
    take:Number(limit),
    orderBy:{
       [sortBy]:sortOrder
    }
   }) ;


   const totalData= await prisma.user.count({
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


export const userServices={
    createAdmin,
    createDoctor,
    createPatience,
    getAllUserDataFromDB
} ;