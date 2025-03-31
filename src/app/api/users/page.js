import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request) {
    const prisma = new PrismaClient();
    await prisma.$connect();
    const user = await prisma.user.findMany(
        { where: { id: 1 } }
    );
    await prisma.$disconnect();
    return NextResponse.json({
        user
    });
}

export async function POST(request) {
    const postFormData = await request.json()
    console.log(postFormData)
    const prisma = new PrismaClient();
    await prisma.$connect();
    const user = await prisma.user.create(
        { data: postFormData }
    );
    await prisma.$disconnect();
    return NextResponse.json({
        user
    });
}
