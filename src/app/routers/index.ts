import { Router } from "express";
import { userRoutes } from "../modules/user/userRouter";
import { adminRouters } from "../modules/admin/adminRouters";
import { authRouter } from "../modules/auth/authRouters";

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
] ;

 moduleRouter.forEach(route=>router.use(route.path,route.route)) ;

export default router ;