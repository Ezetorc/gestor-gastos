import { PrismaClient } from '@prisma/client'

export class ExpenseModel {
  static prisma = new PrismaClient()

  static async getAll () {
    return this.prisma.expense.findMany()
  }
}
