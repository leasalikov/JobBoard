import { NextResponse } from "next/server";
import prisma from "../../../prisma/client";

// export async function POST(request: Request) {
//     try {
//         const body = await request.json();
//         const job = await prisma.credentials.create({
//             data: body
//         })
//         return NextResponse.json({ message: "success add credential", success: true, job })
//     } catch (error) {
//         return NextResponse.json({ message: "Failed to add credential", success: false })
//     }
// }
//להביא את הקורות חיים לפי id
// export async function GET(request: Request) {
//     try {
//         const queryParams = new URL(request.url).searchParams;
//         let whereConditions: prisma;
//         const userId = queryParams.get('userId');
//         const job = await prisma.credentials.create({
//             data: body
//         })
//         return NextResponse.json({ message: "success add credential", success: true, job })
//     } catch (error) {
//         return NextResponse.json({ message: "Failed to add credential", success: false })
//     }
// }
