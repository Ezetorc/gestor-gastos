import { Transaction } from "@prisma/client";
import { TransactionRepository } from "../repositories/transaction.repository";
import { TransactionDto } from "../models/dtos/transaction.dto";

export class TransactionService {
  static async create(dto: TransactionDto, userId: number): Promise<Transaction> {
    
    const transactionData = {
      ...dto,
      userId, // la transaccion se asocia a un usuario
    };

    // Llamamos al repository para crear la transacción
    const transaction = await TransactionRepository.create(transactionData);

    return transaction;
  }

  
}
