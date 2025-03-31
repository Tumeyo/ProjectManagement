import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    try {
        const projectStates = await prisma.tusliin_tuluv_lavlah.findMany({
            select: {
                Tusliin_tuluv_lavlah_id: true,
                Tusliin_tuluv_lavlah_ner: true,
            },
        });

        return new Response(JSON.stringify(projectStates), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching project states:", error);

        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { Tusliin_tuluv_lavlah_id, Tusliin_tuluv_lavlah_ner } = body;

    const updatedState = await prisma.Tusliin_tuluv_lavlah.update({
      where: { Tusliin_tuluv_lavlah_id },
      data: { Tusliin_tuluv_lavlah_ner },
    });

    return new Response(JSON.stringify({ message: "Project state updated successfully", updatedState }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to update project state", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
export async function DELETE(req) {
    try {
      const { Tusliin_tuluv_lavlah_id } = await req.json(); // Parse JSON body
  
      await prisma.Tusliin_tuluv_lavlah.delete({
        where: { Tusliin_tuluv_lavlah_id },
      });
  
      return new Response(JSON.stringify({ message: "Project state deleted successfully" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: "Failed to delete project state", error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }