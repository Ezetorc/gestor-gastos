import { TransactionFilters } from "./transactionFilters.utility";
import { Prisma,TransactionType } from "@prisma/client";

export function buildsFilters(
  filters: TransactionFilters
): Prisma.TransactionWhereInput {
  const where: Prisma.TransactionWhereInput = {};
  if (filters.fromDate || filters.toDate) {
    where.date = {};
    if (filters.fromDate) where.date.gte = new Date(filters.fromDate);
    if (filters.toDate) where.date.lte = new Date(filters.toDate);
  }
  if (filters.category) where.category = filters.category;
  if (filters.amount !== undefined) {
    where.amount = filters.amount;
  } else if (
    filters.amountMin !== undefined ||
    filters.amountMax !== undefined
  ) {
    where.amount = {};
    if (filters.amountMin) where.amount.gte = filters.amountMin;
    if (filters.amountMax) where.amount.lte = filters.amountMax;
  }
   if (filters.paymentMethod) where.paymentMethod = filters.paymentMethod;
  if (filters.type) {
    if (Array.isArray(filters.type)) {
      // Convertimos array de strings a array de enum
      where.type = { in: filters.type as TransactionType[] };
    } else {
      where.type = filters.type as TransactionType;
    }
  }
  if (filters.name) {
    where.name = { contains: filters.name };
  }
  if (filters.description) {
    where.description = { contains: filters.description };
  }
  return where;
}