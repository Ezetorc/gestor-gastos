import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../models/login-dto.model";

export class AuthController {
  static async login(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body as LoginDto;

    const authorization = await AuthService.login(email, password);

    response.status(200).json({ value: authorization });
  }
}
