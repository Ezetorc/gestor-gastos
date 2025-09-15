import { Prisma, Transaction } from "@prisma/client";
import { prisma } from "../configuration/prisma.configuration";
import { CreateTransactionDto } from "../models/dtos/create-transaction.dto";
import { TransactionUpdateDto } from "../models/dtos/transaction-update.dto";

export class TransactionRepository {
 
  static async getAllOfUser(args: {
    userId: number;
    skip: number;
    amount: number;
    filters: Prisma.TransactionWhereInput;
  }): Promise<Transaction[]> {
    return await prisma.transaction.findMany({
      where: { userId: args.userId, ...args.filters },
      skip: args.skip,
      take: args.amount,
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

   static async update(transactionId: number,    
     updates: TransactionUpdateDto) : Promise<Transaction>{
      
      return await prisma.transaction.update({ 
        where: { id:transactionId },
        data:updates,
      
      });
    
  }
 

  static async delete(id: number): Promise<Transaction> {
    return await prisma.transaction.delete({ where: { id } });
  }
}
