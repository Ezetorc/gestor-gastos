import { Request,Response } from 'express'
import { ExpenseService } from '../services/expense.service'

export class ExpenseController {
  static async getAll (req: Request,res: Response): Promise<void> {
    const expenses = await ExpenseService.getAll()

    res.json({ value: expenses })
  }
}
