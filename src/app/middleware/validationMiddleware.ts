import { NextFunction, Request, Response } from "express";

const validationMiddleware=(schema:any)=>{
   
        return  async(req:Request,res:Response,next:NextFunction)=>{
           
            try {
                await schema.parseAsync({
                    body:req.body});
                    
               return   next();
            } catch (error) {
                
                next(error) ;
            }   ;
}

 } ;

 export default validationMiddleware ;