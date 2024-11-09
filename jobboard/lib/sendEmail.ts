import nodemailer from 'nodemailer';
import { EmailTemplateProps } from '../types/emailTemplate'
import { Candidacies } from '@prisma/client';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_MANAGER,
        pass: process.env.EMAIL_PASS
    }
});

export function sendHelpRequestEmail(emailDetails: EmailTemplateProps) {
    let mailOptions = {
        from: process.env.EMAIL_MANAGER,
        to: process.env.EMAIL_APP,
        subject: 'new contact from Joboard applaction',
        html: ` 
            <div style="font-family: Arial, sans-serif; text-align: right; direction: rtl; color: #0066cc;">
                <h4>name: ${emailDetails.name}</h4>
                <h4>phone: ${emailDetails.phone}</h4>
                <h4>email: ${emailDetails.email}</h4>
                <h4>message: ${emailDetails.message}</h4>
            </div> `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}



export function sendPasswordChangeEmail(userEmail: string, otp: string) {

    let mailOptions = {
        from: process.env.EMAIL_MANAGER,
        to: userEmail,
        subject: 'password recovery in website',
        html: `
               <div style="font-family: Arial, sans-serif; text-align: right; direction: rtl; color: #0066cc;">
              <p>Hello!</p>
              <p>A password change request has been received by the system.</p>
              <p>Your password recovery code is: <strong>${otp}</strong></p>
              <p>the code on the password recovery page on the website to continue.</p>
              <p>Greetings,</p>
              <p>Site team</p>
          </div>
            `
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export function sendCandidaciesToEmployerEmail(employerEmail: string, candidacies:Candidacies) {

    let mailOptions = {
        from: process.env.EMAIL_MANAGER,
        to: employerEmail,
        subject: 'A new candidacy for the position that has been promoted',
        html: `
               <div style="font-family: Arial, sans-serif; text-align: right; direction: rtl; color: #0066cc;">
              <p>Hello!</p>
              <p>Here are the details about the candidate</p>
              <p><strong>${candidacies.coverLetter}</strong></p>
              <p><strong>${candidacies.resume}</strong></p>
              </div>
            `
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}









