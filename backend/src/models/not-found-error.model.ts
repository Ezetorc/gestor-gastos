import { HttpError } from "./http-error.model";

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 404);
  }
}