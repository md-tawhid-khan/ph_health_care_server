import { NextFunction, Request, Response, Router } from "express";
import { specialitiesController } from "./specialities.controller";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "@prisma/client";
import upload from "../../../helper/fileUploaders";
import validationMiddleware from "../../middleware/validationMiddleware";
import { specialitiesValidation } from "./specialitiesValidation";

const router=Router()

 router.get('/',authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN),specialitiesController.getAllSpecialities) ;

router.post('/create-specialities',authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN),upload.single('file'),(req:Request,res:Response,next:NextFunction)=>{
    req.body=JSON.parse(req.body.data);
    next()
  },validationMiddleware(specialitiesValidation.createSpecilitiesValidation),specialitiesController.createSpecialities) ;

export const specialitiesRouter = router ;