// Import Prisma Client
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Your API route handler
export async function GET(req) {
    try {
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get('page')) || 1; // Default to page 1
        const limit = parseInt(url.searchParams.get('limit')) || 5; // Default to limit 5 if not provided

        console.log(`Page: ${page}, Limit: ${limit}`); // Debug log to check the parameters

        const skip = (page - 1) * limit;

        // Fetch users using Prisma
        const hereglegch = await prisma.hereglegch.findMany({
            skip,
            take: limit, // This takes the 'limit' variable
        });

        // If no data is found, log and respond with empty array
        if (!hereglegch || hereglegch.length === 0) {
            console.log('No members found');
            return new Response(JSON.stringify([]), { status: 200 });
        }

        console.log('Fetched members:', hereglegch); // Debug log to check fetched members
        return new Response(JSON.stringify(hereglegch), { status: 200 });
    } catch (error) {
        console.error('Error fetching members:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch members', details: error.message }), { status: 500 });
    }
}
