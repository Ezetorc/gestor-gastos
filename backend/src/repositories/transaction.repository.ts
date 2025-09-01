import { Transaction } from "@prisma/client";
import { prisma } from "../configuration/prisma.configuration";
import { TransactionDto } from "../models/dtos/transaction.dto";

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

  static async create(data: TransactionDto & { userId: number }): Promise<Transaction> {
      return await prisma.transaction.create({
        data: {
          name: data.name,
          userId:data.userId,
          amount:data.amount,
          date:data.date,
          category:data.category,
          paymentMethod:data.paymentMethod,
          description:data.description,
          type:data.type
          

        },
      });
    }
}
