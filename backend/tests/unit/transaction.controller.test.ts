import { transactionMock } from "./../mocks/transaction.mock";
import { TransactionController } from "./../../src/controllers/transaction.controller";
import { transactionServiceMock } from "./../mocks/transaction.service.mock";
import { describe, expect, it, jest } from "@jest/globals";
import { BadRequestError } from "../../src/models/errors/bad-request.error";
import { paginationQuerySchema } from "../../src/models/schemas/pagination-query.schema";
import { transactionFiltersSchema } from "../../src/models/schemas/transaction-filters.schema";
import { TransactionFilters } from "../../src/models/transaction-filters.model";
import { PaginationQuery } from "../../src/models/pagination-query.model";

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

  describe("getAllOfUser", () => {
    it("should return paginated transactions when query is valid", async () => {
      const requestMock = {
        user: { id: 1 },
        query: { page: 1, amount: 2 },
      } as any;
      const responseMock = { json: jest.fn() } as any;
      const paginationQuery: PaginationQuery = { amount: 2, page: 1 };
      const filters = {}

      jest.spyOn(paginationQuerySchema, "validate").mockReturnValue({ value: paginationQuery} as any);
      jest.spyOn(transactionFiltersSchema, "validate").mockReturnValue({ value: filters } as any);

      const serviceResult = { data: [transactionMock], hasNextPage: false };

      transactionServiceMock.getAllOfUser.mockResolvedValue(serviceResult);
      await TransactionController.getAllOfUser(requestMock, responseMock);

      expect(transactionServiceMock.getAllOfUser).toHaveBeenCalledWith({
        userId: requestMock.user.id,
        page: paginationQuery.page,
        amount: paginationQuery.amount,
        filters,
      });
      expect(responseMock.json).toHaveBeenCalledWith({ value: serviceResult });
    });

    it("should throw BadRequestError if pagination validation fails", async () => {
      const requestMock = { query: {} } as any;
      const responseMock = {} as any;

      jest.spyOn(paginationQuerySchema, "validate").mockReturnValue({ error: "Invalid pagination" } as any);

      await expect(TransactionController.getAllOfUser(requestMock, responseMock)).rejects.toThrow(BadRequestError);
    });

    it("should throw BadRequestError if filters validation fails", async () => {
      const requestMock = { query: {} } as any;
      const responseMock = {} as any;

      jest.spyOn(paginationQuerySchema, "validate").mockReturnValue({ value: { page: 1, amount: 2 } } as any);
      jest.spyOn(transactionFiltersSchema, "validate").mockReturnValue({ error: "Invalid filters" } as any);

      await expect(TransactionController.getAllOfUser(requestMock, responseMock)).rejects.toThrow(BadRequestError);
    });
  });
});
