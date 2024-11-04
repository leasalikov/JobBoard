import prisma from "../../../../prisma/client";
import { NextResponse,  } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await request.json();
        const { phone, image, ...leftBody } = body;

        const responseFromUsers = await prisma.users.update({
            where: { id: id },
            data: {
                phone: phone,
                image: image,
            }
        })
        const responseFromEmployers = await prisma.employers.update({
            where: { userId: id },
            data: leftBody
        })
        return NextResponse.json({ message: "success update employer", success: true, responseFromUsers, responseFromEmployers });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "not success update employer", success: false });
    }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const user = await prisma.users.findUnique({
            where: { id: id as string }
        });

        const employer = await prisma.employers.findUnique({
            where: { userId: id as string }
        });

        return NextResponse.json({ message: "success get employer", success: true, jobSearcher: { ...user, ...employer } });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "not success get employer", success: false });
    }
}


