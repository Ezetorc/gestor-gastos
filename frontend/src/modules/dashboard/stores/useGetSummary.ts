import { create } from "zustand";

interface TransactionSummary {
  totalExpenses: number;
  totalIncomes: number;
  monthBalance: number;
  todayExpenses: number;
  weekExpenses: number;
  monthExpenses: number;
}

interface Summary {
  dataSummary: TransactionSummary | null; // Cambiado a objeto único en lugar de array
  getDataSummary: () => Promise<void>;
}

export const useGetSummary = create<Summary>((set) => ({
  dataSummary: null,
  getDataSummary: async () => {
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
        "http://localhost:3000/transactions/summary",
        options
      );
      const data = await response.json();

      // data.value es un objeto, no un array
      const summary: TransactionSummary = data.value;

      set({
        dataSummary: summary, // Asignamos el objeto directamente
      });
    } catch (err) {
      console.error("Error obteniendo summary:", err);
    }
  },
}));
