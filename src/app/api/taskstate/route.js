import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    try {
        const taskStates = await prisma.daalgavar_tuluv_lavlah.findMany({
            select: {
                Daalgavar_tuluv_lavlah_id: true,
                Daalgavar_tuluv_lavlah_ner: true,
            },
        });

        return new Response(JSON.stringify(taskStates), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching task states:", error);

        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { Daalgavar_tuluv_lavlah_id, Daalgavar_tuluv_lavlah_ner } = body;

    const updatedState = await prisma.Daalgavar_tuluv_lavlah.update({
      where: { Daalgavar_tuluv_lavlah_id },
      data: { Daalgavar_tuluv_lavlah_ner },
    });

    return new Response(JSON.stringify({ message: "Task state updated successfully", updatedState }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to update task state", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
export async function DELETE(req) {
    try {
      const { Daalgavar_tuluv_lavlah_id } = await req.json();
  
      await prisma.Daalgavar_tuluv_lavlah.delete({
        where: { Daalgavar_tuluv_lavlah_id },
      });
  
      return new Response(JSON.stringify({ message: "Task state deleted successfully" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: "Failed to delete task state", error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }