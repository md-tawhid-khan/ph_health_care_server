import  express  from "express" ;
import { userController } from "./userController";
const router=express.Router() ;

router.post( '/',userController.createAdmin);

export const userRoutes = router;
