import { useEffect } from "react";
import { useTransactionStore } from "../store/useTransactionStore";

export const useManageData = () => {
  const {
    transactions,
    fetchTransactions,
    deleteTransaction,
    updateTransaction,
  } = useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    data: transactions,
    handleDelete: deleteTransaction,
    handleUpdate: updateTransaction,
  };
};