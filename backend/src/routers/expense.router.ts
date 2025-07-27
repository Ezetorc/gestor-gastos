import { Router } from 'express'
import { ExpenseController } from '../controllers/expense.controller'

export const ExpenseRouter = Router()

ExpenseRouter.get('/',
    /*
    #swagger.tags = ['Expenses']
    #swagger.description = 'Obtiene todos los gastos registrados'
    #swagger.responses[200] = {
      description: 'Lista de gastos',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/Expense' }
          }
        }
      }
    }
  */

  ExpenseController.getAll)


