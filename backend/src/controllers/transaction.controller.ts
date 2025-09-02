import { Request, Response } from "express";
import { TransactionRepository } from "../repositories/transaction.repository";
import { success } from "../utilities/success.utility";
import { TransactionService } from "../services/transaction.service";
import { AuthenticatedRequest } from "../models/authenticated-request.model";

export class TransactionController {
  static async getAll(_request: Request, response: Response): Promise<void> {
    const transactions = await TransactionRepository.getAll();

    response.json(success(transactions));
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
    const { transactionId } = request.params;
    const id = parseInt(transactionId);

    await TransactionService.delete(id, user.id);

    response.status(204).end();
  }
}
