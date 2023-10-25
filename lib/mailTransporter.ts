
const nodemailer = require('nodemailer');

const mailTransporter = (function createTransporter(){

    const createdTransport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

      return async function myTransporter( mailOptions: any){
                
       return await createdTransport.sendMail(mailOptions)
      }
})()

export default mailTransporter



// const mailOptions = {
//   from: 'your_email@gmail.com',
//   to: 'recipient@example.com',
//   subject: 'Notification Subject',
//   text: 'Notification Message',
// };

// transporter.sendMail(mailOptions, function(error, info) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

