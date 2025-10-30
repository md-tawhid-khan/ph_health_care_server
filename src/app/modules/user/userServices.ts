import {  userRole } from "@prisma/client";
import bcrypt from "bcrypt"
import prisma from "../../../shared/prisma";
import { uploadImage } from "../../../helper/fileUploaders";


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

export const userServices={
    createAdmin,
    createDoctor
} ;