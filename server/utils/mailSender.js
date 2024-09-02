const nodemailer=require('nodemailer');
require("dotenv").config();
const mailSender=async(email,title,body)=>{
  try{
    //Create Transporter
    let transporter=nodemailer.createTransport({
      host:process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
      },
    });

    //Send mail
    let info=await transporter.sendMail({
      from:"Confetti",
      to:`${email}`,
      subject:`${title}`,
      html:`${body}`
    });

    return info;
  }
  catch(err){
    console.log(err.message);
  }
}


module.exports=mailSender;