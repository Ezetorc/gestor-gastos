import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export function dtoValidationMiddleware(dto: new () => Object) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      if (!request.body) {
        response.status(400).json({ message: "Request body is missing" });
        return;
      }

      const dtoObject = plainToInstance(dto, request.body);
      const errors = await validate(dtoObject);
      const failed = errors.length > 0;

      if (failed) {
        const formattedErrors = errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        }));

        response.status(400).json({
          message: "Validation failed",
          errors: formattedErrors,
        });

        return;
      }

      next();
    } catch (error) {
      response.status(400).json({
        message: "Validation error",
        error: (error as Error).message || error,
      });

      return;
    }
  };
}
