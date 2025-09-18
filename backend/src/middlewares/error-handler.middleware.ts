import { NextFunction, Request, Response } from "express";
import { getErrorMessage } from "../utilities/get-error-message.utility";
import { CustomError } from "../models/errors/custom-error.error";
import { failure } from "../utilities/failure.utility";

export function errorHandlerMiddleware() {
  return async (
    error: unknown,
    _request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    if (response.headersSent) {
      next(error);
      return;
    }

    if (error instanceof CustomError) {
      response.status(error.statusCode).json(failure(error.message));
      return;
    }

    response.status(500).json(failure(getErrorMessage(error)));
  };
}
