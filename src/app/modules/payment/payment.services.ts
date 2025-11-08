
import prisma from "../../../shared/prisma";
import { sslServices } from "../ssl/ssl.services";

import { PaymentStatus } from "@prisma/client";

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

// ssl commerz ipn listener query
// HTTP POST Parameters will be throw to the IPN_HTTP_URL as amount=1150.00&bank_tran_id=151114130739MqCBNx5&card_brand=VISA&card_issuer=BRAC+BANK%2C+LTD.&card_issuer_country=Bangladesh&card_issuer_country_code=BD&card_no=432149XXXXXX0667&card_type=VISA-Brac+bank¤cy=BDT&status=VALID&store_amount=1104.00&store_id=mtit68e0f88b936ef&tran_date=2015-11-14+13%3A07%3A12&tran_id=5646dd9d4b484&val_id=151114130742Bj94IBUk4uE5GRj&verify_sign=de32b0e96ef38fb26cee769d10d9a4cf&verify_key=amount%2Cbank_tran_id%2Ccard_brand%2Ccard_issuer%2Ccard_issuer_country%2Ccard_issuer_country_code%2Ccard_no%2Ccard_type%2Ccurrency%2Cstatus%2Cstore_amount%2Cstore_id%2Ctran_date%2Ctran_id%2Cval_id 

const validatePayment=async(payload:any)=>{

//    if(!payload || !payload.status || (payload.staus==='VALID')){
//     return{
//         message:"invalid payment"
//     }
//    } ;

//    const response=await sslServices.validatePayment(payload) ;

//    if(response?.status !== 'VALID'){
//         return{
//         message:"payment failed"
//     }
//    }
   const response=payload  //only use for localshot to text purpose other wise use upper code in production . dont forget it .
   await prisma.$transaction(async(tx)=>{
    const updatePaymentData= await tx.payment.update({
        where:{
            transactionId:response.tran_id
        },
        data:{
            status:PaymentStatus.PAID,
            paymentGatewayData:response
        }
     });

     await tx.appointment.update({
        where:{
            id:updatePaymentData.appointmentId
        },
        data:{
            paymentStatus:PaymentStatus.PAID
        }
    
   })
}) ;
}

export const paymentServices={
    initPayment,
    validatePayment
}