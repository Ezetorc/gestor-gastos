import { TransactionService } from "./../../src/services/transaction.service";
import { transactionMock } from "./../mocks/transaction.mock";
import { transactionRepositoryMock } from "./../mocks/transaction.repository.mock";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { NotFoundError } from "../../src/models/errors/not-found.error";
import { UnauthorizedError } from "../../src/models/errors/unauthorized.error";
import { TransactionType } from "@prisma/client";

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

  describe("getAllOfUser", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return paginated transactions with hasNextPage false", async () => {
      const args = { userId: 1, page: 1, limit: 2, filters: {} };
      jest
        .spyOn(transactionRepositoryMock, "getAllOfUser")
        .mockResolvedValue([transactionMock]);

      const result = await TransactionService.getAllOfUser(args);

      expect(transactionRepositoryMock.getAllOfUser).toHaveBeenCalledWith({
        userId: args.userId,
        skip: 0,
        limit: args.limit + 1,
        filters: args.filters,
      });
      expect(result).toEqual({ data: [transactionMock], hasNextPage: false });
    });

    it("should return hasNextPage true when there are more transactions than requested", async () => {
      const args = { userId: 1, page: 1, limit: 1, filters: {} };
      const extraTransaction = { ...transactionMock, id: 2 };
      jest
        .spyOn(transactionRepositoryMock, "getAllOfUser")
        .mockResolvedValue([transactionMock, extraTransaction]);

      const result = await TransactionService.getAllOfUser(args);

      expect(transactionRepositoryMock.getAllOfUser).toHaveBeenCalledWith({
        userId: args.userId,
        skip: 0,
        limit: args.limit + 1,
        filters: args.filters,
      });
      expect(result).toEqual({ data: [transactionMock], hasNextPage: true });
    });

    it("should default page to 1 if page is less than 1", async () => {
      const args = { userId: 1, page: 0, limit: 2, filters: {} };
      jest
        .spyOn(transactionRepositoryMock, "getAllOfUser")
        .mockResolvedValue([transactionMock]);

      const result = await TransactionService.getAllOfUser(args);

      expect(transactionRepositoryMock.getAllOfUser).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 0,
        })
      );
      expect(result.data).toEqual([transactionMock]);
    });
  });

  describe("update", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const mockTransaction = {
      id: 4,
      userId: 2,
      amount: 5000,
      description: "Pago Agua",
      category: "Servicios",
      paymentMethod: "Tarjeta",
      type: TransactionType.EXPENSE,
      date: new Date("2025-08-31T12:00:00.000Z"),
      name: "Pago Agua mensual",
    };

    it("should update the transaction if the userId matches", async () => {
      const updates = {
        amount: 6000,
        description: "Pago Agua actualizado",
        type: TransactionType.EXPENSE,
        category: "Servicios",
        date: new Date(),
      };

      transactionRepositoryMock.getById.mockResolvedValueOnce(mockTransaction);

      transactionRepositoryMock.update.mockResolvedValue({
        ...mockTransaction,
        ...updates,
      });

      const updated = await TransactionService.update(
        mockTransaction.id, // transactionId
        mockTransaction.userId, // userId correcto
        updates // DTO de actualización
      );

      expect(updated.amount).toBe(6000);
      expect(updated.description).toBe("Pago Agua actualizado");
      expect(transactionRepositoryMock.update).toHaveBeenCalledWith(
        mockTransaction.id,
        updates
      );
    });

    it("should throw a 'NotFoundError' when the transaction does not exist", async () => {
      transactionRepositoryMock.getById.mockResolvedValue(null);

      await expect(
        TransactionService.update(99, 2, {
          amount: 1000,
          type: TransactionType.EXPENSE,
          category: "Servicios",
          description: "x",
          date: new Date(),
        })
      ).rejects.toThrow(NotFoundError);
    });

    it("should throw an 'UnauthorizedError' when trying to patch a transaction of another user", async () => {
      transactionRepositoryMock.getById.mockResolvedValue(mockTransaction);

      await expect(
        TransactionService.update(mockTransaction.id, 999, {
          amount: 6000,
          type: TransactionType.EXPENSE,
          category: "Servicios",
          description: "x",
          date: new Date(),
        })
      ).rejects.toThrow(UnauthorizedError);
    });
  });
});
