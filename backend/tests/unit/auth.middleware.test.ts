import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { Response, NextFunction } from 'express';
import { authMiddleware } from '../../src/middlewares/auth.middleware';

import jwt, { TokenExpiredError } from 'jsonwebtoken';


jest.mock('jsonwebtoken');
jest.mock('../../src/configuration/env.configuration', () => ({
  ...require('../mocks/env.mock').envMock
}));

describe('Auth Middleware', () => {

  let next: NextFunction;
  let res: Partial<Response>;

  beforeEach(() => {
    next = jest.fn();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
  });

  it('should call next() if authorization header is present', () => {
    const req: any = { headers: { authorization: 'Bearer validtoken' } };
    (jwt.verify as jest.Mock).mockReturnValue({ userId: '123' });


    authMiddleware(req, res as Response, next);

    expect(req.user).toEqual({ id: "123" })
    expect(next).toHaveBeenCalled();
  });

  it('should return 401 if authorization header is missing', () => {
    const req: any = { headers: {} };
    authMiddleware(req, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' });
    expect(next).not.toHaveBeenCalled();

  });

  it("should return 401 if token is expired", () => {
    const req: any = { headers: { authorization: 'Bearer expiredtoken' } };
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new TokenExpiredError('Token expired', new Date());
    });

    authMiddleware(req, res as Response, next);


    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token expired' });
    expect(next).not.toHaveBeenCalled();


  });

  it("should return 401 if token is invalid", () => {
    const req: any = { headers: { authorization: 'Bearer invalidtoken' } };
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    authMiddleware(req, res as Response, next);


    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();


  });



});