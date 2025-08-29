import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { dtoValidationMiddleware } from "../middlewares/dto-validation.middleware";
import { LoginDto } from "../models/dtos/login.dto";
import { RegisterDto } from "../models/dtos/register.dto";

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

  AuthRouter.post('/register', dtoValidationMiddleware(RegisterDto), 
    /*
    #swagger.path = '/register'
    #swagger.tags = ['Auth']
    #swagger.description = 'Registra un nuevo usuario en el sistema.'
  
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
      description: 'Usuario registrado exitosamente.',
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
      description: 'Datos de registro inválidos.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', example: 'La contraseña debe tener al menos 8 caracteres.' }
            },
            required: ['error']
          }
        }
      }
    }
  
    #swagger.responses[409] = {
      description: 'El correo electrónico ya está registrado.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', example: 'El correo juan.perez@email.com ya está registrado.' }
            },
            required: ['error']
          }
        }
      }
    }
  
    #swagger.responses[500] = {
      description: 'Error inesperado del servidor.',
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
