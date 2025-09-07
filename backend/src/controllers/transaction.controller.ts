import { Request, Response } from "express";
import { TransactionRepository } from "../repositories/transaction.repository";
import { success } from "../utilities/success.utility";
import { TransactionService } from "../services/transaction.service";
import { parsePaginationQuery } from "../utilities/parse-pagination-query.utility";
import { AuthenticatedRequest } from "../models/authenticated-request.model";
import { BadRequestError } from "../models/errors/bad-request.error";
import { UnauthorizedError } from "../models/errors/unauthorized.error";

export class TransactionController {
  static async getAllOfUser(
    request: Request,
    response: Response
  ): Promise<void> {
    const { page, amount } = parsePaginationQuery(request.query);
    const authenticatedRequest = request as AuthenticatedRequest;
    const userId = authenticatedRequest.user.id;
    const paginatedTransactions = await TransactionService.getAllOfUser({
      userId,
      page,
      amount,
    });

    response.json(success(paginatedTransactions));
  }

  static async getById(request: Request, response: Response): Promise<void> {
    const { user } = request as AuthenticatedRequest;
    const { id } = request.params;

    if (!id) throw new BadRequestError("Transaction ID is missing");

    const transactionId = Number(id);

    if (isNaN(transactionId))
      throw new BadRequestError("Invalid Transaction ID");

    const transaction = await TransactionService.getById(transactionId);

    if (user.id !== transaction.userId)
      throw new UnauthorizedError("Unauthorized");

    response.json(success(transaction));
  }

  static async create(request: Request, response: Response): Promise<void> {
    const transactionData = request.body;
    const newTransaction = await TransactionService.create(
      transactionData,
      request.user!.id
    );

    response.status(201).json(success(newTransaction));
  }

  static async delete(request: Request, response: Response): Promise<void> {
    const { user } = request as AuthenticatedRequest;
    const { id } = request.params;
    const transactionId = parseInt(id);

    await TransactionService.delete(transactionId, user.id);

    response.status(204).end();
  }
}
