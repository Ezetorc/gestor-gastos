import { authServiceMock } from "./../mocks/auth.service.mock";
import { AuthController } from "../../src/controllers/auth.controller";
import { describe, expect, it, jest } from "@jest/globals";
import { mockUser } from "../mocks/user.mock";

jest.mock("../../src/services/auth.service");

describe("AuthController", () => {
  describe("login", () => {
    it("should respond with 200 and token", async () => {
      const expected = { authorization: "fake-jwt-token", user: mockUser };
      const requestMock = {
        body: { email: "test@example.com", password: "123456" },
      } as any;
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      authServiceMock.login.mockResolvedValue(expected);
      await AuthController.login(requestMock, responseMock);

      expect(authServiceMock.login).toHaveBeenCalledWith(
        requestMock.body.email,
        requestMock.body.password
      );
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledWith({ value: expected });
    });
  });
});

describe("register", () => {
  it("should respond with 201 and new user ID", async () => {
    const expected = { authorization: "fake-jwt-token", user: mockUser };
    const requestMock = {
      body: {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      },
    } as any;

    const responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const newUserMock = {
      id: 1,
    };

    authServiceMock.register.mockResolvedValue(expected);

    await AuthController.register(requestMock, responseMock);

    expect(authServiceMock.register).toHaveBeenCalledWith(requestMock.body);
    expect(responseMock.status).toHaveBeenCalledWith(201);
    expect(responseMock.json).toHaveBeenCalledWith({ value: expected });
  });
});
