import {  userRole } from "@prisma/client";
import bcrypt from "bcrypt"
import prisma from "../../../shared/prisma";
import { uploadImage } from "../../../helper/fileUploaders";


const createAdmin =async(req:any)=>{
  
const image_url = await uploadImage(req.file.path) ;

    
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

export const userServices={
    createAdmin
} ;