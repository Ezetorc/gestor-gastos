import { useEffect, useState } from "react";
import type { Transaction } from "../types/transaction";
import transactionsData from "../mocks/transactions.mock.json";

const typedTransactions: Transaction[] = transactionsData as Transaction[];

export const useManageData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setTransactions(typedTransactions);
  }, []);

  const handleDelete = (id: number) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const handleUpdate = (updatedTransaction: Transaction) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      )
    );
  };

  return { data: transactions, handleDelete, handleUpdate };
};