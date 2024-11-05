import prisma from "../../../../prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendPasswordChangeEmail } from "@/lib/sendEmail";

const saltRounds = 10;

export async function GET(req: Request, { params }: { params: { email: string } }) {
    try {
        const { email } = params;

        const user = await prisma.users.findUnique({
            where: { email: email as string }
        });

        return NextResponse.json({ message: "success get user", success: true, user: { ...user } });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "not success get user", success: false });
    }
}

export async function PATCH(req: Request, { params }: { params: { email: string } }) {
    try {
        const { email } = params;
        const body = await req.json();
        const user = await prisma.users.update({
            where: { email: email },
            data: body
        });

        return NextResponse.json({ message: "success updaet user", success: true, user: { ...user } });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "not success updaet user", success: false });
    }
}


function generateOtp(length = 6) {
    return crypto.randomBytes(length).toString('hex').slice(0, length).toUpperCase();
}

export async function PUT(req: Request, { params }: { params: { email: string } }) {
    try {
        const { email } = params;
        const body = await req.json();
        const result = await prisma.users.findUnique({ where: { email } });

        const { OTP, newPassword } = body;

        if (!result || result.OTP !== OTP) {
            return NextResponse.json({ message: "The verification code is invalid", success: false });
        }

        const hashedPassword = await bcrypt.hash(newPassword, saltRounds).then(function (hash: string) { return hash });;

        await prisma.users.update({
            where: { email },
            data: { password: hashedPassword, OTP: null }
        });

        return NextResponse.json({ message: "Password updated successfully", success: true });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "update failed", success: false });
    }
}

export async function POST(req: Request, { params }: { params: { email: string } }) {
    try {
        const { email } = params;

        const otp = generateOtp();

        await prisma.users.update({
            where: { email },
            data: { OTP: otp }
        });

        await sendPasswordChangeEmail(email, otp);

        return NextResponse.json({ message: "OTP successfully sent to email", success: true });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "update failed", success: false });
    }
}
