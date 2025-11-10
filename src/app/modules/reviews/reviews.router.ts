import { Router } from "express";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "@prisma/client";
import { reviewsController } from "./reviews.controller";

const router=Router();
router.post("/create-reviews",authTokenValidation(userRole.PATIENT),reviewsController.createReviews) ;

export const reviewsRouter= router ;