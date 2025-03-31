import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    try {
        const paymentStates = await prisma.tulbur_tuluv_lavlah.findMany({
            select: {
                Tulbur_tuluv_lavlah_id: true,
                Tulbur_tuluv_ner: true,
            },
        });

        return new Response(JSON.stringify(paymentStates), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching payment states:", error);

        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { Tulbur_tuluv_lavlah_id, Tulbur_tuluv_ner } = body;

    const updatedState = await prisma.Tulbur_tuluv_lavlah.update({
      where: { Tulbur_tuluv_lavlah_id },
      data: { Tulbur_tuluv_ner },
    });

    return new Response(JSON.stringify({ message: "Payment state updated successfully", updatedState }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to update payment state", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
export async function DELETE(req) {
    try {
      const { Tulbur_tuluv_lavlah_id } = await req.json();
  
      await prisma.tulbur_tuluv_lavlah.delete({
        where: { Tulbur_tuluv_lavlah_id },
      });
  
      return new Response(JSON.stringify({ message: "Payment state deleted successfully" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: "Failed to delete payment state", error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }