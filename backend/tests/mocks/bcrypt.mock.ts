import { jest } from "@jest/globals";
import * as bcrypt from "bcrypt";

export const bcryptMock = {
  hash: bcrypt.hash as jest.MockedFunction<
    (data: string, saltOrRounds: string | number) => Promise<string>
  >,
  compare: bcrypt.compare as jest.MockedFunction<
    (data: string, encrypted: string) => Promise<boolean>
  >,
};
