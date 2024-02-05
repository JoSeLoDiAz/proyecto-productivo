import nodemailer from "nodemailer"

const sendEmail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    ignoreTLS:true,
    auth: {
      user: 'repositoriointeligente1@gmail.com',
      pass: 'mdpi guwi tkzm rpxu'
    },
    tls:{
      rejectUnauthorized: false,
   //    ciphers: "SSLv3"
        },
  });

  sendEmail.verify().then(()=>{
    console.log('Listos para enviar el email');
  });

  export default sendEmail