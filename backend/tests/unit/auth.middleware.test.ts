import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { Response, NextFunction } from "express";
import { authMiddleware } from "../../src/middlewares/auth.middleware";

import jwt, { TokenExpiredError } from "jsonwebtoken";
import { UnauthorizedError } from "../../src/models/unauthorized-error.model";

jest.mock("jsonwebtoken");
jest.mock("../../src/configuration/env.configuration", () => ({
  ...require("../mocks/env.mock").envMock,
}));

describe("Auth Middleware", () => {
  let next: NextFunction;
  let res: Partial<Response>;

  beforeEach(() => {
    next = jest.fn();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  it("should call next() if authorization header is present", () => {
    const req: any = { headers: { authorization: "Bearer validtoken" } };
    (jwt.verify as jest.Mock).mockReturnValue({ userId: "123" });

    authMiddleware(req, res as Response, next);

    expect(req.user).toEqual({ id: "123" });
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if authorization header is missing", () => {
    const req: any = { headers: {} };

    expect(() => authMiddleware(req, {} as any, next)).toThrow(
      UnauthorizedError
    );

    expect(() => authMiddleware(req, {} as any, next)).toThrow(
      "No token provided"
    );
  });

  it("should return 401 if token is expired", () => {
    const req: any = { headers: { authorization: "Bearer expiredtoken" } };
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new TokenExpiredError("Token expired", new Date());
    });

    expect(() => authMiddleware(req, {} as any, next)).toThrow(
      UnauthorizedError
    );
    expect(() => authMiddleware(req, {} as any, next)).toThrow("Token expired");
  });

  it("should return 401 if token is invalid", () => {
    const req: any = { headers: { authorization: "Bearer invalidtoken" } };
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    expect(() => authMiddleware(req, {} as any, next)).toThrow(
      UnauthorizedError
    );
    expect(() => authMiddleware(req, {} as any, next)).toThrow("Invalid token");
  });
});
