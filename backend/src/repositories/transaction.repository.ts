import { Transaction } from "@prisma/client";
import { prisma } from "../configuration/prisma.configuration";

export class TransactionRepository {
  static async getAllOfUserWithPagination(args: {
    userId: number;
    page: number;
    amount: number;
  }): Promise<Transaction[]> {
    const currentPage = args.page < 1 ? 1 : args.page;
    const skip = (currentPage - 1) * args.amount;

    return prisma.transaction.findMany({
      where: { userId: args.userId },
      skip,
      take: args.amount,
      orderBy: { date: "desc" },
    });
  }
}
