import bcrypt from 'bcrypt';
import { UserRepository } from "../repositories/user.repository";
import { JWT_SECRET } from "../configuration/env.configuration";
import { NotFoundError } from "../models/not-found-error.model";
import { BadRequestError } from "../models/bad-request-error.model";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { RegisterDto } from "../models/register.dto.model";
import { User } from "@prisma/client";
import { EmailAlreadyExistsError } from "../models/email-already-exists-error.model";

export class AuthService {
  static async login(email: string, password: string) {
    const user = await UserRepository.getByEmail(email);

    if (!user) throw new NotFoundError("User not found");

    const passwordsMatches = await compare(password, user.password);

    if (!passwordsMatches) throw new BadRequestError("Invalid password");

    return this.getAuthorization(user.id);
  }

  static async getAuthorization(userId: number | string) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
  }

  static async register(data: RegisterDto): Promise<User> {
    const existingUser = await UserRepository.getByEmail(data.email);
    if (existingUser) {
      throw new EmailAlreadyExistsError(existingUser.email);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await UserRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      image: data.image
    });

    return newUser;
  }
}
