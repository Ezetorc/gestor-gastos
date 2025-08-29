import { TransactionType } from "@prisma/client";
import { prisma } from "../src/configuration/prisma.configuration";

async function main() {
  // Users
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

  // Transactions
  await prisma.transaction.create({
    data: {
      amount: 5000,
      date: new Date("2025-07-01"),
      category: "Salary",
      description: "Monthly salary... for the month",
      paymentMethod: "Bank account",
      userId: alice.id,
      name: "Salary",
      type: TransactionType.INCOME,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 250,
      date: new Date("2025-07-03"),
      category: "Food",
      paymentMethod: "Cash",
      description: "Tomatoes, lettuce, potatoes, and much more",
      name: "Monthly groceries",
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
