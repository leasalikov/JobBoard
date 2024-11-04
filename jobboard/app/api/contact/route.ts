import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { Resend } from 'resend';
import { sendHelpRequestEmail } from "@/lib/sendEmail";


const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_MANAGER = process.env.EMAIL_MANAGER
const EMAIL_APP = process.env.EMAIL_APP


export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("❤️❤️❤️❤️❤️")
        // const { data, error } = await resend.emails.send({
        //     from: EMAIL_APP!,
        //     to: [EMAIL_MANAGER!],
        //     subject: 'new contect',
        //     react: EmailTemplate({ ...body }),
        // });
        // if (error) {
        //     console.log("Error sending email:", error);
        //     return NextResponse.json({ message: "not success sending contact", success: false });
        // }
        sendHelpRequestEmail(body)
        const contact = await prisma.contacts.create({
            data: {
                ...body,
            }
        })
        return NextResponse.json({ message: "success sending contact", success: true, contact });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "not success sending contact", success: false });
    }
}


