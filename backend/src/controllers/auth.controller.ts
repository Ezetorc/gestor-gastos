import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async login(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;

    const userData = await AuthService.login(email, password);

    if (userData) {
      response.json({ value: userData });
    } else {
      response.json({ error: "Invalid credentials" });
    }
  }
}
