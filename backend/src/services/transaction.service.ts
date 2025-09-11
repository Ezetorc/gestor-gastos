import { Transaction } from "@prisma/client";
import { TransactionRepository } from "../repositories/transaction.repository";
import { NotFoundError } from "../models/errors/not-found.error";
import { UnauthorizedError } from "../models/errors/unauthorized.error";
import { PaginatedResult } from "../models/paginated-result.model";
import { buildFilters } from "../utilities/build-filters.utility";
import { TransactionFilters } from "../models/transaction-filters.model";
import { CreateTransactionDto } from "../models/dtos/create-transaction.dto";

export class TransactionService {
  static async create(
    data: CreateTransactionDto,
    userId: number
  ): Promise<Transaction> {
    const transactionData = { ...data, userId };
    const transaction = await TransactionRepository.create(transactionData);

    return transaction;
  }

  static async getAllOfUser(args: {
    userId: number;
    page: number;
    amount: number;
    filters?: TransactionFilters;
  }): Promise<PaginatedResult<Transaction>> {
    const requestedAmount = args.amount;
    const queryAmount = requestedAmount + 1;
    const currentPage = args.page < 1 ? 1 : args.page;
    const skip = (currentPage - 1) * requestedAmount;
    const filters = buildFilters(args.filters);
    const transactions = await TransactionRepository.getAllOfUser({
      userId: args.userId,
      skip,
      amount: queryAmount,
      filters,
    });
    const hasNextPage = transactions.length > requestedAmount;
    const data = transactions.slice(0, requestedAmount);

    return { data, hasNextPage };
  }

  static async delete(transactionId: number, userId: number): Promise<void> {
    const transaction = await TransactionRepository.getById(transactionId);

    if (!transaction) throw new NotFoundError("Transaction not found");
    if (transaction.userId !== userId)
      throw new UnauthorizedError("This transaction doesn't belong to you");

    await TransactionRepository.delete(transactionId);
  }

  static async getById(id: number): Promise<Transaction> {
    const transaction = await TransactionRepository.getById(id);

    if (!transaction) throw new NotFoundError("Transaction not found");

    return transaction;
  }
}
