import axios from "axios";
import config from "../../../config";
import apiError from "../../errors/apiError";
import status from "http-status";
import { TPaymentData } from "./ssl.interface";

const initPayment=async(paymentData:TPaymentData)=>{
  try {
    const data = {
        store_id:config.ssl.store_id,
        store_passwd:config.ssl.store_passwd,
        total_amount:paymentData.amount,
        currency: 'BDT',
        tran_id: paymentData.tran_id, // use unique tran_id for each api call
        success_url:config.ssl.success_url,
        fail_url:config.ssl.fail_url,
        cancel_url:config.ssl.cancel_url,
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'N/A',
        product_name: 'N/A',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: paymentData.name,
        cus_email: paymentData.email,
        cus_add1: paymentData.address,
        cus_add2: 'N/A',
        cus_city: 'N/A',
        cus_state: 'N/A',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: paymentData.phoneNo,
        cus_fax: '01711111111',
        ship_name: 'N/A',
        ship_add1: 'N/A',
        ship_add2: 'N/A',
        ship_city: 'N/A',
        ship_state: 'N/A',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

     const response=await axios ({
        method:'POST',
        url:config.ssl.sslPaymentApi!,
        data:data,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
     })

    return response.data.GatewayPageURL;
  } catch (error) {
    throw new apiError(status.BAD_REQUEST,"payment error occured") ;
  }

};

const validatePayment=async(payload:any)=>{
try {
  const response=await axios({
    method:"GET",
    url:`${config.ssl.sslValidationApi}?val_id=${payload.val_id}&store_id=${payload.store_id}&store_passwd=${config.ssl.store_passwd}&format=json`
   }) ;
   return response.data ;
} catch (error) {
  throw new apiError(status.BAD_REQUEST,"payment validation error")
}
}

export const sslServices={
    initPayment,
    validatePayment
}