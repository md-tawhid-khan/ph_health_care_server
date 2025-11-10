import { Router } from "express";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "@prisma/client";
import { prescriptionController } from "./prescription.controller";

const router =Router() ;

router.post("/create-prescription",authTokenValidation(userRole.DOCTOR),prescriptionController.createPrescription) ;

router.get("/my-prescription",authTokenValidation(userRole.PATIENT),prescriptionController.getPatientPrescription) ;

export const prescriptionRouter=router ;