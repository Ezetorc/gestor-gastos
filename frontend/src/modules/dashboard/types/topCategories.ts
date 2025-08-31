import type { Expense } from "./expense";

export interface TopCategoriesCardProps {
  title?: string;
  expenses: Expense[];
  maxCategories?: number;
}