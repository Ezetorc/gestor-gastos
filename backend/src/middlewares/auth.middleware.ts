import { Response, Request, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { JWT_SECRET } from "../configuration/env.configuration";
import { UnauthorizedError } from "../models/errors/unauthorized.error";

export const authMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction
) => { 
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new UnauthorizedError("No token provided");

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    request.user = { id: decoded.userId };
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError("Token expired");
    }

    throw new UnauthorizedError("Invalid token");
  }
};
