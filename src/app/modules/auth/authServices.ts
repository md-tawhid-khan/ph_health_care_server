import { Payload } from './../../../../generated/prisma/internal/prismaNamespace';

import  bcrypt  from 'bcrypt';
import prisma from "../../../shared/prisma";
import generateToken, { verifyToken } from '../../../helper/jwtHelpers';
import { userStatus } from '../../../../generated/prisma/enums';
import config from '../../../config';



const loginUser=async(payload:{
    email:string,
    password:string
})=>{
    const userData=await prisma.user.findUnique({
        where:{
            email:payload.email,
            status:userStatus.ACTIVES
        }
    })

   const isCorrectPassword:boolean= await bcrypt.compare(payload.password,userData?.password as string);
   if(!isCorrectPassword){
    throw new Error("password is incorrect");
   }
 
    const accessToken =  generateToken({email:userData?.email,role:userData?.role},config.jwt_access_secret!,config.jwt_access_expire_in) ;

const refreshToken=generateToken({email:userData?.email,role:userData?.role},config.jwt_refresh_secret!,config.jwt_refresh_expire_in) ;

    return {
        accessToken,
    isPasswordChange:true,
    refreshToken
 };
} ;

//  ------------  refresh token create ------------

const refreshToken =async(token:string)=>{
    
    let decodedData ;
    try {
        decodedData= verifyToken(token,config.jwt_refresh_secret!)   ;
        
    } catch (error) {
        throw new Error("you are not authorized") ;
    }

    const userData=await prisma.user.findUnique({
        where:{
            email:decodedData?.email ,
            status:userStatus.ACTIVES
        }
    })
 
    const accessToken=generateToken({email:userData?.email,role:userData?.role},config.jwt_access_secret!,config.jwt_access_expire_in) ;

    return{ accessToken,
    isPasswordChange:true,};

}


// -----------------password change ------------------

const userPasswordChange=async(user:any,payload:any)=>{
   
   const userData=await prisma.user.findUniqueOrThrow({
    where:{
        email:user.email,
        status:userStatus.ACTIVES
    }
   });

     const isCorrectPassword : boolean= await bcrypt.compare(payload.oldPassword,userData?.password as string);
   if(!isCorrectPassword){
    throw new Error("password is incorrect");
   }
   
   const hashedPassword=bcrypt.hashSync(payload.newPassword, 12);
    
   const changePassword=await prisma.user.update({
    where:{
        email:userData.email
    },
    data:{
        password:hashedPassword,
        needPasswordChange:false 
    }
   })
  return changePassword ;
}

export const authServices={
    loginUser,
    refreshToken,
    userPasswordChange
}