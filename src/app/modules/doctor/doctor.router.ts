import { Router } from "express";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "@prisma/client";
import { doctorController } from "./doctor.controller";

const router=Router() ;

router.get('/',authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN),doctorController.getAllDoctorData) ;

export const doctorRouter=router ;
