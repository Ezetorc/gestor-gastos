import { useMemo } from 'react'; // Importa el hook useMemo de React para memorizar el resultado de un cálculo costoso.

// Define la estructura de un objeto de gasto.
interface Expense {
  id: number; // Identificador único del gasto.
  amount: number; // Monto del gasto.
  date: string; // Fecha en la que se realizó el gasto.
  category: string; // Categoría a la que pertenece el gasto (ej. "Comida", "Transporte").
  payment_method: string; // Método de pago utilizado (ej. "Tarjeta de crédito", "Efectivo").
  description: string; // Descripción detallada del gasto.
  user_id: number; // Identificador del usuario que realizó el gasto.
}

// Define la estructura de los datos de una categoría procesada.
interface CategoryData {
  label: string; // Nombre de la categoría.
  value: number; // Monto total de gastos en esta categoría.
  percentage: number; // Porcentaje que representa este gasto sobre el total.
}

export const useExpensesByCategory = (expenses: Expense[]) => {
  return useMemo(() => {
    if (!expenses || expenses.length === 0) {
      return {
        categories: [],
        totalExpenses: 0,
        chartData: []
      };
    }
  
    const totalExpenses = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
  
    const dataByCategory = expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.amount;
      return acc;
    }, {} as Record<string, number>);
    
    const categories: CategoryData[] = Object.entries(dataByCategory).map(
      ([category, amount]) => ({ 
        label: category, 
        value: amount, 
    percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
      })
    );

    categories.sort((a, b) => b.value - a.value);
    
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
