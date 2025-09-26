import { Request, Response } from "express";
import { success } from "../utilities/success.utility";
import { TransactionService } from "../services/transaction.service";
import { AuthenticatedRequest } from "../models/authenticated-request.model";
import { BadRequestError } from "../models/errors/bad-request.error";
import { UnauthorizedError } from "../models/errors/unauthorized.error";
import { transactionFiltersSchema } from "../models/schemas/transaction-filters.schema";
import { CreateTransactionDto } from "../models/dtos/create-transaction.dto";
import { paginationQuerySchema } from "../models/schemas/pagination-query.schema";
import { PaginationQuery } from "../models/pagination-query.model";
import { UpdateTransactionDto } from "../models/dtos/update-transaction.dto";

export class TransactionController {
  static async getAllOfUser(
    request: Request,
    response: Response
  ): Promise<void> {
    const { error: paginationError, value: paginationQuery } =
      paginationQuerySchema.validate(request.query);

    if (paginationError) throw new BadRequestError(paginationError.message);

    const { error: filtersError, value: filters } =
      transactionFiltersSchema.validate(request.query);

    if (filtersError) throw new BadRequestError(filtersError.message);

    const { page, limit } = paginationQuery as PaginationQuery;

    const authenticatedRequest = request as AuthenticatedRequest;
    const userId = authenticatedRequest.user.id;
    const paginatedTransactions = await TransactionService.getAllOfUser({
      userId,
      page,
      limit,
      filters,
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
    const { user } = request as AuthenticatedRequest;
    const createTransactionDto = request.body as CreateTransactionDto;
    const newTransaction = await TransactionService.create(
      createTransactionDto,
      user.id
    );

    response.status(201).json(success(newTransaction));
  }

  static async update(request: Request, response: Response): Promise<void> {
    const { user } = request as AuthenticatedRequest;
    const updateTransactionDto = request.body as UpdateTransactionDto;
    const { id } = request.params;
    if (!id) {
      throw new BadRequestError("Transaction ID is missing");
    }

    const transactionId = Number(id);
    if (isNaN(transactionId)) {
      throw new BadRequestError("Invalid Transaction ID");
    }

    const updateTransaction = await TransactionService.update(
      transactionId,
      user.id,
      updateTransactionDto
    );

    response.status(200).json(success(updateTransaction));
  }

  static async delete(request: Request, response: Response): Promise<void> {
    const { user } = request as AuthenticatedRequest;
    const { id } = request.params;
    const transactionId = parseInt(id);

    await TransactionService.delete(transactionId, user.id);

    response.status(204).end();
  }

  static async getSummary(request: Request, response: Response): Promise<void> {
    const { user } = request as AuthenticatedRequest;
    const summary = await TransactionService.getSummary(user.id);

    response.status(200).json(success(summary));
  }
}
