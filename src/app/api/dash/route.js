import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch necessary data from the database
    const openProjects = await prisma.project.count({
      where: { status: 'Open' },
    });
    const completedProjects = await prisma.project.count({
      where: { status: 'Completed' },
    });
    const clockedInUsers = await prisma.user.count({
      where: { isClockedIn: true },
    });

    // Return the data as a JSON response
    return new Response(
      JSON.stringify({
        openProjects,
        completedProjects,
        clockedInUsers,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch dashboard metrics' }),
      { status: 500 }
    );
  }
}
