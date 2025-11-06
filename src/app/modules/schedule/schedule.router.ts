import { Router } from "express";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "@prisma/client";
import { scheduleController } from "./schedule.controller";

const router=Router() ;

router.get('/',authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN,userRole.DOCTOR),scheduleController.getAllSchedule) ;

router.post("/create-schedule",authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN),scheduleController.createSchedule) ;

router.get("/:id",authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN,userRole.DOCTOR),scheduleController.getSingleSchedule) ;

export const scheduleRouter = router ;