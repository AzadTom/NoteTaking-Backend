import nodemailer from 'nodemailer';




export const sendEmail  = async(email,subject,host,resetToken)=>{


  try {


    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD
      }
    });
    
    let mailOptions = {
      from: process.env.MAIL,
      to: `${email}`,
      subject: `${subject}`,
      text: `You are receiving this email because you
       have requested  the reset  of the password for your account \n \n 
       Please click on the following link or paste this into your browser to complete the process:\n \n
       http://${host}/api/v1/users/reset/${resetToken}\n\n
       If you did not request this , please ignore this email and your password remain unchanged!`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });                   
    
  } catch (error) {
    
    console.log(error);
  }

}

