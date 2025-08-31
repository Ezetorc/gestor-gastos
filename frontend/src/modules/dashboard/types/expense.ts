export interface Expense {
  id: number;
  amount: number;
  date: string;
  category: string;
  payment_method: string;
  description: string;
  user_id: number;
}