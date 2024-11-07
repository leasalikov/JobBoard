import { NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { sendCandidaciesToEmployerEmail } from "@/lib/sendEmail";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("i am here");
        
        const candidates = await prisma.candidacies.create({
            data: body,
            include: {
                job: true
            },
        });
        console.log("ggg",body)
        console.log("vvvv",candidates)

        const employer = await prisma.employers.findUnique({
            where: { id: candidates.job.employerId },
            include: {
                user: true
            },
        });
        if (!employer) {
            return null
        }
        sendCandidaciesToEmployerEmail(employer!.user.email, candidates)
        return NextResponse.json({ message: "success add credential", success: true, candidates })
    } catch (error) {
        return NextResponse.json({ message: "Failed to add credential", success: false })
    }
}

export async function GET(request: Request) {
    try {
        const queryParams = new URL(request.url).searchParams;
        const jobId = queryParams.get('jobId') as string;
        const candidacies = await prisma.candidacies.findMany({
            where: { jobId: jobId },
            include: {
                user: true
            }
        })
        return NextResponse.json({ message: "success find credential", success: true, candidacies })
    } catch (error) {
        return NextResponse.json({ message: "Failed to find credential", success: false })
    }
}
