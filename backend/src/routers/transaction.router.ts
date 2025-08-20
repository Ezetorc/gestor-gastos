import { Router } from 'express'
import { TransactionController } from '../controllers/transaction.controller'

export const TransactionRouter = Router()

TransactionRouter.get('/',
  /*
  #swagger.path = '/transactions'
  #swagger.tags = ['Transactions']
  #swagger.description = 'Obtiene todas las transacciones'

 #swagger.responses[200] = {
  description: 'Lista de transacciones',
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
  TransactionController.getAll)


