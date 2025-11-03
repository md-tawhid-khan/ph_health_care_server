import { Router } from "express";
import { patientController } from "./patient.controller";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "@prisma/client";

const router=Router();

router.get('/',authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN),patientController.getAllPatientData)

router.get('/:id',authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN,userRole.PATIENT),patientController.getSinglePatientData)

router.patch('/:id',authTokenValidation(userRole.SUPER_ADMIN,userRole.PATIENT),)

export const patientRouter=router ;