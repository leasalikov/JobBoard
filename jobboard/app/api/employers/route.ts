import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const password = body.password;
        const hashPassword = await bcrypt.hash(password, 10).then(function (hash: string) { return hash });
        const user = await prisma.users.create({
            data: {
                ...body,
                password: hashPassword
            }
        })
        return NextResponse.json({ message: "success register user", success: true, user });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "not success register user", success: false });
    }
}