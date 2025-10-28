import { Router } from "express";
import { authController } from "./authController";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "@prisma/client";

const router=Router();

router.post('/login',authController.loginUser);

router.post('/refresh_token',authController.refreshToken);

router.post('/change-password',authTokenValidation(userRole.ADMIN,userRole.SUPER_ADMIN,userRole.DOCTOR,userRole.PATIENT), authController.userPasswordChange);

export const authRouter=router ;