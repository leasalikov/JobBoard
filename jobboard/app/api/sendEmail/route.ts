import { NextApiRequest, NextApiResponse } from 'next';
// import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("eeeeeeeeee ");

    if (req.method === 'POST') {
        const { name, phone, email } = req.body;

        // Create a Nodemailer transporter with your email configuration
        let transporter = nodemailer.createTransport({
            // Your email configuration
        });

        const userEmail = req.body.email;
        console.log("user email: ", userEmail);

        // Send the email
        await transporter.sendMail({
            from: 'leasalikov@email.com',
            to: 'leasalikov@gmail.com',
            subject: 'New Contact Form Submission',
            text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}`
        });

        res.status(200).json({ message: 'Email sent successfully' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}