import { Router } from "express";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "@prisma/client";
import { appointmentController } from "./appointment.controller";

const router=Router() ;

router.post("/create-appointment",authTokenValidation(userRole.PATIENT),appointmentController.createAppointment) ;

export const appointmentRouter=router ;