import { TransactionRepository } from './../../src/repositories/transaction.repository';
import { jest } from "@jest/globals";

export const transactionRepositoryMock = jest.mocked(TransactionRepository);
