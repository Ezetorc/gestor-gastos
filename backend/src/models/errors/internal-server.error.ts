import { CustomError } from "./custom-error.error";

export class InternalServerError extends CustomError {
  constructor(message?: string) {
    super(message || "Internal Server Error", 500);
  }
}
