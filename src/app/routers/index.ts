import { specialitiesRouter } from './../modules/specialities/specialities.router';
import { Router } from "express";
import { userRoutes } from "../modules/user/userRouter";
import { adminRouters } from "../modules/admin/adminRouters";
import { authRouter } from "../modules/auth/authRouters";
import { advertisementRouter } from "../modules/advertisement/advertisementRouter";
import { doctorRouter } from '../modules/doctor/doctor.router';
import { patientRouter } from '../modules/patient/patient.router';
import { scheduleRouter } from '../modules/schedule/schedule.router';
import { doctorScheduleRouter } from '../modules/doctorSchedule/doctorSchedule.router';
import { appointmentRouter } from '../modules/appointment/appointment.router';
import { paymentRouter } from '../modules/payment/payment.router';
import { prescriptionRouter } from '../modules/prescription/prescription.router.';

const router=Router()

const moduleRouter=[
    {
      path:'/user',
      route:userRoutes
    },
    {
      path:'/admin',
      route:adminRouters
    },
    {
      path:'/auth',
      route:authRouter
    },
    {
      path:'/advertisement',
      route:advertisementRouter
    },
    {
      path:'/specialities',
      route:specialitiesRouter
    } ,
    {
      path:'/doctor',
      route:doctorRouter
    },
    {
      path:'/patient',
      route:patientRouter
    },
    {
      path:'/schedule',
      route:scheduleRouter
    },
    {
      path:'/doctor-schedule',
      route:doctorScheduleRouter
    },
    {
      path:'/appointment',
      route:appointmentRouter
    },
    {
      path:'/payment',
      route:paymentRouter
    },
    {
      path:'/prescription',
      route:prescriptionRouter
    }
] ;

 moduleRouter.forEach(route=>router.use(route.path,route.route)) ;

export default router ;