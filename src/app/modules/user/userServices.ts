import {  userRole } from "@prisma/client";
import bcrypt from "bcrypt"
import prisma from "../../../shared/prisma";


const createAdmin =async(data:any)=>{
    const{password,admin}=data ;
    const hashedPassword=bcrypt.hashSync(password, 12);
    const userData={
       email:admin.email,
            password:hashedPassword,
            role:userRole.ADMIN      
    } ;
   
    const result=await prisma.$transaction(async(transaction)=>{
        await transaction.user.create({data:userData});
        const createAdmin=await transaction.admin.create({data:admin}) ;
        return createAdmin ;
    }
)
   
    return result ;
} ;

export const userServices={
    createAdmin
} ;