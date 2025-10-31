
import  express, { NextFunction, Request, Response }  from "express" ;
import { userController } from "./userController";
import authTokenValidation from '../../middleware/authTokenValidation';
import { userRole } from "@prisma/client";
import upload from "../../../helper/fileUploaders";
import validationMiddleware from "../../middleware/validationMiddleware";
import { userValidation } from "./userValidation";

const router=express.Router() ;

router.get('/',authTokenValidation(userRole.ADMIN,userRole.SUPER_ADMIN),userController.getAllUserDataFromDB) ;

router.get('/me',authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN,userRole.DOCTOR,userRole.PATIENT),userController.getMyProfile) ;

router.post( '/create-admin',authTokenValidation(userRole.ADMIN,userRole.SUPER_ADMIN),upload.single('file'),(req:Request,res:Response,next:NextFunction)=>{
    req.body=JSON.parse(req.body.data);
    next()
  },validationMiddleware(userValidation.createAdminValidation),userController.createAdmin);


router.post( '/create-doctor',authTokenValidation(userRole.ADMIN,userRole.SUPER_ADMIN),upload.single('file'),(req:Request,res:Response,next:NextFunction)=>{
    req.body=JSON.parse(req.body.data);
    next()
  },validationMiddleware(userValidation.createDoctorValidation),userController.createDoctor);

router.post( '/create-patience',upload.single('file'),(req:Request,res:Response,next:NextFunction)=>{
    req.body=JSON.parse(req.body.data);
    next()
  },validationMiddleware(userValidation.createPatienceValidation),userController.createPatience);


router.post( '/change-status/:id',authTokenValidation(userRole.ADMIN,userRole.SUPER_ADMIN),validationMiddleware(userValidation.changeUserValidation),userController.changeUserStatus);


router.patch( '/update-my-profile',authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN,userRole.DOCTOR,userRole.PATIENT),upload.single('file'),(req:Request,res:Response,next:NextFunction)=>{
    req.body=JSON.parse(req.body.data);
    next()
  },userController.updateMyProfile);

export const userRoutes = router;


 