import { Request } from "express"
import { uploadImage } from "../../../helper/fileUploaders"
import prisma from "../../../shared/prisma";

const createSpecialities=async(req:Request)=>{
    if(req.file){
         const icon_url=await uploadImage(req.file?.path as string) ;
         req.body.icon=icon_url ;  

    }
  
  const result=await prisma.specialitist.create({
     data:req.body
  })
  
  return result ;

}

export const specialitiesServices={
    createSpecialities
}