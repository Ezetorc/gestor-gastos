import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { dtoValidationMiddleware } from "../middlewares/dto-validation.middleware";
import { LoginDto } from "../models/login.dto";

export const AuthRouter = Router();

AuthRouter.post("/login", dtoValidationMiddleware(LoginDto), AuthController.login);
