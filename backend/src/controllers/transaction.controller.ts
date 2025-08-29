import { Request, Response } from "express";
import { TransactionRepository } from "../repositories/transaction.repository";
import { success } from "../utilities/success.utility";
import { AuthenticatedRequest } from "../models/authenticated-request.model";

export class TransactionController {
  static async getAll(request: AuthenticatedRequest, response: Response): Promise<void> {
    const transactions = await TransactionRepository.getAll();

    response.json(success(transactions));
  }
}
