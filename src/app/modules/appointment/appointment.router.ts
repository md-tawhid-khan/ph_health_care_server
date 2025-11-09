import { Router } from "express";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "@prisma/client";
import { appointmentController } from "./appointment.controller";

const router=Router() ;

router.post("/create-appointment",authTokenValidation(userRole.PATIENT),appointmentController.createAppointment) ;

router.get("/my-appointment",authTokenValidation(userRole.PATIENT,userRole.DOCTOR),appointmentController.getMyAppointment) ;

router.get("/",authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN),appointmentController.getAllAppointment) ;

router.patch('/change-status/:appointmentId',authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN,userRole.DOCTOR),appointmentController.changeAppointmentStatus) ;

export const appointmentRouter=router ;