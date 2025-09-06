import { Transaction, TransactionType } from "@prisma/client";

export const transactionMock: Transaction = {
  id: 1,
  amount: 250,
  date: new Date("2025-07-03"),
  category: "Food",
  paymentMethod: "Cash",
  description: "Tomatoes, lettuce, potatoes, and much more",
  name: "Monthly groceries",
  userId: 1,
  type: TransactionType.EXPENSE,
};
