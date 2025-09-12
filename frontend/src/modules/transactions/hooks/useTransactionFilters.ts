import { useEffect, useState } from "react";
import { INITIAL_TRANSACTION_FILTERS } from "../constants/transactionFilters";
import { normalizeText } from "../utils/normalizeText";
import type { Transaction } from "../types/transaction";
import type { TransactionFilters } from "../types/filter";

export const useTransactionFilters = (transactions: Transaction[]) => {
  const [filters, setFilters] = useState<TransactionFilters>(
    INITIAL_TRANSACTION_FILTERS
  );

  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  useEffect(() => {
    let result = transactions.filter((transaction) => {
      const matchesSearch =
        !filters.search ||
        normalizeText(transaction.description).includes(
          normalizeText(filters.search)
        ) ||
        normalizeText(transaction.category).includes(
          normalizeText(filters.search)
        );

      const matchesCategory =
        !filters.category || transaction.category === filters.category;

      const matchesPaymentMethod =
        !filters.payment_method ||
        transaction.payment_method === filters.payment_method;

      const matchesType =
        filters.type === "all" || transaction.type === filters.type;

      const matchesDateFrom =
        !filters.date_from ||
        new Date(transaction.date) >= new Date(filters.date_from);

      const matchesDateTo =
        !filters.date_to ||
        new Date(transaction.date) <= new Date(filters.date_to);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPaymentMethod &&
        matchesType &&
        matchesDateFrom &&
        matchesDateTo
      );
    });

    result = result.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setFilteredTransactions(result);
  }, [filters, transactions]);

  const clearFilters = () => {
    setFilters(INITIAL_TRANSACTION_FILTERS);
  };

  return {
    filters, // Filtros actuales
    setFilters, // Función para actualizar filtros
    filteredTransactions, // Todas las transacciones filtradas
    clearFilters, // Función para limpiar filtros
  };
};
