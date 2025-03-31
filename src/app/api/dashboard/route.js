import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const hereglegch = await prisma.hereglegch.count();
    const tusul = await prisma.tusul.count();
    const setgegdel = await prisma.setgegdel.count();

    return new Response(
      JSON.stringify({
        hereglegchCount: hereglegch,
        tusulCount: tusul,
        setgegdelCount: setgegdel,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data: ", error);
    return new Response('Error fetching data', { status: 500 });
  }
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
      const projects = await prisma.project.findMany();
      res.status(200).json(projects);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }