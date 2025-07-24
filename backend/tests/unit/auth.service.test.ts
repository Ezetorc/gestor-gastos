import { BadRequestError } from "../../src/models/bad-request-error.model";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { NotFoundError } from "../../src/models/not-found-error.model";
import { JWT_SECRET } from "../../src/configuration/env.configuration";
import { userRepositoryMock } from "../mocks/user.repository.mock";
import { AuthService } from "../../src/services/auth.service";
import { mockUser } from "./../mocks/user.mock";
import jwt, { JwtPayload } from "jsonwebtoken";

jest.mock("../../src/repositories/user.repository");

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
  });

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
  });
});
