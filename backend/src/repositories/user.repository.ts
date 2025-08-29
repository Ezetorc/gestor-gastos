import { User } from "@prisma/client";
import { RegisterDto } from "../models/dtos/register.dto";
import { prisma } from "../configuration/prisma.configuration";

export class UserRepository {
  static async getByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

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
