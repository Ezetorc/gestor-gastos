import { Prisma, Transaction } from "@prisma/client";
import { prisma } from "../configuration/prisma.configuration";
import { CreateTransactionDto } from "../models/dtos/create-transaction.dto";
import { UpdateTransactionDto } from "../models/dtos/update-transaction.dto";

export class TransactionRepository {
  static async getAllOfUser(args: {
    userId: number;
    skip: number;
    limit: number;
    filters: Prisma.TransactionWhereInput;
  }): Promise<Transaction[]> {
    return await prisma.transaction.findMany({
      where: { userId: args.userId, ...args.filters },
      skip: args.skip,
      take: args.limit,
      orderBy: { date: "desc" },
    });
  }

  static async getById(id: number): Promise<Transaction | null> {
    return await prisma.transaction.findUnique({ where: { id } });
  }

  static async create(
    data: CreateTransactionDto & { userId: number }
  ): Promise<Transaction> {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  static async update(
    transactionId: number,
    updates: UpdateTransactionDto
  ): Promise<Transaction> {
    return await prisma.transaction.update({
      where: { id: transactionId },
      data: updates,
    });
  }

  static async delete(id: number): Promise<Transaction> {
    return await prisma.transaction.delete({ where: { id } });
  }

  static async getTotalExpenses(userId: number): Promise<number> {
    const result = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
        type: "EXPENSE",
      },
    });

    return result._sum.amount ?? 0;
  }

  static async getTotalIncomes(userId: number): Promise<number> {
    const result = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
        type: "INCOME",
      },
    });

    return result._sum.amount ?? 0;
  }

  static async getTodayExpenses(userId: number) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const result = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        type: "EXPENSE",
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    return result._sum.amount ?? 0;
  }

  static async getWeekExpenses(userId: number) {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

    const start = new Date(now.setDate(diff));
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    const result = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        type: "EXPENSE",
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    return result._sum.amount ?? 0;
  }

  static async getMonthExpenses(userId: number) {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const result = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        type: "EXPENSE",
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    return result._sum.amount ?? 0;
  }
}
