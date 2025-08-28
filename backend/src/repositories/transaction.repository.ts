import { Transaction } from "@prisma/client";
import { prisma } from "../configuration/prisma.configuration";

export class TransactionRepository {
  static async getAll(): Promise<Transaction[]> {
    return prisma.transaction.findMany();
  }
}
