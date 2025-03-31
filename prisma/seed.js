const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: "adminpassword",  // Use hashed password in production
      role: "admin",
    },
  });

  await prisma.project.create({
    data: {
      name: "Project A",
      description: "A project for internal development",
      status: "active",
      dueDate: new Date(),
      employees: {
        connect: [{ id: admin.id }],
      },
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
