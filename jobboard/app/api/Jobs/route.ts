import { NextResponse } from "next/server"
import prisma from "../../../prisma/client"
import { Prisma } from "@prisma/client";


export async function POST(request: Request) {
    try {
        const body = await request.json();
        let { salary, employerEmail, ...leftBody } = body
        console.log(employerEmail);
        const user = await prisma.users.findUnique({
            where: { email: employerEmail },
            include: {
                employer: true
            }
        })
        salary = parseInt(salary, 10);
        const job = await prisma.jobs.create({
            data: { ...leftBody, salary: salary, employerId: user?.employer?.id },
            include: {
                employer: true
            }
        })
        return NextResponse.json({ message: "success add job", success: true, job })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Failed to add job", success: false })
    }
}

export async function GET(request: Request) {
    try {
        const queryParams = new URL(request.url).searchParams;

        let whereConditions: Prisma.JobsWhereInput = {};

        const location = queryParams.get('location');
        if (location) {
            if (location.includes(',')) {
                const locations = location.split(',');
                whereConditions.location = {
                    in: locations,
                };
            } else {
                whereConditions.location = {
                    equals: location,
                };
            }
        }

        const type = queryParams.get('type');
        if (type) {
            if (type.includes(',')) {
                const types = type.split(',');
                whereConditions.type = {
                    in: types,
                };
            } else {
                whereConditions.location = {
                    equals: type,
                };
            }
        }

        const experienceLevel = queryParams.get('experienceLevel');
        if (experienceLevel) {
            whereConditions.experienceLevel = experienceLevel;
        }

        const salary = queryParams.get('salary');
        if (salary) {
            whereConditions.salary = {
                gte: parseInt(salary),
            };
        }

        const keyword = queryParams.get('keyword');
        if (keyword) {
            whereConditions.title = {
                mode: 'insensitive',
                contains: keyword,
            };
        }

        const category = queryParams.get('category');
        if (category) {
            if (category.includes(',')) {
                const categories = category.split(',');
                whereConditions.category = {
                    in: categories,
                };
            } else {
                whereConditions.category = {
                    equals: category,
                };
            }
        }

        const jobs = await prisma.jobs.findMany({
            where: whereConditions,
        });

        if (jobs.length > 0)
            return NextResponse.json({ message: "Success: Found jobs", success: true, jobs });
        else
            return NextResponse.json({ message: "There are no suitable jobs", success: false });
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch jobs", success: false });
    }
}

// export async function DELETE(request: Request) {
//     try {
//         const body = await request.json();
//         const response = await prisma.jobs.delete({
//             data: body
//         })
//     } catch (error) {
//         return NextResponse.json({ message: "Failed to delete job", success: false })
//     }
// }

// export async function PUT(request: Request) {
//     try {
//         const body = await request.json();
//         const response = await prisma.jobs.put({
//             data: body
//         })
//     } catch (error) {
//         return NextResponse.json({ message: "Failed to update job", success: false })
//     }
// }