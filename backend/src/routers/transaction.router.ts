import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { CreateTransactionDto } from "../models/dtos/create-transaction.dto";
import { dtoValidationMiddleware } from "../middlewares/dto-validation.middleware";
import{UpdateTransactionDto} from "../models/dtos/update-transaction.dto"

export const TransactionRouter = Router();

TransactionRouter.get(
  "/:id",
  authMiddleware,
  /*
  #swagger.path = '/transactions/{id}'
  #swagger.tags = ['Transactions']
  #swagger.description = 'Returns a transaction'
  #swagger.security = [{ "bearerAuth": [] }]

  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Id of the transaction to get',
    required: true,
    example: 1
  }

  #swagger.responses[200] = {
    description: 'A transaction',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Transaction' }
      }
    }
  }

  #swagger.responses[400] = {
    description: 'Transaction ID is missing',
    content: {
      'application/json': {
        schema: { type: 'object', properties: { error: { type: 'string' } } },
        example: { error: 'Transaction ID is missing' }
      }
    }
  }

  #swagger.responses[400] = {
    description: 'Invalid transaction ID',
    content: {
      'application/json': {
        schema: { type: 'object', properties: { error: { type: 'string' } } },
        example: { error: 'Invalid transaction ID' }
      }
    }
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
  TransactionController.getById
);

TransactionRouter.get(
  "/",
  authMiddleware,
  /*
  #swagger.path = '/transactions'
  #swagger.tags = ['Transactions']
  #swagger.description = 'Returns your transactions'
  #swagger.security = [{ "bearerAuth": [] }]


  #swagger.parameters['page'] = {
    in: 'query',
    description: 'Page number (starts at 1)',
    required: false,
    example: 1
  }

  #swagger.parameters['amount'] = {
    in: 'query',
    description: 'Number of transactions per page',
    required: false,
    example: 8
  }

  #swagger.responses[200] = {
    description: 'Paginated list of your transactions',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            value: {
              type: 'object',
              properties: {
                data: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Transaction' }
                },
                hasNextPage: {
                  type: 'boolean',
                  example: true
                }
              },
              required: ['data', 'hasNextPage']
            }
          },
          required: ['value']
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
            error: { type: 'string', example: 'Unexpected error' }
          },
          required: ['error']
        },
        example: { error: 'Unexpected error' }
      }
    }
  }
  */
  TransactionController.getAllOfUser
);

TransactionRouter.post(
  "/",
  authMiddleware,
  dtoValidationMiddleware(CreateTransactionDto),
  /*
  #swagger.path = '/transactions'
  #swagger.tags = ['Transactions']
  #swagger.description = 'Creates a new transaction for the authenticated user'
  #swagger.security = [{ "bearerAuth": [] }]

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

TransactionRouter.patch(
  "/:id",
  authMiddleware,
  dtoValidationMiddleware(UpdateTransactionDto), // opcional si quieres validar el body
  /*
  #swagger.path = '/transactions/{id}'
  #swagger.tags = ['Transactions']
  #swagger.description = 'Update a transaction (any field can be updated)'
  #swagger.security = [{ "bearerAuth": [] }]

  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Id of the transaction to update',
    required: true,
    example: 1
  }

  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/UpdateTransactionDto' },
        example: { name: "Pago leña", amount: 6000 }
      }
    }
  }

  #swagger.responses[200] = {
    description: 'Transaction successfully updated',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/UpdateTransactionDto' }
      }
    }
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
  TransactionController.update
);


TransactionRouter.delete(
  "/:id",
  authMiddleware,
  /*
  #swagger.path = '/transactions/{id}'
  #swagger.tags = ['Transactions']
  #swagger.description = 'Deletes a transaction'
  #swagger.security = [{ "bearerAuth": [] }]

  
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Id of the transaction to delete',
    required: true,
    example: 1
  }

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
