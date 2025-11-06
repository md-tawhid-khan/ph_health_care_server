import { Router } from "express";
import { doctorScheduleController } from "./doctorSchedule.controller";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "@prisma/client";


const router=Router();

router.post("/",authTokenValidation(userRole.SUPER_ADMIN,userRole.DOCTOR),doctorScheduleController.createDoctorSchedule) ;

router.get("/my-schedule",authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN,userRole.DOCTOR),doctorScheduleController.getDoctorSchedule) ;

router.delete("/my-schedule/:scheduleId",authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN,userRole.DOCTOR),doctorScheduleController.deleteDoctorSchedule) ;

export const doctorScheduleRouter=router ;