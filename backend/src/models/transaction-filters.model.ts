import { TransactionType } from "@prisma/client";

export interface TransactionFilters {
  fromDate?: string;
  toDate?: string;
  category?: string;
  amount?: number;
  amountMin?: number;
  amountMax?: number;
  paymentMethod?: string;
  type?: TransactionType | TransactionType[];
  name?: string;
  description?: string;
}
