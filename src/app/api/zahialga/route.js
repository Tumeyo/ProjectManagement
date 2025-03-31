import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Fetch orders with necessary data, ensuring all needed fields are included
        const orders = await prisma.zahialga.findMany({
            include: {
                Tulbur: true,                    // Include related models as needed
                Zahialga_tuluv_lavhlah: true,
                Hereglegch: true,
                Baiguullaga: true,
            },
        });

        // Check the response to ensure it is correct and valid
        console.log("Fetched orders:", orders);  // Check the structure

        return new Response(JSON.stringify(orders), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch orders' }), {
            status: 500,
        });
    }
}
