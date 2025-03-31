import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const payments = await prisma.tulbur.findMany({
      include: {
        Tulbur_tuluv_lavlah: true,
        Tulbur_turul_lavlah: true,
        Zahialga: true,
      },
    });

    return new Response(JSON.stringify(payments), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch payments' }), {
      status: 500,
    });
  } 
}
