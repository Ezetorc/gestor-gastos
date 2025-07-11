import { PrismaClient } from '@prisma/client'

export class ExpenseService {
  static prisma = new PrismaClient()

  static async getAll () {
    return this.prisma.expense.findMany()
  }
}
