import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
export async function POST(request) {
 
    const req = await request.json();
    const{user,artist,userinfo}=req;
    // Create a transporter using your email service credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jtllibary@gmail.com', // Your email address
        pass: 'kfrn ltjv htyh plsf', // Your email password or app-specific password
      },
    });

    // Function to send email
    const mailOptions = {
      from: 'jtllibary@gmail.com', // Sender's email address
      to: artist.artisteEmail, // Recipient's email address
      subject: 'Message from JTL', // Email subject
      text: `User ${userinfo.name} email ${user.email} would like to do business with you.`, // Email body in plain text
    };

    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      
     
      return NextResponse.json({msg:'Email sent successfully',status:200})
    } catch (error) {
      console.error('Error occurred:', error);
      
      return NextResponse.json({msg:'Error sending email',status:500})
    } 
}