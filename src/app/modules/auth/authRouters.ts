import { Router } from "express";
import { authController } from "./authController";

const router=Router();

router.post('/login',authController.loginUser);

router.post('/refresh_token',authController.refreshToken);

export const authRouter=router ;