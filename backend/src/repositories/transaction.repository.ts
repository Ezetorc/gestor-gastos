import { prisma } from "../configuration/prisma.configuration";

export class TransactionRepository {
  static async getAll() {
    return prisma.transaction.findMany();
  }
}
