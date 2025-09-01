import { useMemo } from 'react';

interface DataItem {
    id: number; // Identificador único del elemento
    amount: number; // Monto del gasto o ingreso
    date: string; // Fecha en formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
    category: string; // Categoría del gasto o ingreso
    description: string; // Descripción adicional del gasto o ingreso
    user_id: number; // Identificador del usuario asociado
}

export function useDailyExpensesIncomes(expenses: DataItem[], incomes: DataItem[]) {
  return useMemo(() => {
    const allDates = [
      ...new Set([
        ...expenses.map((e) => e.date.split('T')[0]),
        ...incomes.map((i) => i.date.split('T')[0]),
      ]),
    ].sort();

    const dailyExpenses = allDates.map((date) =>
      expenses.filter((e) => e.date.split('T')[0] === date).reduce((sum, e) => sum + e.amount, 0)
    );
    const dailyIncomes = allDates.map((date) =>
      incomes.filter((i) => i.date.split('T')[0] === date).reduce((sum, i) => sum + i.amount, 0)
    );

    return {
      labels: allDates,
      expenses: dailyExpenses,
      incomes: dailyIncomes,
    };
  }, [expenses, incomes]);
}