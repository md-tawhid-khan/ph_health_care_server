import { Router } from "express";
import { authController } from "./authController";

const router=Router();

router.post('/login',authController.loginUser)

export const authRouter=router ;