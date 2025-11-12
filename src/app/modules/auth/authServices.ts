
import  bcrypt  from 'bcrypt';
import prisma from "../../../shared/prisma";
import generateToken, { verifyToken } from '../../../helper/jwtHelpers';
import { userStatus } from '../../../../generated/prisma/enums';
import config from '../../../config';
import { sendMail } from './emailSender';
import apiError from '../../errors/apiError';
import status from 'http-status';




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
} ;

const forgetPassword=async(payload:any)=>{
    const userData=await prisma.user.findUniqueOrThrow({
        where:{
            email:payload.email,
            status:userStatus.ACTIVES
        } 
    });

    const resetPasswordToken= generateToken({email:userData.email,role:userData.role},config.jwt_access_secret as string,config.jwt_reset_password_token_expire_in)
    // console.log(resetPasswordToken)
    // http://localhost:3000/reset-password?email=mdtawhidkhan1998@gmail.com&token=shfkghdfggf

const resetPassLink=config.reset_password_link + `?email=${userData.email}&token=${resetPasswordToken}` ;

 await sendMail(userData.email,
    `
    <div>
    <h1>Dear User</h1>
    <p>Your password reset link 
    <a href=${resetPassLink}>
       <button>reset password</button>
    </a>
    </p>
    </div>`)

} ;

// -----------  reset password  ---------------

const resetPassword=async(token:any, payload:any)=>{
   
    const userInfo= verifyToken(token,config.jwt_access_secret as string);
    if(!userInfo){
        throw new apiError(status.UNAUTHORIZED,"the token is not valid");
    }
   
 const isUserExist=await prisma.user.findUniqueOrThrow({
    where:{
        email:userInfo.email,
        status:userStatus.ACTIVES
    }
 })
 if(!isUserExist){
    throw new apiError(status.NOT_FOUND,"user is not  exits ");
 } ;
 const hashedNewPassword=await bcrypt.hash(payload.newPassword,12);

 const resetPassword=await prisma.user.update({
    where:{
        email:userInfo.email,
        status:userStatus.ACTIVES
    },
    data:{
        password:hashedNewPassword
    }
 }) ;


}

export const authServices={
    loginUser,
    refreshToken,
    userPasswordChange,
    forgetPassword,
    resetPassword
}