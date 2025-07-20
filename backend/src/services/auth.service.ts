import { JWT_SECRET } from "../configuration/env.configuration";
import { UserRepository } from "../repositories/user.repository";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

export class AuthService {
  static async login(email: string, password: string) {
    const user = await UserRepository.getByEmail(email);

    if (!user) return null;

    const passwordsMatches: boolean = await compare(password, user.password);

    if (!passwordsMatches) return null;

    const authorization = this.getAuthorization(user.id);

    return { user, authorization };
  }

  static async getAuthorization(userId: number | string) {
    return jwt.sign(String(userId), JWT_SECRET, { expiresIn: "1d" });
  }
}
