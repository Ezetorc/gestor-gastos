import { TransactionType } from "@prisma/client";
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

  // Transacciones
  await prisma.transaction.create({
    data: {
      amount: 5000,
      date: new Date("2025-07-01"),
      category: "Salario",
      description: "Sueldo mensual... del mes",
      paymentMethod: "Cuenta bancaria",
      userId: alice.id,
      name: "Sueldo",
      type: TransactionType.INCOME,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 250,
      date: new Date("2025-07-03"),
      category: "Alimento",
      paymentMethod: "Efectivo",
      description: "Tomates, lechuga, papas, y mucho más",
      name: "Comida del mes",
      userId: alice.id,
      type: TransactionType.EXPENSE,
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
