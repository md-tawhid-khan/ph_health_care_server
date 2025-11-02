import { Router } from "express";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "@prisma/client";
import { doctorController } from "./doctor.controller";

const router=Router() ;

router.get('/',authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN),doctorController.getAllDoctorData) ;

router.get('/:id',authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN,userRole.DOCTOR),doctorController.getSingleDoctorData) ;

router.delete('/:id',authTokenValidation(userRole.SUPER_ADMIN),doctorController.deleteDoctorData) ;

router.delete('/soft/:id',authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN,userRole.DOCTOR),doctorController.softDeleteDoctorData) ;

router.patch('/update/:id',authTokenValidation(userRole.DOCTOR,userRole.SUPER_ADMIN),doctorController.updateDoctorData) ;

export const doctorRouter=router ;
