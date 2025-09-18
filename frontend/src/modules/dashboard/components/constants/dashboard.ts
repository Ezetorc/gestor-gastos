import expenses from "../../mocks/expenses.mock.json";
import incomes from "../../mocks/incomes.mock.json";

export const totalExpenses = expenses.reduce(
  (sum, expense) => sum + expense.amount,
  0
);
export const totalIncomes = incomes.reduce(
  (sum, income) => sum + income.amount,
  0
);
export const balance = totalIncomes - totalExpenses;

export const dashboardData = {
  expenses,
  incomes,
  summary: {
    gastosHoy: -19000,
    gastoSemana: -25000,
    gastoMes: -totalExpenses,
    balance: balance,
  },
  totals: {
    totalGastos: -totalExpenses,
    totalIngresos: totalIncomes,
    balanceResumen: balance,
  },
};
