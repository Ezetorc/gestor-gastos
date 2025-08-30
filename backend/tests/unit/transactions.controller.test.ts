import { TransactionController } from "./../../src/controllers/transaction.controller";
import { transactionRepositoryMock } from "./../mocks/transaction.repository.mock";
import { transactionMock } from "./../mocks/transaction.mock";
import { describe, expect, it, jest } from "@jest/globals";

jest.mock("../../src/repositories/transaction.repository");

describe("TransactionController", () => {
  describe("getAllOfUser", () => {
    it("should return an array of transactions and a 'hasNextPage' boolean", async () => {
      const expected = { data: [transactionMock], hasNextPage: false };
      const userId = 1
      const page = 1;
      const amount = 8;
      const requestMock = { user: { id: userId }, query: { page, amount } } as any;
      const responseMock = { json: jest.fn() } as any;

      transactionRepositoryMock.getAllOfUserWithPagination.mockResolvedValue(
        expected.data
      );
      await TransactionController.getAllOfUser(requestMock, responseMock);

      expect(
        transactionRepositoryMock.getAllOfUserWithPagination
      ).toHaveBeenCalledWith({ userId, page, amount: amount + 1 });
      expect(responseMock.json).toHaveBeenCalledWith({ value: expected });
    });
  });
});
