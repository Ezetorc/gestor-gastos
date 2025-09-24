export type TransactionType = "EXPENSE" | "INCOME";

export interface Transaction {
  id: number;
  amount: number;
  date: Date;
  name: string;
  category: string;
  paymentMethod: string;
  description: string;
  userId: number;
  type: string;
}

// Respuesta que devuelve tu endpoint
export interface TransactionList {
  value: {
    data: Transaction[];
    hasNextPage: boolean;
  };
}

// Alias que ya tenías
export type Expense = Transaction[];
export type Income = Transaction[];
