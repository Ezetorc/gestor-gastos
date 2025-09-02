import { TransactionController } from "./../../src/controllers/transaction.controller";
import { transactionServiceMock } from "./../mocks/transaction.service.mock";
import { describe, expect, it, jest } from "@jest/globals";

jest.mock("../../src/services/transaction.service");

describe("TransactionController", () => {
  describe("delete", () => {
    it("should delete the transaction and respond with 204 and no content", async () => {
      const requestMock = {
        user: { id: 1 },
        params: { transactionId: 1 },
      } as any;
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
      } as any;

      transactionServiceMock.delete.mockResolvedValue(undefined);
      await TransactionController.delete(requestMock, responseMock);

      expect(transactionServiceMock.delete).toHaveBeenCalledWith(
        requestMock.params.transactionId,
        requestMock.user.id
      );
      expect(responseMock.status).toHaveBeenCalledWith(204);
      expect(responseMock.end).toHaveBeenCalled();
    });
  });
});
