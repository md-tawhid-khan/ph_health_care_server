import { Router } from "express";
import { userRoutes } from "../modules/user/userRouter";
import { adminRouters } from "../modules/admin/adminRouters";

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
] ;

 moduleRouter.forEach(route=>router.use(route.path,route.route)) ;

export default router ;