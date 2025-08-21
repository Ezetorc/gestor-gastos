import { CustomError } from "./custom-error.model";

export class UnauthorizedError extends CustomError {
  constructor(message?: string) {
    super(message || "Unauthorized", 401);
  }
}
