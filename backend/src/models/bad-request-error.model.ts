import { HttpError } from "./http-error.model";

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}
