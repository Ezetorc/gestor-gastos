import { jest } from "@jest/globals";
import { UserRepository } from "../../src/repositories/user.repository";

export const userRepositoryMock = jest.mocked(UserRepository);
