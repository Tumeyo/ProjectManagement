import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const companies = await prisma.baiguullaga.findMany({
      include: {
        Hereglegch: true,
        Zahialga: true,
      },
    });

    return new Response(JSON.stringify(companies), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching companies:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch companies' }), {
      status: 500,
    });
  }
}
