import prisma from "../../../../prisma/client";
import { NextResponse } from "next/server";

export async function PUT(request: Request,  { params }: { params: { email: string } }) {
    try {
        const { email } = params;
        const body = await request.json();
        const { phone, image, ...leftBody } = body;

        const responseFromUser = await prisma.users.update({
            where: { email: email },
            data: {
                phone: phone,
                image: image,
            }
        })

        const responseFromJobSearcher = await prisma.jobSearchers.update({
            where: { userId: responseFromUser.id },
            data: leftBody
        })
        return NextResponse.json({ message: "success update jobSearcher", success: true, responseFromUser, responseFromJobSearcher });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "not success update jobSearcher", success: false });
    }
}

export  async function GET(req: Request,  { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        const user = await prisma.users.findUnique({
            where: { id: id as string }
        });

        const jobSearcher = await prisma.jobSearchers.findUnique({
            where: { userId: id as string }
        });

        return NextResponse.json({ message: "success get jobSearcher", success: true, jobSearcher: { ...user, ...jobSearcher } });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "not success get jobSearcher", success: false });
    }
}