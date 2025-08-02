import { User } from "@prisma/client";
import { prisma } from "../configuration/prisma.configuration";

export class UserRepository {
  static async getByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }
}
