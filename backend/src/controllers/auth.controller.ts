import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { NotFoundError } from "../models/not-found-error.model";
import { BadRequestError } from "../models/bad-request-error.model";

export class AuthController {
  static async login(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;

    try {
      const authorization = await AuthService.login(email, password);

      response.status(200).json({ value: authorization });
    } catch (error) {
      if (error instanceof NotFoundError) {
        response.status(error.statusCode).json({ error: error.message });
      } else if (error instanceof BadRequestError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Unexpected Error" });
      }
    }
  }
}
