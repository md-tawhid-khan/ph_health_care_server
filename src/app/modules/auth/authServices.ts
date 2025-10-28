
import  bcrypt  from 'bcrypt';
import prisma from "../../../shared/prisma";
import generateToken, { verifyToken } from '../../../helper/jwtHelpers';
import { userStatus } from '../../../../generated/prisma/enums';



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

//  ------------  refresh token create ------------

const refreshToken =async(token:string)=>{
    
    let decodedData ;
    try {
        decodedData= verifyToken(token,'abcdefg')   ;
        
    } catch (error) {
        throw new Error("you are not authorized") ;
    }

    const userData=await prisma.user.findUnique({
        where:{
            email:decodedData?.email ,
            status:userStatus.ACTIVES
        }
    })
 
    const accessToken=generateToken({email:userData?.email,role:userData?.role},'abcdef','5m') ;

    return{ accessToken,
    isPasswordChange:true,};

}


export const authServices={
    loginUser,
    refreshToken
}