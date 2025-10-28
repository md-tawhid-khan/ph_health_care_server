
import  express  from "express" ;
import { userController } from "./userController";
import authTokenValidation from '../../middleware/authTokenValidation';
const router=express.Router() ;



router.post( '/',authTokenValidation('ADMIN','SUPERADMIN'),userController.createAdmin);

export const userRoutes = router;
