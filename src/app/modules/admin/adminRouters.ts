import { Router } from "express";
import { adminControllers } from "./adminController";

const router=Router()

router.get("/",adminControllers.getAllAdminDataFromDB)

export const adminRouters=router ;