import  bcrypt  from 'bcrypt';

import { userRole } from "@prisma/client"
import prisma from "../src/shared/prisma"



const seedSuperAdmin=async()=>{
    const isSuperAdminExist=await prisma.user.findFirst({
        where:{
            role:userRole.SUPER_ADMIN
        }
    }) ;
    if(isSuperAdminExist){
        console.log("already exist super admin") ;
        return ;
    } ;

    const hashPassword=  bcrypt.hashSync("superadmin", 12);

    try {
        const superAdminData= await prisma.user.create({
        data:{
            email:"superadmin@gmail.com",
            password:hashPassword,
            role:userRole.SUPER_ADMIN,
            admin:{
                create:{
                    name:'superAdmin',
                    contactNumber:"01234567890"
                }
            }
        } 
    }) 

    console.log('created super admin successfully',superAdminData)  ;

    } catch (error) {
         console.log(error);
    } 
    finally {
        await prisma.$disconnect()
    }
} ;

seedSuperAdmin () ;