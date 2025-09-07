import { Transaction } from "@prisma/client";
import { prisma } from "../configuration/prisma.configuration";
import { TransactionDto } from "../models/dtos/transaction.dto";

export class TransactionRepository {
  static async getAllOfUser(args: {
    userId: number;
    skip: number;
    amount: number;
  }): Promise<Transaction[]> {
    return await prisma.transaction.findMany({
      where: { userId: args.userId },
      skip: args.skip,
      take: args.amount,
      orderBy: { date: "desc" },
    });
  }

  static async getById(id: number): Promise<Transaction | null> {
    return await prisma.transaction.findUnique({ where: { id } });
  }

  static async create(
    data: TransactionDto & { userId: number }
  ): Promise<Transaction> {
    return await prisma.transaction.create({
      data: {
        name: data.name,
        userId: data.userId,
        amount: data.amount,
        date: data.date,
        category: data.category,
        paymentMethod: data.paymentMethod,
        description: data.description,
        type: data.type,
      },
    });
  }

  static async delete(id: number): Promise<Transaction> {
    return await prisma.transaction.delete({ where: { id } });
  }
}
