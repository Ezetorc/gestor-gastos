import { Request, Response } from "express";
import { TransactionRepository } from "../repositories/transaction.repository";
import { success } from "../utilities/success.utility";
import { AuthenticatedRequest } from "../models/authenticated-request.model";

export class TransactionController {
  static async getAll(request: Request, response: Response): Promise<void> {
    const authenticatedRequest = request as AuthenticatedRequest;
    const userId = authenticatedRequest.user.id;
    const transactions = await TransactionRepository.getAllOfUser(userId);

    response.json(success(transactions));
  }
}
