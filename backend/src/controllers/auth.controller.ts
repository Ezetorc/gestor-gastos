import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../models/dtos/login.dto";
import { RegisterDto } from "../models/dtos/register.dto";
import { success } from "../utilities/success.utility";

export class AuthController {
  static async login(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body as LoginDto;

    const loginData = await AuthService.login(email, password);

    response.status(200).json(success(loginData));
  }

  static async register(request: Request, response: Response): Promise<void> {
    const userData: RegisterDto = request.body;
    const registerData = await AuthService.register(userData);

    response.status(201).json(success(registerData));
  }
}
