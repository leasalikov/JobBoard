import prisma from "../../../../prisma/client";
import { NextResponse, } from "next/server";

export async function PUT(request: Request, { params }: { params: { email: string } }) {
    try {
        const { email } = params;
        const body = await request.json();
        const { phone, image, company, ...leftBody } = body;

        const dataToUpdate: { phone?: string, image?: string } = {}
        if (phone)
            dataToUpdate.phone = phone

        if (image)
            dataToUpdate.image = phone

        const user = await prisma.users.update({
            where: { email: email },
            data: dataToUpdate
        })

        if (user?.type != "employer")
            throw "user not allow to update"
        const { links, ...leftCompany } = company
        let companyResulte;
        if (company)
            companyResulte = await prisma.companies.upsert({
                where: { email: company.email },
                update: {},
                create: leftCompany
            })

        links.map(async (link: { name: string, value: string }) => {
            return await prisma.links.create({
                data: { ...link, companyId: company.id }
            })
        })

        const employer = await prisma.employers.upsert({
            where: { userId: user.id },
            update: leftBody,
            create: { ...leftBody, userId: user.id, companyId: companyResulte?.id }
        })


        return NextResponse.json({ message: "success update employer", success: true, user, employer });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "not success update employer", success: false });
    }
}

export async function GET(req: Request, { params }: { params: { email: string } }) {
    try {
        const { email } = params;
        const user = await prisma.users.findUnique({
            where: { email: email },
        });

        if (user?.type != "employer")
            throw "user not allow to update"

        const employer = await prisma.employers.findUnique({
            where: { userId: user?.id },
            include: { company: true }
        });

        return NextResponse.json({ message: "success get employer", success: true, employer: { ...user, ...employer } });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "not success get employer", success: false });
    }
}


