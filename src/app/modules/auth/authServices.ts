
import  bcrypt  from 'bcrypt';
import prisma from "../../../shared/prisma";
import generateToken from '../../../helper/jwtHelpers';




const loginUser=async(payload:{
    email:string,
    password:string
})=>{
    const userData=await prisma.user.findUnique({
        where:{
            email:payload.email
        }
    })

   const isCorrectPassword= await bcrypt.compare(payload.password,userData?.password as string);
   if(!isCorrectPassword){
    throw new Error("password is incorrect");
   }
 
    const accessToken =  generateToken({email:userData?.email,role:userData?.role},'abcdef','5m') ;

const refreshToken=generateToken({email:userData?.email,role:userData?.role},'abcdefg','30d') ;

    return {
        accessToken,
    isPasswordChange:true,
    refreshToken
 };
} ;

export const authServices={
    loginUser
}