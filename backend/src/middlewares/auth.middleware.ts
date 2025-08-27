import { Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { JWT_SECRET } from "../configuration/env.configuration";
import { AuthenticatedRequest } from "../models/authenticated-request.model";
import { UnauthorizedError } from "../models/unauthorized-error.model";
import { BadRequestError } from "../models/bad-request-error.model";

export const authMiddleware = (
  request: AuthenticatedRequest,
  _response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new BadRequestError("No token provided");

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    request.user = { id: decoded.userId };
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError("Token expired");
    }

    throw new UnauthorizedError("Invalid token");
  }
};
