import { Router } from "express";
import { UserController} from "../controllers/user.controller";
import { dtoValidationMiddleware } from "../middlewares/dto-validation.middleware";
import { RegisterUserDto } from "../dto/register-user.dto";

export const UserRouter = Router();

const userController = new UserController();

UserRouter.post('/register', dtoValidationMiddleware(RegisterUserDto), userController.registerUser);

