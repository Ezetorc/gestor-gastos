import { CustomError } from "./custom-error.model";

export class InternalServerError extends CustomError {
  constructor(message?: string) {
    super(message || "Internal Server Error", 500);
  }
}
