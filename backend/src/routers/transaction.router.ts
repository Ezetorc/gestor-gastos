import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const TransactionRouter = Router();

TransactionRouter.get(
  "/",
  authMiddleware,
  /*
  #swagger.path = '/transactions'
  #swagger.tags = ['Transactions']
  #swagger.description = 'Returns your transactions'

  #swagger.parameters['page'] = {
    in: 'query',
    description: 'Page number (starts at 1)',
    required: false,
    schema: { type: 'integer', example: 1 }
  }

  #swagger.parameters['amount'] = {
    in: 'query',
    description: 'Number of transactions per page',
    required: false,
    schema: { type: 'integer', example: 8 }
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
