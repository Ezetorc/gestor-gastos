import { prisma } from "../configuration/prisma.configuration";

export class ExpenseRepository {
  static async getAll() {
    return prisma.expense.findMany();
  }
}
