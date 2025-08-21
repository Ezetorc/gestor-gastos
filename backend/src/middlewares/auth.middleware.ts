import { Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { JWT_SECRET } from '../configuration/env.configuration';
import {AuthenticatedRequest} from '../models/authenticated-request.model'


export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' });
    return; // solo para salir
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ message: 'Token expired' });
      return;
    }
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};
