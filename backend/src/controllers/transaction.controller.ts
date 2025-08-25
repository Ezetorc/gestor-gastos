import { Request, Response } from "express";
import { TransactionRepository } from "../repositories/transaction.repository";
import { success } from "../utilities/success.utility";

export class TransactionController {
  static async getAll(_request: Request, response: Response): Promise<void> {
    const transactions = await TransactionRepository.getAll();

    response.json(success(transactions));
  }
}
