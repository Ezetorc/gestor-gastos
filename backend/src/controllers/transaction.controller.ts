import { Request, Response } from "express";
import { TransactionRepository } from "../repositories/transaction.repository";

export class TransactionController {
  static async getAll(_request: Request, response: Response): Promise<void> {
    const transactions = await TransactionRepository.getAll();

    response.json({ value: transactions });
  }
}
