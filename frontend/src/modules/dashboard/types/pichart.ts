import type { Expense } from "./transaction.types";

export interface PieChartProps {
  expenses: Expense;
  backgroundD?: string;
  colo?: string;
  display?: object;
}
