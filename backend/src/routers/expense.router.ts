import { Router } from 'express'
import { ExpenseController } from '../controllers/expense.controller'
import { authMiddleware } from '../middlewares/auth.middleware';

export const ExpenseRouter = Router()

ExpenseRouter.get('/',
  authMiddleware,
  /*
  #swagger.path = '/-'
  #swagger.tags = ['Expenses']
  #swagger.description = 'Obtiene todos los gastos registrados'

 #swagger.responses[200] = {
  description: 'Lista de gastos',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          value: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Expense'
            }
          }
        }
      }
    }
  }
}


  #swagger.responses[500] = {
    description: 'Error interno del servidor',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Unexpected error'
            }
          }
        },
        example: {
          error: 'Unexpected error'
        }
      }
    }
  }
  */
  
  ExpenseController.getAll)


