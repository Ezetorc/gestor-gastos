import { CustomError } from "./custom-error.model";

export class BadRequestError extends CustomError {
  constructor(message?: string) {
    super(message || "Bad request", 400);
  }
}
