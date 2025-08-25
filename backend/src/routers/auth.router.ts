import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { dtoValidationMiddleware } from "../middlewares/dto-validation.middleware";
import { LoginDto } from "../models/login-dto.model";
import { RegisterDto } from "../models/register.dto.model";

export const AuthRouter = Router();

AuthRouter.post("/login", dtoValidationMiddleware(LoginDto),
  /*
  #swagger.path = '/login'
  #swagger.tags = ['Auth']
  #swagger.description = 'Authenticates a user and returns an authorization token'

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
    description: 'Returns JWT toke',
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
    description: 'Invalid credentials',
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

  #swagger.responses[404] = {
    description: 'User not found',
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

  AuthRouter.post('/register', dtoValidationMiddleware(RegisterDto), 
    /*
    #swagger.path = '/register'
    #swagger.tags = ['Auth']
    #swagger.description = 'Creates new user'
  
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name', 'email', 'password', 'image'],
            properties: {
              name: { type: 'string', example: 'Juan Pérez' },
              email: { type: 'string', example: 'juan.perez@email.com' },
              password: { type: 'string', example: 'Password123!' },
              image: { type: 'string', example: 'https://example.com/avatar.jpg' }
            }
          }
        }
      }
    }
  
    #swagger.responses[201] = {
      description: 'User successfully created',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              value: { type: 'string', example: '507f1f77bcf86cd799439011' }
            },
            required: ['value']
          }
        }
      }
    }
  
    #swagger.responses[400] = {
      description: 'Invalid credentials',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', example: 'The password must be at least 8 characters long' }
            },
            required: ['error']
          }
        }
      }
    }
  
    #swagger.responses[409] = {
      description: 'Email already registered',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', example: 'Email juan.perez@email.com is already registered' }
            },
            required: ['error']
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
          }
        }
      }
    }
    */
   AuthController.register);
