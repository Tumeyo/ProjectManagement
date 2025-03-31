import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    const { userId } = params;

    try {
        const projects = await prisma.tusul.findMany({
            where: {
                Tusliin_bagiin_gishuun: {
                    some: { Hereglegch_ID: userId },
                },
                Tusliin_angilal_lavlah: {
                    some: {
                        Hereglegch: {
                            some: {
                                Hereglegch_angilal: {
                                    Hereglegch_angilal_ner: "Төслийн менежер",
                                },
                            },
                        },
                    },
                },
            },
            include: {
                Tusliin_angilal_lavlah: {
                    include: {
                        Hereglegch: {
                            include: {
                                Hereglegch_angilal: {
                                    where: {
                                        Hereglegch_angilal_ner: "Төслийн менежер",
                                    },
                                },
                            },
                        },
                    },
                },
                Tusliin_tuluv: {
                    include: {
                        Tusliin_tuluv_lavlah: true,
                    },
                },
            },
        });

        return new Response(JSON.stringify(projects), { status: 200 });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return new Response(JSON.stringify({ message: 'An error occurred while fetching projects.', error }), { status: 500 });
    }
}
export async function POST(req) {
    await prisma.$connect();

    try {
        const data = await req.json();

        const { Tusul_ner, Ehleh_hugatsaa, Duusah_hugatsaa, Tailbar, Tusliin_angilal_lavlah_ID, Tusliin_tuluv_ID } = data;

        if (!Tusul_ner || !Tusliin_angilal_lavlah_ID || !Tusliin_tuluv_ID) {
            return new Response(JSON.stringify({ message: 'Missing required fields.' }), { status: 400 });
        }

        const newProject = await prisma.tusul.create({
            data: {
                Tusul_ner,
                Ehleh_hugatsaa: Ehleh_hugatsaa ? new Date(Ehleh_hugatsaa) : null,
                Duusah_hugatsaa: Duusah_hugatsaa ? new Date(Duusah_hugatsaa) : null,
                Tailbar,
                Tusliin_angilal_lavlah_ID,
                Tusliin_tuluv_ID,
            },
        });

        return new Response(JSON.stringify(newProject), { status: 201 });
    } catch (error) {
        console.error('Error creating project:', error);
        return new Response(JSON.stringify({ message: 'An error occurred while creating the project.', error }), { status: 500 });
    }
}
