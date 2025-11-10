import { Router } from "express";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "@prisma/client";
import { prescriptionController } from "./prescription.controller";

const router =Router() ;

router.post("/create-prescription",authTokenValidation(userRole.DOCTOR),prescriptionController.createPrescription) ;

export const prescriptionRouter=router ;