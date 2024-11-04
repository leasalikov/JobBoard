import prisma from "../../../../prisma/client";
import { NextResponse } from "next/server";

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
