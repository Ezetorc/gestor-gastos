import { useMemo } from 'react';
import transactions from '../mocks/transactions.mock.json';

import { useEffect, useState } from "react";
import { Transaction } from "../types/transaction";
import transactionsData from "../mocks/transactions.mock.json";

export const useManageData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setTransactions(transactionsData);
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


  return { transactions, handleDelete, handleUpdate };
};