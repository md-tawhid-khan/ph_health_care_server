
import prisma from "../../../shared/prisma";
import { sslServices } from "../ssl/ssl.services";

const initPayment=async(appointmentId:string)=>{

    const paymentData=await prisma.payment.findFirstOrThrow({
        where:{
           id:appointmentId
        },
        include:{
            apppointment:{
                include:{
                    patient:true
                }
            }
        }
    }) ;

 const initPaymentData={
    amount:paymentData.amount,
    tran_id:paymentData.transactionId,
    name:paymentData.apppointment.patient.name,
    email:paymentData.apppointment.patient.email,
    address:paymentData.apppointment.patient.address,
    phoneNo:paymentData.apppointment.patient.contactNumber
 } ;

    const result=await sslServices.initPayment(initPaymentData);
    
    return result ;

}

export const paymentServices={
    initPayment
}