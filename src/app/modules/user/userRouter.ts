
import  express  from "express" ;
import { userController } from "./userController";
import authTokenValidation from '../../middleware/authTokenValidation';
import { userRole } from "@prisma/client";
const router=express.Router() ;



router.post( '/',authTokenValidation(userRole.ADMIN,userRole.SUPER_ADMIN),userController.createAdmin);

export const userRoutes = router;
