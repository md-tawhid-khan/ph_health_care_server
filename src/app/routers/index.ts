import { specialitiesRouter } from './../modules/specialities/specialities.router';
import { Router } from "express";
import { userRoutes } from "../modules/user/userRouter";
import { adminRouters } from "../modules/admin/adminRouters";
import { authRouter } from "../modules/auth/authRouters";
import { advertisementRouter } from "../modules/advertisement/advertisementRouter";
import { doctorRouter } from '../modules/doctor/doctor.router';

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
    }
] ;

 moduleRouter.forEach(route=>router.use(route.path,route.route)) ;

export default router ;