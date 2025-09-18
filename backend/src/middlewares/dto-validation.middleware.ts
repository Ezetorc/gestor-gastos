import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../models/errors/bad-request.error";
import { getErrorMessage } from "../utilities/get-error-message.utility";
import { failure } from "../utilities/failure.utility";

export function dtoValidationMiddleware(dto: new () => Object) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      if (!request.body) throw new BadRequestError("Request body is missing");

      const dtoObject = plainToInstance(dto, request.body);
      const errors = await validate(dtoObject);
      const failed = errors.length > 0;

      if (failed) {
        const formattedErrors = errors.map(({ property, constraints }) => ({ property, constraints }));

        response.status(400).json(failure(formattedErrors));
        return;
      }

      next();
    } catch (error) {
      throw new BadRequestError(getErrorMessage(error));
    }
  };
}
