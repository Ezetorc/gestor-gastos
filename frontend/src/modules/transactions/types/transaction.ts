export interface Transaction {
  id: number;
  name: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  description: string;
  userId: number;
  type: "INCOME" | "EXPENSE";
}