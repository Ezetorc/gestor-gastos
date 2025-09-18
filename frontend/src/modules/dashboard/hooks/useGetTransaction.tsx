import { useEffect, useState } from "react";

interface GetDataExpense {
  name: string;
  type: string;
  amount: number;
  date: Date;
  category: string;
  paymentMethod: string;
  description: string;
}

export const useGetTransaction = () => {
  const [dataTransaction, setDataTransaction] = useState<GetDataExpense>();

  const token = localStorage.getItem("token");

  const getData = async () => {
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

      if (!data) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      setDataTransaction(data.value.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error:", err.message);
      } else {
        console.error("Error desconocido:", err);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { dataTransaction };
};
