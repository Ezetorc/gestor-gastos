import { Response } from "express";
import { ExpenseRepository } from "../repositories/expense.repository";

export class ExpenseController {
  static async getAll(req: Request,res: Response): Promise<void> {
    const expenses = await ExpenseRepository.getAll();

    response.json({ value: expenses });
  }
}
