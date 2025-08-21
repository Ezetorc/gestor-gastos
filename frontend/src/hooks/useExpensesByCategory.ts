import { useMemo } from 'react';

interface Expense {
  id: number;
  amount: number;
  date: string;
  category: string;
  payment_method: string;
  description: string;
  user_id: number;
}

interface CategoryData {
  label: string;
  value: number;
  percentage: number;
}

/**
 * Hook personalizado para procesar gastos por categoría
 * 
 * @param expenses - Array de gastos
 * @returns Objeto con datos procesados por categoría
 */
export const useExpensesByCategory = (expenses: Expense[]) => {
  return useMemo(() => {
    if (!expenses || expenses.length === 0) {
      return {
        categories: [],
        totalExpenses: 0,
        chartData: []
      };
    }

    // Calcular total de gastos
    const totalExpenses = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );

    // Agrupar gastos por categoría
    const dataByCategory = expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.amount;
      return acc;
    }, {} as Record<string, number>);

    // Convertir a formato de categorías con porcentajes
    const categories: CategoryData[] = Object.entries(dataByCategory).map(
      ([category, amount]) => ({
        label: category,
        value: amount,
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
      })
    );

    // Ordenar por valor (de mayor a menor)
    categories.sort((a, b) => b.value - a.value);

    // Datos para gráficos (formato compatible con MUI Charts)
    const chartData = categories.map((category, index) => ({
      id: index,
      value: category.value,
      label: category.label,
      percentage: category.percentage
    }));

    return {
      categories,
      totalExpenses,
      chartData
    };
  }, [expenses]);
};
