import { prisma } from "../src/configuration/prisma.configuration";

async function main() {
  // Usuarios
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      password: "securepassword123",
      image: "https://example.com/alice.jpg",
    },
  });

  // Ingresos
  await prisma.income.create({
    data: {
      amount: 5000,
      date: new Date("2025-07-01"),
      category: "Salario",
      description: "Sueldo mensual",
      userId: alice.id,
    },
  });

  // Gastos
  await prisma.expense.create({
    data: {
      amount: 250,
      date: new Date("2025-07-03"),
      category: "Supermercado",
      paymentMethod: "Efectivo",
      description: "Compras de alimentos",
      userId: alice.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });
