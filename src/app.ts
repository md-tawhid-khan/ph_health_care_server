import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/userRouter';
import { adminRouters } from './app/modules/admin/adminRouters';
import router from './app/routers';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import status from 'http-status';

const app:Application=express() ;
app.use(cors()) ;

app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;

app.get('/',(req:Request,res:Response)=>{
       res.send({
        message:'ph_health_care_server'
       });
});

app.use('/api/v1', router);

app.use(globalErrorHandler) ;

app.use((req:Request,res:Response,next:NextFunction)=>{
       res.status(status.NOT_FOUND).json({
              success:false,
              message:'api not found',
              error:{
                     path:req.originalUrl,
                     message:'your requested path is not found'
              }
       })
})


export default app ;