import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request) {
    const postFormData = await request.json()
    console.log(postFormData)
    const prisma = new PrismaClient();
    await prisma.$connect();
    const user = await prisma.hereglegch.findFirst(
        { where: {Hereglegch_email: postFormData.email} }
    );
    if(user === null) {
        return NextResponse.json({
            user: null
        });
    }
    if(user.Hereglegch_login_password !== postFormData.password) {
        return NextResponse.json({
            user: null
        });
    }
    await prisma.$disconnect();
    return NextResponse.json({
        user
    });
}