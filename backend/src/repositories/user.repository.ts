import { User } from "@prisma/client";
import { RegisterDto } from "../models/register.dto.model";
import { prisma } from "../configuration/prisma.configuration";

export class UserRepository {
  static async getByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  // El método 'create' para registrar un nuevo usuario
  static async create(data: RegisterDto): Promise<User> {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image
      },
    });
  }
}
