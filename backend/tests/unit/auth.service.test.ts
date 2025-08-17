// import * as bcrypt from "bcrypt";
import { BadRequestError } from "../../src/models/bad-request-error.model";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { NotFoundError } from "../../src/models/not-found-error.model";
import { JWT_SECRET } from "../../src/configuration/env.configuration";
import { userRepositoryMock } from "../mocks/user.repository.mock";
import { AuthService } from "../../src/services/auth.service";
import { mockUser } from "./../mocks/user.mock";
import jwt, { JwtPayload } from "jsonwebtoken";
// import { UserRepository } from "../../src/repositories/user.repository";

jest.mock("../../src/repositories/user.repository");
// jest.mock("bcrypt");

// const mockedUserRepository = UserRepository as jest.Mocked<typeof UserRepository>;
// const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;


describe("AuthService", () => {
  describe("login", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return an authorization token when credentials are valid", async () => {
      userRepositoryMock.getByEmail.mockResolvedValue(mockUser);

      const authorization = await AuthService.login(
        mockUser.email,
        mockUser._unhashedPassword
      );

      expect(typeof authorization).toBe("string");
    });

    it("should throw NotFoundError when user is not found", async () => {
      userRepositoryMock.getByEmail.mockResolvedValue(null);

      await expect(
        AuthService.login("wrong@email.com", mockUser._unhashedPassword)
      ).rejects.toThrow(NotFoundError);
    });

    it("should throw BadRequestError when password is invalid", async () => {
      userRepositoryMock.getByEmail.mockResolvedValue(mockUser);

      await expect(
        AuthService.login(mockUser.email, "wrong-password")
      ).rejects.toThrow(BadRequestError);
    });
  }),
  describe("getAuthorization", () => {
    it("should return a JWT token as a string", async () => {
      const userId = 1;
      const token = await AuthService.getAuthorization(userId);

      expect(typeof token).toBe("string");
    });

    it("should generate a valid JWT token with userId", async () => {
      const userId = 1;
      const token = await AuthService.getAuthorization(userId);
      const decodedJwt = jwt.verify(token, JWT_SECRET) as JwtPayload;

      expect(typeof decodedJwt).not.toBe("string");
      expect(decodedJwt.userId).toBe(userId);
      expect(decodedJwt.iat).toBeDefined();
      expect(decodedJwt.exp).toBeGreaterThan(decodedJwt.iat!);
    });
  })
//   describe("register", () => {
//     it('debería registrar un usuario correctamente', async () => {
//       const data = {
//         name: 'User',
//         email: 'user@test.com',
//         password: 'Password123',
//         image: 'avatar.png'
//       };

//       userRepositoryMock.getByEmail.mockResolvedValue(null);
//       mockedBcrypt.hash.mockResolvedValue("hashedPassword123");
//       mockedUserRepository.create.mockResolvedValue({
//         id: 1,
//         ...data,
//         password: "hashedPassword123",
//       });

//       const result = await AuthService.register(data);

//       expect(mockedUserRepository.getByEmail).toHaveBeenCalledWith(data.email);
//       expect(mockedBcrypt.hash).toHaveBeenCalledWith(data.password, 10);
//       expect(mockedUserRepository.create).toHaveBeenCalledWith({
//         name: data.name,
//         email: data.email,
//         password: "hashedPassword123",
//         image: data.image,
//       });
//       expect(result).toHaveProperty("id");
//       expect(result.password).toBe("hashedPassword123");
// });
// });
});

