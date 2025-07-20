import { User } from "@prisma/client";

export class UserRepository {
  static async getByEmail(email: string): Promise<User | null> {
    return {
      email: "ezetorc@gmail.com",
      id: 1,
      image: "",
      name: "Ezetorc",
      password: "123456",
    };
  }
}
