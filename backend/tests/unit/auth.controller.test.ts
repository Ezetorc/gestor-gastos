import { authServiceMock } from "./../mocks/auth.service.mock";
import { AuthController } from "../../src/controllers/auth.controller";
import { describe, expect, it, jest } from "@jest/globals";

jest.mock("../../src/services/auth.service");

describe("AuthController", () => {
  describe("login", () => {
    it("should respond with 200 and token", async () => {
      const jwtTokenMock = "fake-jwt-token";
      const requestMock = {
        body: { email: "test@example.com", password: "123456" },
      } as any;
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      authServiceMock.login.mockResolvedValue(jwtTokenMock);
      await AuthController.login(requestMock, responseMock);

      expect(authServiceMock.login).toHaveBeenCalledWith(
        requestMock.body.email,
        requestMock.body.password
      );
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledWith({ value: jwtTokenMock });
    });
  });
});
