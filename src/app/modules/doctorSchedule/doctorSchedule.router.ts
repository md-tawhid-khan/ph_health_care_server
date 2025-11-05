import { Router } from "express";
import { doctorScheduleController } from "./doctorSchedule.controller";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "@prisma/client";


const router=Router();
router.post("/",authTokenValidation(userRole.SUPER_ADMIN,userRole.DOCTOR),doctorScheduleController.createDoctorSchedule) ;

export const doctorScheduleRouter=router ;