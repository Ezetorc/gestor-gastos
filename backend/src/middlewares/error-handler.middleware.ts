import { NextFunction, Request, Response } from "express";
import { getErrorMessage } from "../utilities/get-error-message.utility";
import { CustomError } from "../models/custom-error.model";
import { EmailAlreadyExistsError } from "../models/email-already-exists-error.model";

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
      response.status(error.statusCode).json({ error: error.message });
      return;
    }

    if (error instanceof EmailAlreadyExistsError){
      response.status(409).json({error: error.message});
      return;
    }

    response
      .status(500)
      .json({ error: getErrorMessage(error) || "Unexpected error" });
  };
}
