import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/userRouter';
import { adminRouters } from './app/modules/admin/adminRouters';

const app:Application=express() ;
app.use(cors()) ;

app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;

app.get('/',(req:Request,res:Response)=>{
       res.send({
        message:'ph_health_care_server'
       });
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRouters);

export default app ;