import { BadRequestError } from "../../src/models/bad-request-error.model";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { NotFoundError } from "../../src/models/not-found-error.model";
import { JWT_SECRET } from "../../src/configuration/env.configuration";
import { userRepositoryMock } from "../mocks/user.repository.mock";
import { AuthService } from "../../src/services/auth.service";
import { mockUser } from "./../mocks/user.mock";
import jwt, { JwtPayload } from "jsonwebtoken";
import { bcryptMock } from "../mocks/bcrypt.mock";

jest.mock("../../src/repositories/user.repository");
jest.mock("bcrypt");
jest.mock('../../src/configuration/env.configuration', () => ({
  ...require('../mocks/env.mock').envMock
}));

describe("AuthService", () => {
  describe("login", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return an authorization token when credentials are valid", async () => {
      userRepositoryMock.getByEmail.mockResolvedValue(mockUser);
      bcryptMock.compare.mockResolvedValue(true);

      const authorization = await AuthService.login(
        mockUser.email,
        mockUser._unhashedPassword
      );

      expect(typeof authorization).toBe("string");
    });

    it("should throw a 'NotFoundError' when user not found", async () => {
      userRepositoryMock.getByEmail.mockResolvedValue(null);

      await expect(
        AuthService.login("wrong@email.com", mockUser._unhashedPassword)
      ).rejects.toThrow(NotFoundError);
    });

    it("should throw a 'BadRequestError' when password is incorrect", async () => {
      userRepositoryMock.getByEmail.mockResolvedValue(mockUser);
      bcryptMock.compare.mockResolvedValue(false);

      await expect(
        AuthService.login(mockUser.email, "wrong-password")
      ).rejects.toThrow(BadRequestError);
    });
  });

  describe("getAuthorization", () => {
    it("should return a JWT token", async () => {
      const userId = 1;
      const token = await AuthService.getAuthorization(userId);

      expect(typeof token).toBe("string");
    });

    it("should return a valid JWT token with the user id", async () => {
      const userId = 1;
      const token = await AuthService.getAuthorization(userId);
      const decodedJwt = jwt.verify(token, JWT_SECRET) as JwtPayload;

      expect(typeof decodedJwt).not.toBe("string");
      expect(decodedJwt.userId).toBe(userId);
      expect(decodedJwt.iat).toBeDefined();
      expect(decodedJwt.exp).toBeGreaterThan(decodedJwt.iat!);
    });
  });

  describe("register", () => {
    it("should registry a user", async () => {
      const data = {
        name: "User",
        email: "user@test.com",
        password: "Password123",
        image: "avatar.png",
      };

      userRepositoryMock.getByEmail.mockResolvedValue(null);
      bcryptMock.hash.mockResolvedValue("hashedPassword123");
      userRepositoryMock.create.mockResolvedValue({
        id: 1,
        ...data,
        password: "hashedPassword123",
      });

      const result = await AuthService.register(data);

      expect(userRepositoryMock.getByEmail).toHaveBeenCalledWith(data.email);
      expect(bcryptMock.hash).toHaveBeenCalledWith(data.password, 10);
      expect(userRepositoryMock.create).toHaveBeenCalledWith({
        name: data.name,
        email: data.email,
        password: "hashedPassword123",
        image: data.image,
      });
      expect(result).toHaveProperty("id");
      expect(result.password).toBe("hashedPassword123");
    });
  });
});
