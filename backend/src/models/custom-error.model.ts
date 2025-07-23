export class CustomError extends Error {
  constructor(message: string, statusCode: number) {
    super();

    this.message = message;
    this.statusCode = statusCode;
  }

  public statusCode: number;
}
