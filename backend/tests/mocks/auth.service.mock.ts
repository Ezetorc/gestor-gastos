import { jest } from "@jest/globals";
import { AuthService } from "../../src/services/auth.service";

export const authServiceMock = jest.mocked(AuthService);
