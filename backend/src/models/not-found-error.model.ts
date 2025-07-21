import { CustomError } from "./custom-error.model";

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}
