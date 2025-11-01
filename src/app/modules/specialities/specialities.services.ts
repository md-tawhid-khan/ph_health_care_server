import { Request } from "express"
import { uploadImage } from "../../../helper/fileUploaders"
import prisma from "../../../shared/prisma";

const getAllSpecialities=async()=>{
    const result=await prisma.specialitist.findMany();

    return result ;
} ;

const createSpecialities=async(req:Request)=>{
    if(req.file){
         const icon_url=await uploadImage(req.file?.path as string) ;
         req.body.icon=icon_url ;  

    }
  
  const result=await prisma.specialitist.create({
     data:req.body
  })
  
  return result ;

} ;

const deleteSpecialities=async(specialitiesId : string)=>{
    const result=await prisma.specialitist.delete({
        where:{
            id:specialitiesId
        }
    }) ;
    return result ;
}

export const specialitiesServices={
    createSpecialities,
    getAllSpecialities,
    deleteSpecialities
}