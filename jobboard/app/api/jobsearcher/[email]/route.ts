import { Recommendations } from "@prisma/client";
import prisma from "../../../../prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { email: string } }) {
    try {
        const { email } = params;

        const user = await prisma.users.findUnique({
            where: { email: email }
        });

        if (user?.type != "jobsearcher")
            throw "user not found"

        const jobSearcher = await prisma.jobSearchers.findUnique({
            where: { userId: user?.id },
            include: { recommendations: true }
        });

        return NextResponse.json({ message: "success get jobSearcher", success: true, jobSearcher: { ...user, ...jobSearcher } });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "not success get jobSearcher", success: false });
    }
}

export async function PUT(request: Request, { params }: { params: { email: string } }) {
    try {
        const { email } = params;
        const body = await request.json();
        const { phone, image, recommendations, ...leftBody } = body;
        const dataToUpdate: { phone?: string, image?: string } = {}
        if (phone)
            dataToUpdate.phone = phone

        if (image)
            dataToUpdate.image = phone

        const user = await prisma.users.update({
            where: { email: email },
            data: dataToUpdate,
        })

        if (user?.type != "jobsearcher")
            throw "user not allow to update"



        const jobSearcher = await prisma.jobSearchers.upsert({
            where: { userId: user.id },
            update: leftBody,
            create: { ...leftBody, userId: user.id },
        })

        recommendations.map(async (rec: { email: string, phone: string }) => {
            return await prisma.recommendations.create({
                data: { ...rec, userId: jobSearcher.id }
            })
        })
        return NextResponse.json({ message: "success update jobSearcher", success: true, user, jobSearcher });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "not success update jobSearcher", success: false });
    }
}

