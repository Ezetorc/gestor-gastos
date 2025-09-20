import { create } from "zustand";

interface GetDataExpense {
  name: string;
  type: string;
  amount: number;
  date: Date;
  category: string;
  paymentMethod: string;
  description: string;
}

interface TransactionState {
  dataTransaction: GetDataExpense[];
  dataExpense: GetDataExpense[];
  getData: () => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  dataTransaction: [],
  dataExpense: [],
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
      const data = await response.json();

      const transactions: GetDataExpense[] = data.value.data;
      set({
        dataTransaction: transactions,
        dataExpense: transactions.filter((t) => t.type === "expense"),
      });
    } catch (err) {
      console.error("Error obteniendo transacciones:", err);
    }
  },
}));
