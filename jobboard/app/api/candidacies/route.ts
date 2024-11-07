import { NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { sendCandidaciesToEmployerEmail } from "@/lib/sendEmail";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("body----------------------", body);
        const { userEmail, ...leftBody } = body

        const user = await prisma.users.findUnique({
            where: { email: userEmail },
            include: {
                jobSearcher: true
            }
        })

        const candidates = await prisma.candidacies.create({
            data: { ...leftBody, jobSearcherId: user?.jobSearcher?.id },
            include: {
                job: true
            },
        });

        console.log("candidates----------------------", candidates)

        const employer = await prisma.employers.findUnique({
            where: { id: candidates.job.employerId },
            include: {
                user: true
            },
        });

        console.log("candidates----------------------", candidates)

        if (!employer) {
            throw ""
        }
        sendCandidaciesToEmployerEmail(employer!.user.email, candidates)
        return NextResponse.json({ message: "success add candidate", success: true, candidates })
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "Failed to add candidate", success: false, error })
    }
}

export async function GET(request: Request) {
    try {
        const queryParams = new URL(request.url).searchParams;
        const jobId = queryParams.get('jobId') as string;
        const candidacies = await prisma.candidacies.findMany({
            where: { jobId: jobId },
            include: {
                jobSearcher: true
            }
        })
        return NextResponse.json({ message: "success find candidate", success: true, candidacies })
    } catch (error) {
        return NextResponse.json({ message: "Failed to find candidate", success: false })
    }
}
