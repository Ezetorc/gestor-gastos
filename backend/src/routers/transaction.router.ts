import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { TransactionDto } from "../models/dtos/transaction.dto";
import { dtoValidationMiddleware } from "../middlewares/dto-validation.middleware";

export const TransactionRouter = Router();

TransactionRouter.get(
  "/",
  authMiddleware,
  /*
  #swagger.path = '/transactions'
  #swagger.tags = ['Transactions']
  #swagger.description = 'Returns all transactions'

  #swagger.responses[200] = {
    description: 'List of transactions',
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
);

TransactionRouter.post(
  "/",
  authMiddleware,
  dtoValidationMiddleware(TransactionDto),
  /*
  #swagger.path = '/transactions'
  #swagger.tags = ['Transactions']
  #swagger.description = 'Creates a new transaction for the authenticated user'
   #swagger.method = 'post'

  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['name', 'amount', 'date', 'category', 'paymentMethod', 'description', 'type'],
          properties: {
            name: { type: 'string', example: 'Pago luz' },
            amount: { type: 'number', example: 5000 },
            date: { type: 'string', format: 'date-time', example: '2025-08-31T12:00:00Z' },
            category: { type: 'string', example: 'Servicios' },
            paymentMethod: { type: 'string', example: 'Tarjeta' },
            description: { type: 'string', example: 'Pago mensual de electricidad' },
            type: { type: 'string', example: 'EXPENSE' }
          }
        }
      }
    }
  }

  #swagger.responses[201] = {
    description: 'Transaction successfully created',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            value: { $ref: '#/components/schemas/Transaction' }
          },
          required: ['value']
        },
        example: {
          value: {
            id: 1,
            name: 'Pago luz',
            amount: 5000,
            date: '2025-08-31T12:00:00Z',
            category: 'Servicios',
            paymentMethod: 'Tarjeta',
            description: 'Pago mensual de electricidad',
            type: 'EXPENSE',
            userId: 1
          }
        }
      }
    }
  }

  #swagger.responses[400] = {
    description: 'Invalid transaction data',
    content: {
      'application/json': {
        schema: { type: 'object', properties: { error: { type: 'string' } } },
        example: { error: 'Amount must be greater than 0' }
      }
    }
  }

  #swagger.responses[500] = {
    description: 'Unexpected error',
    content: {
      'application/json': {
        schema: { type: 'object', properties: { error: { type: 'string' } } },
        example: { error: 'Unexpected error' }
      }
    }
  }
  */
  TransactionController.create
);

TransactionRouter.delete(
  "/:id",
  authMiddleware,
  /*
  #swagger.path = '/transactions/:id'
  #swagger.tags = ['Transactions']
  #swagger.description = 'Deletes a transaction'
  
  #swagger.parameters['id'] = { description: 'Id of the transaction to delete' }

  #swagger.responses[204] = {
    description: 'Transaction successfully deleted'
  }

  #swagger.responses[404] = {
    description: 'Transaction not found',
    content: {
      'application/json': {
        schema: { type: 'object', properties: { error: { type: 'string' } } },
        example: { error: 'Transaction not found' }
      }
    }
  }

  #swagger.responses[401] = {
    description: 'Unauthorized',
    content: {
      'application/json': {
        schema: { type: 'object', properties: { error: { type: 'string' } } },
        example: { error: 'Unauthorized' }
      }
    }
  }
  */
  TransactionController.delete
);
