import type { Expense } from "./transaction.types";

export interface TopCategoriesCardProps {
  title?: string;
  expenses: Expense;
  maxCategories?: number;
}
