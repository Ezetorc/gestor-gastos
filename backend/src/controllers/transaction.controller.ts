import { Request, Response } from "express";
import { TransactionRepository } from "../repositories/transaction.repository";
import { success } from "../utilities/success.utility";
import { TransactionDto } from "../models/dtos/transaction.dto";
import { TransactionService } from "../services/transaction.service";



export class TransactionController {
  static async getAll(request: Request, response: Response): Promise<void> {
    const transactions = await TransactionRepository.getAll();

    response.json(success(transactions));
  }

  static async create(request: Request, response: Response): Promise<void> {

    const transactionData = request.body;
    const newTransaction = await TransactionService.create(transactionData, request.user!.id);

    response.status(201).json(success(newTransaction));

  }


}
