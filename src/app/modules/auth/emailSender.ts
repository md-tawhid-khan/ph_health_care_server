import nodemailer from 'nodemailer' ;
import config from '../../../config';

export const sendMail=async(email:string,html:string)=>{
// Create a test account or replace with real credentials.
const transporter =nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user:config.emailSender.email,
    pass: config.emailSender.app_password,
  },
});

// Wrap in an async IIFE so we can use await.

  const info = await transporter.sendMail({
    from: 'ph-health-care ,<md.tawhid.khan1998@gmail.com>',
    to:email,
    subject: "reset your password within 10 minutes",
    text: "reset your password within 10 minutes",// plain‑text body
     html // HTML body
  });

  console.log("Message sent:", info.messageId);


}