import { Response } from "express";
import { ExpenseModel } from "../models/expense.model";

export class ExpenseController {
  static async getAll(response: Response): Promise<void> {
    const expenses = await ExpenseModel.getAll();

    response.json({ value: expenses });
  }
}
