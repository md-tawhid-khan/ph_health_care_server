import { Router } from "express";
import { adminControllers } from "./adminController";

const router=Router()

router.get("/",adminControllers.getAllAdminDataFromDB);

router.get("/:id",adminControllers.getSingleAdminById);

router.patch("/:id",adminControllers.updateAdminById);

export const adminRouters=router ;