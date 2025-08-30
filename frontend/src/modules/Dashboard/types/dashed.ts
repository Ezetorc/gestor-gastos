export interface DataItem {
  id: number;
  amount: number;
  date: string;
  category: string;
  description: string;
  user_id: number;
}

export interface DashedLineChartProps {
  expenses: DataItem[];
  incomes: DataItem[];
}