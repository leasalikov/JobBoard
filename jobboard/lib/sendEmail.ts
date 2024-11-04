import nodemailer from 'nodemailer';
import { EmailTemplateProps } from '../types/emailTemplate'
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_MANAGER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
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







