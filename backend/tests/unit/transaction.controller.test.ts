import { transactionMock } from "./../mocks/transaction.mock";
import { TransactionController } from "./../../src/controllers/transaction.controller";
import { transactionServiceMock } from "./../mocks/transaction.service.mock";
import { describe, expect, it, jest } from "@jest/globals";
import { BadRequestError } from "../../src/models/errors/bad-request.error";
import { UnauthorizedError } from "../../src/models/errors/unauthorized.error";
import { transactionRepositoryMock } from "../mocks/transaction.repository.mock";

jest.mock("../../src/services/transaction.service");

describe("TransactionController", () => {
  describe("delete", () => {
    it("should delete the transaction and respond with 204 and no content", async () => {
      const requestMock = {
        user: { id: 1 },
        params: { id: 1 },
      } as any;
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
      } as any;

      transactionServiceMock.delete.mockResolvedValue(undefined);
      await TransactionController.delete(requestMock, responseMock);

      expect(transactionServiceMock.delete).toHaveBeenCalledWith(
        requestMock.params.id,
        requestMock.user.id
      );
      expect(responseMock.status).toHaveBeenCalledWith(204);
      expect(responseMock.end).toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should return a transaction with the given ID", async () => {
      const requestMock = {
        user: { id: transactionMock.userId },
        params: { id: transactionMock.id },
      } as any;
      const responseMock = { json: jest.fn() } as any;
      const getByIdSpy = jest
        .spyOn(transactionServiceMock, "getById")
        .mockResolvedValue(transactionMock);

      await TransactionController.getById(requestMock, responseMock);

      expect(getByIdSpy).toHaveBeenCalledWith(requestMock.params.id);
      expect(responseMock.json).toHaveBeenCalled();
    });

    it("should throw a 'BadRequestError' when transaction ID is missing", async () => {
      const requestMock = {
        user: { id: transactionMock.userId },
        params: {},
      } as any;
      const responseMock = {} as any;

      await expect(
        TransactionController.getById(requestMock, responseMock)
      ).rejects.toThrow(BadRequestError);
    });

    it("should throw a 'BadRequestError' when transaction ID is invalid", async () => {
      const requestMock = {
        user: { id: transactionMock.userId },
        params: { id: "abc" },
      } as any;
      const responseMock = {} as any;

      await expect(
        TransactionController.getById(requestMock, responseMock)
      ).rejects.toThrow(BadRequestError);
    });

    it("should throw a 'UnauthorizedError' when trying to access a transaction of another user", async () => {
      const requestMock = {
        user: { id: 2 },
        params: { id: transactionMock.id },
      } as any;
      const responseMock = {} as any;

      await expect(
        TransactionController.getById(requestMock, responseMock)
      ).rejects.toThrow(UnauthorizedError);
    });
  });
});
