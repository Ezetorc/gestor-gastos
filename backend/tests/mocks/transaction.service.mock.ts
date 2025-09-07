import { TransactionService } from "./../../src/services/transaction.service";
import { jest } from "@jest/globals";

export const transactionServiceMock = jest.mocked(TransactionService);
