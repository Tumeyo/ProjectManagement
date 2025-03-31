// pages/api/categories/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const categories = await prisma.Tusliin_angilal_lavlah.findMany();

        return new Response(JSON.stringify(categories), { status: 200 });
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return new Response(JSON.stringify({ message: 'Failed to get categories' }), { status: 500 });
    }
}
