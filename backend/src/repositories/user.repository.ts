import { User } from "@prisma/client";
import { RegisterUserDto } from "../dto/register-user.dto";
import { prisma } from "../configuration/prisma.configuration";

export class UserRepository {
  static async getByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  // El método 'create' para registrar un nuevo usuario
  static async create(data: Omit<RegisterUserDto, 'password'> & { password: string }): Promise<User> {
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
