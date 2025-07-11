import { Router } from 'express'
import { ExpenseController } from '../controllers/expense.controller'

export const ExpenseRouter = Router()

ExpenseRouter.get('/', ExpenseController.getAll)
