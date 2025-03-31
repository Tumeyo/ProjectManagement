import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const admins = await prisma.admin.findMany();
    return new Response(JSON.stringify(admins), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch admins' }), {
      status: 500,
    });
  }
}
