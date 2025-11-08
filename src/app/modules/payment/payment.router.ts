import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router() ;

router.get('/ipn',paymentController.validatePayment) ;

router.post('/init-payment/:appointmentId',paymentController.initPayment) ;

export const paymentRouter=router ;