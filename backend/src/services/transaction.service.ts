import { Transaction } from "@prisma/client";
import { TransactionRepository } from "../repositories/transaction.repository";
import { TransactionDto } from "../models/dtos/transaction.dto";
import { NotFoundError } from "../models/errors/not-found.error";
import { UnauthorizedError } from "../models/errors/unauthorized.error";

export class TransactionService {
  static async create(
    dto: TransactionDto,
    userId: number
  ): Promise<Transaction> {
    const transactionData = {
      ...dto,
      userId,
    };

    const transaction = await TransactionRepository.create(transactionData);

    return transaction;
  }

  static async delete(transactionId: number, userId: number): Promise<void> {
    const transaction = await TransactionRepository.getById(transactionId);

    if (!transaction) throw new NotFoundError("Transaction not found");
    if (transaction.userId !== userId)
      throw new UnauthorizedError("This transaction doesn't belong to you");

    await TransactionRepository.delete(transactionId);
  }
}
