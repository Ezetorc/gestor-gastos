import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../models/dtos/login.dto";
import { RegisterDto } from "../models/dtos/register.dto";
import { success } from "../utilities/success.utility";

export class AuthController {
  static async login(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body as LoginDto;

    const authorization = await AuthService.login(email, password);

    response.status(200).json(success(authorization));
  }

  static async register(request: Request, response: Response): Promise<void> {
    const userData: RegisterDto = request.body;
    const newUser = await AuthService.register(userData);

    response.status(201).json(success(newUser.id));
  }
}
