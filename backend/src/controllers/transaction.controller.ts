import { Request, Response } from "express";
import { TransactionRepository } from "../repositories/transaction.repository";
import { success } from "../utilities/success.utility";
import { TransactionService } from "../services/transaction.service";
import { parsePaginationQuery } from "../utilities/parse-pagination-query.utility";
import { AuthenticatedRequest } from "../models/authenticated-request.model";

export class TransactionController {
  static async getAllOfUser(
    request: Request,
    response: Response
  ): Promise<void> {
    const { page, amount } = parsePaginationQuery(request.query);
    const authenticatedRequest = request as AuthenticatedRequest;
    const userId = authenticatedRequest.user.id;
    const transactions = await TransactionRepository.getAllOfUserWithPagination(
      { userId, page, amount: amount + 1 }
    );
    const hasNextPage = transactions.length > amount;
    const data = transactions.slice(0, amount);

    response.json(success({ data, hasNextPage }));
  }

  static async create(request: Request, response: Response): Promise<void> {
    const transactionData = request.body;
    const newTransaction = await TransactionService.create(
      transactionData,
      request.user!.id
    );

    response.status(201).json(success(newTransaction));
  }
}
