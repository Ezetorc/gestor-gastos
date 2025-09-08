import { TransactionService } from "./../../src/services/transaction.service";
import { transactionMock } from "./../mocks/transaction.mock";
import { transactionRepositoryMock } from "./../mocks/transaction.repository.mock";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { NotFoundError } from "../../src/models/errors/not-found.error";
import { UnauthorizedError } from "../../src/models/errors/unauthorized.error";

jest.mock("../../src/repositories/transaction.repository");

describe("TransactionService", () => {
  describe("delete", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should delete a transaction with the given id", async () => {
      const { id, userId } = transactionMock;
      const getByIdSpy = jest
        .spyOn(transactionRepositoryMock, "getById")
        .mockResolvedValue(transactionMock);
      const deleteSpy = jest
        .spyOn(transactionRepositoryMock, "delete")
        .mockResolvedValue(transactionMock);

      await TransactionService.delete(id, userId);

      expect(getByIdSpy).toHaveBeenCalledWith(id);
      expect(deleteSpy).toHaveBeenCalledWith(id);
    });

    it("should throw a 'NotFoundError' when transaction not found", async () => {
      const transactionId = 1;
      const userId = 1;
      transactionRepositoryMock.getById.mockResolvedValue(null);

      await expect(
        TransactionService.delete(transactionId, userId)
      ).rejects.toThrow(NotFoundError);
    });

    it("should throw a 'UnauthorizedError' when trying to delete transaction of another user", async () => {
      const transactionId = 1;
      const userId = 2;
      transactionRepositoryMock.getById.mockResolvedValue(transactionMock);

      await expect(
        TransactionService.delete(transactionId, userId)
      ).rejects.toThrow(UnauthorizedError);
    });
  });

  describe("getById", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return a transaction with the given id", async () => {
      const { id } = transactionMock;
      const getByIdSpy = jest
        .spyOn(transactionRepositoryMock, "getById")
        .mockResolvedValue(transactionMock);

      const result = await TransactionService.getById(id);

      expect(result).toEqual(transactionMock);
      expect(getByIdSpy).toHaveBeenCalledWith(id);
    });

    it("should throw a 'NotFoundError' when transaction not found", async () => {
      const id = 1;
      transactionRepositoryMock.getById.mockResolvedValue(null);

      await expect(TransactionService.getById(id)).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
