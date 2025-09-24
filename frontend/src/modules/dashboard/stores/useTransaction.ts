import { create } from "zustand";
import type {
  Expense,
  Income,
  Transaction,
  TransactionList,
} from "../types/transaction.types";

interface TransactionState {
  dataExpense: Expense;
  dataIncome: Income;
  getData: () => Promise<void>;
}

export const useTransaction = create<TransactionState>((set) => ({
  dataExpense: [],
  dataIncome: [],
  getData: async () => {
    const token = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        "http://localhost:3000/transactions",
        options
      );
      const data: TransactionList = await response.json();
      const transactions: Transaction[] = data.value.data;

      const dataExpense = transactions.filter(
        (item) => item.type === "EXPENSE"
      );
      const dataIncome = transactions.filter((item) => item.type === "INCOME");

      set({
        dataExpense: dataExpense,
        dataIncome: dataIncome,
      });
    } catch (err) {
      console.error("Error obteniendo transacciones:", err);
    }
  },
}));
