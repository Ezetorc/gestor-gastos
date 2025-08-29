import { CustomError } from "./custom-error.error";

export class NotFoundError extends CustomError {
  constructor(message?: string) {
    super(message || "Not found", 404);
  }
}
