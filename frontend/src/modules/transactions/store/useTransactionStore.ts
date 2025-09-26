import { create } from "zustand";
import type { Transaction } from "../types/transaction";

// Usamos Partial<Transaction> para el DTO de actualización, ya que no todos los campos son requeridos
type UpdateTransactionDto = Partial<Omit<Transaction, "id" | "userId">>;

interface TransactionState {
  transactions: Transaction[];
  fetchTransactions: () => Promise<void>;
  deleteTransaction: (id: number | Transaction) => Promise<void>;
  updateTransaction: (id: number, data: UpdateTransactionDto) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  fetchTransactions: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No se encontró token. Abortando fetch.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/transactions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(
        "✅ Respuesta recibida. Estado:",
        response.status,
        response.statusText
      );

      if (!response.ok) {
        throw new Error(`Error en el fetch: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const transactions = data?.value?.data ?? [];
      set({ transactions });
      console.log(transactions)
    } catch (error) {
      console.error("❌ Error durante fetchTransactions:", error);
    }
  },

  deleteTransaction: async (idOrTransaction: number | Transaction) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No se encontró token. Abortando delete.");
      return;
    }

    const id = typeof idOrTransaction === 'number' ? idOrTransaction : idOrTransaction.id;

    // Actualización optimista: removemos la transacción de la UI inmediatamente
    const originalTransactions = get().transactions;
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction.id !== id
      ),
    }));

    try {
      const response = await fetch(`http://localhost:3000/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Falló el borrado en el servidor");
      }
      console.log(`🗑️ Transacción con id ${id} borrada exitosamente.`);
    } catch (error) {
      console.error("❌ Error borrando la transacción:", error);
      // Si la API falla, revertimos el estado al original
      set({ transactions: originalTransactions });
    }
  },

  updateTransaction: async (idOrTransaction: number | Transaction, data: UpdateTransactionDto) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No se encontró token. Abortando update.");
      return;
    }

    const id = typeof idOrTransaction === 'number' ? idOrTransaction : idOrTransaction.id;

    try {
      const response = await fetch(`http://localhost:3000/transactions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Falló la actualización en el servidor");
      }

      console.log(`🔄 Transacción con id ${id} actualizada.`);
      // Después de actualizar, volvemos a solicitar todas las transacciones para tener el estado más reciente.
      await get().fetchTransactions();
    } catch (error) {
      console.error("❌ Error actualizando la transacción:", error);
    }
  },
}));