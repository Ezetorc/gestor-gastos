import { Response } from 'express'
import { ExpenseService } from '../services/expense.service'

export class ExpenseController {
  static async getAll (response: Response): Promise<void> {
    const expenses = await ExpenseService.getAll()

    response.json({ value: expenses })
  }
}
