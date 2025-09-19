import { useEffect, useState } from "react";
import type { Transaction } from "../types/transaction";

export const useManageData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    fetch("http://localhost:3000/transactions", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data && Array.isArray(data.data)) {
          setTransactions(data.data);
        } else if (Array.isArray(data)) {
          setTransactions(data);
        }
      });
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