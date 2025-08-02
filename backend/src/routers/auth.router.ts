import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { dtoValidationMiddleware } from "../middlewares/dto-validation.middleware";
import { LoginDto } from "../models/login-dto.model";

export const AuthRouter = Router();

AuthRouter.post("/login", dtoValidationMiddleware(LoginDto),
  /*
  #swagger.path = '/login'
  #swagger.tags = ['Auth']
  #swagger.description = 'Autentica un usuario y devuelve un token de autorización.'

  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'tu@email.com' },
            password: { type: 'string', example: 'tuContraSEÑA123!' }
          }
        }
      }
    }
  }

  #swagger.responses[200] = {
    description: 'Autenticación exitosa, retorna token JWT.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            value: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
          },
          required: ['accessToken']
        }
      }
    }
  }

  #swagger.responses[400] = {
    description: 'Datos de login inválidos.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Invalid password' }
          },
          required: ['error']
        },
        example: { error: 'Invalid password' }
      }
    }
  }

  #swagger.responses[500] = {
    description: 'Error inesperado',
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

  #swagger.responses[404] = {
    description: 'Usuario no encontrado',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'User not found' }
          },
          required: ['error']
        },
        example: { error: 'User not found' }
      }
    }
  }
*/
  AuthController.login);
