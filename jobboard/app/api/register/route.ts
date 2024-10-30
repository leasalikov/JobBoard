import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { objectEnumNames } from "@prisma/client/runtime/library";
import { signIn } from "next-auth/react";


//שלב א
//sign in - 
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
      const credentials=   await signIn('credentials', { ...body })
      console.log(credentials+"😡💔🙍‍♀️🥗🌸🩹🥰🎟🎫");
      
        return NextResponse.json({ message: "success register user", success: true, user });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "not success register user", success: false });
    }
}