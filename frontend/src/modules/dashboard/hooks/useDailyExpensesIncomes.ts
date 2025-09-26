import { useMemo } from "react";
import type { Expense, Income } from "../types/transaction.types";

export function useDailyExpensesIncomes(expenses: Expense, incomes: Income) {
  return useMemo(() => {
    // Creamos un set de fechas únicas como objetos Date

    const allDates = [
      ...new Set([
        ...expenses.map((e) => new Date(e.date)),
        ...incomes.map((i) => new Date(i.date)),
      ]),
    ].sort((a, b) => a.getTime() - b.getTime()); // ordenar de menor a mayor

    const dailyExpenses = allDates.map((date) =>
      expenses
        .filter((item) => {
          const d = new Date(item.date);
          return (
            d.getFullYear() === date.getFullYear() &&
            d.getMonth() === date.getMonth() &&
            d.getDate() === date.getDate()
          );
        })
        .reduce((sum, e) => sum + e.amount, 0)
    );

    const dailyIncomes = allDates.map((date) =>
      incomes
        .filter((item) => {
          const d = new Date(item.date);
          return (
            d.getFullYear() === date.getFullYear() &&
            d.getMonth() === date.getMonth() &&
            d.getDate() === date.getDate()
          );
        })
        .reduce((sum, i) => sum + i.amount, 0)
    );

    return {
      labels: allDates.map((d) => d.toISOString().split("T")[0]), // ej: "2025-09-23"
      expenses: dailyExpenses,
      incomes: dailyIncomes,
    };
  }, [expenses, incomes]);
}
