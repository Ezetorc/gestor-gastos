import type { Expense } from "./expense";

export interface PieChartProps {
  expenses: Expense[];
  backgroundD?: string;
  colo?: string;
  display?: object;
}