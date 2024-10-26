import { NextResponse } from "next/server"
import prisma from "../../../prisma/client"


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const job = await prisma.jobs.create({
            data: body
        })
        return NextResponse.json({ message: "success add job", success: true, job })
    } catch (error) {
        return NextResponse.json({ message: "Failed to add job", success: false })
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const response = await prisma.jobs.delete({
            data: body
        })
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete job", success: false })

    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const response = await prisma.jobs.put({
            data: body
        })
    } catch (error) {
        return NextResponse.json({ message: "Failed to update job", success: false })

    }
}