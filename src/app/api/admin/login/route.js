import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request) {
    const postFormData = await request.json()
    console.log(postFormData)
    const prisma = new PrismaClient();
    await prisma.$connect();
    const admin = await prisma.admin.findFirst(
        { where: {login_name: postFormData.name} }
    );
    if(admin === null) {
        return NextResponse.json({
            admin: null
        });
    }
    if(admin.login_password !== postFormData.password) {
        return NextResponse.json({
            admin: null
        });
    }
    console.log(admin)
    await prisma.$disconnect();
    return NextResponse.json({
        admin
    });
}