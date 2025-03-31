import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const statuses = await prisma.Tusliin_tuluv_lavlah.findMany();
    return NextResponse.json(statuses);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const projects = await prisma.tusul.findMany({
                include: {
                    Tusliin_angilal_lavlah: true,
                    Tusliin_tuluv: {
                        include: { Tusliin_tuluv_lavlah: true },
                    },
                },
            });
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch projects' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const projectData = {
      projectName: formData.get("projectName"),
      projectCategory: formData.get("projectCategory"),
      projectStatus: formData.get("projectStatus"),
      projectStartDate: formData.get("projectStartDate"),
      projectEndDate: formData.get("projectEndDate"),
      projectDescription: formData.get("projectDescription"),
    };

    const tusliin_tuluv_ID = formData.get("Tusliin_tuluv_ID");
    const tusliin_angilal_ID = formData.get("Tusliin_angilal_lavlah_ID");

    const relatedData = await prisma.Tusul.findFirst({
      where: {
        Tusliin_tuluv_ID: tusliin_tuluv_ID,
        Tusliin_angilal_lavlah_ID: tusliin_angilal_ID
      }
    });

    const savedProject = await prisma.Tusul.create({
      data: {
        Tusul_ner: projectData.projectName,
        Angilal: projectData.projectCategory,
        Tusliin_tuluv_ID: tusliin_tuluv_ID,
        Tusliin_angilal_lavlah_ID: tusliin_angilal_ID
      }
    });

    return NextResponse.json(savedProject);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
