import { adminControllers } from "./adminController";
import validationMiddleware from "../../middleware/validationMiddleware";
import { adminValidation } from "./adminValidation";
import { Router } from "express";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "@prisma/client";


const router=Router() ;

router.get("/",authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN),adminControllers.getAllAdminDataFromDB);

router.get("/:id",authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN),adminControllers.getSingleAdminById);

router.patch("/:id",authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN),validationMiddleware(adminValidation.update),adminControllers.updateAdminById);

router.delete("/:id",authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN),adminControllers.deleteAdminById) ;

router.delete("/soft/:id",authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN),adminControllers.softDeleteAdminById) ;


export const adminRouters=router ;