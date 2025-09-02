export interface Transaction {
  id: number;
  amount: number;
  date: string;
  category: string;
  payment_method?: string;
  description: string;
  user_id: number;
  type: 'income' | 'expense';
}

export interface TransactionFilters {
  search: string;
  category: string;
  payment_method: string;
  type: 'all' | 'income' | 'expense';
  date_from?: string;
  date_to?: string;
}

