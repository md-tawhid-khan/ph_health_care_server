import { Router } from "express";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "@prisma/client";
import { scheduleController } from "./schedule.controller";

const router=Router() ;

router.post("/create-schedule",authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN),scheduleController.createSchedule) ;

export const scheduleRouter = router ;