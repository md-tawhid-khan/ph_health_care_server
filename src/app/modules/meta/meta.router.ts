import { Router } from "express";
import { metaController } from "./meta.controller";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "@prisma/client";

const router=Router() ;

router.get('/',authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN,userRole.DOCTOR,userRole.PATIENT), metaController.fetchDashboardMetaData) ;

export const metaRouter=router ;