import prisma from "../../../prisma/client";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    try {
        const queryParams = new URL(request.url).searchParams;
        const id = queryParams.get('id') as string;
        const body = await request.json();
        const { phone, image, ...leftBody } = body;

        const responseFromUser = await prisma.users.update({
            where: { id: id },
            data: {
                phone: phone,
                image: image,
            }
        })
        const responseFromJobSearcher = await prisma.jobSearchers.update({
            where: { userId: id },
            data: leftBody
        })
        return NextResponse.json({ message: "success update jobSearcher", success: true, responseFromUser, responseFromJobSearcher });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "not success register jobSearcher", success: false });
    }
}
