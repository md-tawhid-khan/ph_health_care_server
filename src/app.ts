import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routers';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import status from 'http-status';
import cookieParser from 'cookie-parser' ;
import { appointmentServices } from './app/modules/appointment/appointment.services';
import cron from 'node-cron';

const app:Application=express() ;
app.use(cors()) ;
app.use(cookieParser())

app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;



cron.schedule('* * * * *', () => {
  try {
       appointmentServices.cancelledUnPaidAppointment() ;
  } catch (error) {
       console.log(error) ;
  }
});

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