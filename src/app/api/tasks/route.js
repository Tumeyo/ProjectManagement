import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch all tasks (GET)
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return new Response(JSON.stringify(tasks), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch tasks' }),
      { status: 500 }
    );
  }
}

// Create a new task (POST)
export async function POST(req) {
  try {
    const body = await req.json();
    const newTask = await prisma.task.create({
      data: {
        name: body.name,
        category: body.category,
        status: body.status,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
      },
    });
    return new Response(JSON.stringify(newTask), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating task:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create task' }),
      { status: 500 }
    );
  }
}

// Delete a task (DELETE)
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await prisma.task.delete({ where: { id } });
    return new Response(
      JSON.stringify({ message: 'Task deleted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting task:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete task' }),
      { status: 500 }
    );
  }
}
