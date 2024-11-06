import { NextResponse } from "next/server";
import prisma from "../../../prisma/client";

export async function POST(request: Request) {
    try {
        const body =await request.json();
        const candidates = await prisma.candidacies.create({
            data: body
        });
        return NextResponse.json({ message: "success add credential", success: true, candidates })
    } catch (error) {
        return NextResponse.json({ message: "Failed to add credential", success: false })
    }
}

export async function GET(request: Request) {
    try {
        const queryParams = new URL(request.url).searchParams;
        const jobId = queryParams.get('jobId') as string;
        const job = await prisma.candidacies.findMany({
            where: { jobId: jobId },
            include: {
                user: true
            }
        })
        return NextResponse.json({ message: "success find credential", success: true, job })
    } catch (error) {
        return NextResponse.json({ message: "Failed to find credential", success: false })
    }
}
