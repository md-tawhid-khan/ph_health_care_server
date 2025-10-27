import { adminControllers } from "./adminController";
import validationMiddleware from "../../middleware/validationMiddleware";
import { adminValidation } from "./adminValidation";
import { Router } from "express";


const router=Router() ;

router.get("/",adminControllers.getAllAdminDataFromDB);

router.get("/:id",adminControllers.getSingleAdminById);

router.patch("/:id",validationMiddleware(adminValidation.update),adminControllers.updateAdminById);

router.delete("/:id",adminControllers.deleteAdminById) ;

router.delete("/soft/:id",adminControllers.softDeleteAdminById) ;


export const adminRouters=router ;