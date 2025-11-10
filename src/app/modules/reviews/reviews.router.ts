import { Router } from "express";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "@prisma/client";
import { reviewsController } from "./reviews.controller";

const router=Router();
router.post("/create-reviews",authTokenValidation(userRole.PATIENT),reviewsController.createReviews) ;

router.post("/",authTokenValidation(userRole.SUPER_ADMIN,userRole.ADMIN),reviewsController.getAllReviews) ;

export const reviewsRouter= router ;