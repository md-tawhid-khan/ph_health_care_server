import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { Prisma } from "@prisma/client";

const globalErrorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
    let statusCode:number=status.INTERNAL_SERVER_ERROR ;
    let success=false ;
    let message = err.message || "something went wrong";
    let error = err

   if (
  err instanceof Prisma.PrismaClientValidationError ) {
  statusCode = status.BAD_REQUEST;
  message = "Validation error";
  error = err.message
}
else if (err instanceof Prisma.PrismaClientKnownRequestError){
  if(err.code ==='P2002'){
    message= 'duplicate key error';
    error=err.meta
  }
}

    res.status(statusCode).json({
        success,
        message,
        error 
    })
} ;

export default globalErrorHandler ;
