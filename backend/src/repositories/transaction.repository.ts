import { Transaction } from "@prisma/client";
import { prisma } from "../configuration/prisma.configuration";
import { TransactionDto } from "../models/dtos/transaction.dto";

export class TransactionRepository {
  static async getAll(): Promise<Transaction[]> {
    return prisma.transaction.findMany();
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
