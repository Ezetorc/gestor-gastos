import { Router } from 'express'
import { TransactionController } from '../controllers/transaction.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

export const TransactionRouter = Router()

TransactionRouter.get(
  '/',
  authMiddleware,
  /*
  #swagger.path = '/transactions'
  #swagger.tags = ['Transactions']
  #swagger.description = 'Returns your transactions'

  #swagger.responses[200] = {
    description: 'List of your transactions',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            value: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Transaction'
              }
            }
          }
        }
      }
    }
  }

  #swagger.responses[500] = {
    description: 'Unexpected error',
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
  TransactionController.getAll
)
